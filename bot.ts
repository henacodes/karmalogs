import { Bot } from "https://deno.land/x/grammy@v1.36.1/mod.ts";
import { validateRatingSyntax } from "./utils/rating.ts";
import { connectMongoDB } from "./config/mongo.ts";
import {
  AddOrUpdateRating,
  getUserRatingSummary,
} from "./services/rating_services.ts";
import mongoose from "npm:mongoose@^6.7";
import { MONGO_URL } from "./utils/constants.ts";
import { isBotMentioned, isReply, replyToUser } from "./utils/misc.ts";

const BOT_TOKEN = Deno.env.get("BOT_TOKEN");

//connectMongoDB();

await mongoose.connect("mongodb://localhost:27017");

if (!BOT_TOKEN) {
  throw new Error("Bot token is not provided");
}
const bot = new Bot(BOT_TOKEN);

bot.command("karma", async (ctx) => {
  const message = ctx.message;

  // pass all mentions except when its the bot mentioned
  // also make ts linter happy

  const err = isReply(ctx, true);
  if (err) {
    return replyToUser(ctx, err);
  }

  if (!message || !message.reply_to_message || !message.reply_to_message.from) {
    return;
  }
  let ratedUserId = message.reply_to_message.from.id;
  const res = await getUserRatingSummary(String(ratedUserId));
  console.log(res);
  replyToUser(
    ctx,
    ` 
    Karma: ${res.karma}/10 (${res.totalRaters} ${
      res.totalRaters == 1 ? "person" : "people"
    } rated) \nTotal Comments: ${res.totalComments}\n
    `
  );
});

bot.on("msg::mention", async (ctx) => {
  const message = ctx.message;

  // pass all mentions except when its the bot mentioned
  // also make ts linter happy
  if (!message || !isBotMentioned(ctx)) {
    return;
  }

  // mentions that are not replies
  // and replies for self are rejected here
  const err = isReply(ctx, false);
  if (err) {
    return replyToUser(ctx, err);
  }

  const validation = validateRatingSyntax(ctx.message.text!);
  if (validation.isValid) {
    //await AddOrUpdateRating({ userId: })
    let userId = message.from.id;
    //replyToUser(ctx, "Rated successfully. Thanks for contributing ✨✨!");
    let ratedUserId = message.reply_to_message!.from!.id;
    let score = validation.score!;
    let comment = validation.comment;

    const res = await AddOrUpdateRating({
      userId: String(userId),
      ratedUserId: String(ratedUserId),
      comment: String(comment),
      score,
    });

    replyToUser(ctx, res);
  } else {
    ctx.reply(validation.error!, {
      reply_parameters: { message_id: message.message_id },
    });
  }
});

// Start the bot.
bot.start();
