import { Bot } from "https://deno.land/x/grammy@v1.36.1/mod.ts";
import { findUserRatings } from "../services/rating_services.ts";
import { sendRatingMessage } from "../utils/rating.ts";

export default function handleStart(bot: Bot) {
  bot.command("start", async (ctx) => {
    const message = ctx.message;
    if (!message) {
      return;
    }

    let commandParts = message.text.split(" ");
    if (commandParts.length > 1) {
      const ratedUserId = commandParts[1];
      const ratings = await findUserRatings(ratedUserId);

      ctx.reply(`Ratings for <a href="tg://user?id=${ratedUserId}" >User</a>`, {
        parse_mode: "HTML",
      });
      ratings.forEach((rating) => {
        sendRatingMessage(ctx, rating);
      });

      if (!ratings.length) {
        ctx.reply("No ratings so far ....");
      }
    } else {
      ctx.reply("Welcome to our bot");
    }
  });
}
