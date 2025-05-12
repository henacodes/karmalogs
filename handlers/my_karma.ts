import { Bot } from "https://deno.land/x/grammy@v1.36.1/mod.ts";
import { findUserRatings } from "../services/rating_services.ts";
import { sendRatingMessage } from "../utils/rating.ts";

export default function myKarma(bot: Bot) {
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
}
