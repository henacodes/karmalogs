import { Bot } from "https://deno.land/x/grammy@v1.36.1/mod.ts";
import { getUserRatingSummary } from "../services/rating_services.ts";
import { isReply, replyToUser } from "../utils/misc.ts";
import { BOT_USERNAME } from "../utils/constants.ts";

export default function handleKarma(bot: Bot) {
  bot.command("karma", async (ctx) => {
    const message = ctx.message;

    const err = isReply(ctx, true);
    if (err) {
      return replyToUser(ctx, err);
    }

    if (
      !message ||
      !message.reply_to_message ||
      !message.reply_to_message.from
    ) {
      return;
    }
    let ratedUserId = message.reply_to_message.from.id;
    const res = await getUserRatingSummary(String(ratedUserId));

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
}
