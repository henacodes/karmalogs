import { Bot } from "https://deno.land/x/grammy@v1.36.1/mod.ts";
import { sendRatingMessage, validateRatingSyntax } from "./utils/rating.ts";
import {
  AddOrUpdateRating,
  findUserRatings,
  getUserRatingSummary,
} from "./services/rating_services.ts";
import mongoose from "npm:mongoose@^6.7";
import { BOT_USERNAME, MONGO_URL } from "./utils/constants.ts";
import { isBotMentioned, isReply, replyToUser } from "./utils/misc.ts";
import { registerHandlers } from "./handlers/index.ts";

const BOT_TOKEN = Deno.env.get("BOT_TOKEN");

//connectMongoDB();

await mongoose.connect(MONGO_URL!);

console.log(mongoose.connection.readyState);

if (!BOT_TOKEN) {
  throw new Error("Bot token is not provided");
}
const bot = new Bot(BOT_TOKEN);
/*
bot.command("mykarma", async (ctx) => {
  if (ctx.chat.type != "private") return;
  const userId = ctx.chat.id;
  const ratings = await findUserRatings(String(userId));

  ctx.reply(
    ratings.length ? `Your Ratings` : "You didn't get any ratings so far"
  );
  ratings.forEach((rating) => {
    sendRatingMessage(ctx, rating);
  });
});

bot.command("karma", async (ctx) => {
  const message = ctx.message;

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

  const inlineKeyboard = [
    [
      {
        text: "See more",
        url: `https://t.me/${BOT_USERNAME}?start=${ratedUserId}`,
      },
    ],
  ];
  replyToUser(
    ctx,
    ` 
    🏆 Karma: ${res.karma}/10 (${res.totalRaters} ${
      res.totalRaters == 1 ? "person" : "people"
    } rated) \n\n💬 Total Comments: ${res.totalComments}\n
    `,
    {
      reply_markup: {
        inline_keyboard: inlineKeyboard, // Attach the inline keyboard
      },
    }
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
*/
registerHandlers(bot);

export default bot;
