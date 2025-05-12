import { Bot } from "https://deno.land/x/grammy@v1.36.1/mod.ts";
import { isBotMentioned, isReply, replyToUser } from "../utils/misc.ts";
import { validateRatingSyntax } from "../utils/rating.ts";
import { AddOrUpdateRating } from "../services/rating_services.ts";

export default function mention(bot: Bot) {
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
}
