import { Bot } from "https://deno.land/x/grammy@v1.36.1/mod.ts";

const BOT_TOKEN = Deno.env.get("BOT_TOKEN");

console.log("BO TOKEN", BOT_TOKEN);
if (!BOT_TOKEN) {
  throw new Error("Bot token is not provided");
}

// Create an instance of the `Bot` class and pass your bot token to it.
const bot = new Bot(BOT_TOKEN); // <-- put your bot token between the ""

// You can now register listeners on your bot object `bot`.
// grammY will call the listeners when users send messages to your bot.

// Handle the /start command.
bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));
// Handle other messages.
bot.on("message", (ctx) => {
  ctx.reply("Got another message!");
  console.log(ctx);
});

// Now that you specified how to handle messages, you can start your bot.
// This will connect to the Telegram servers and wait for messages.

// Start the bot.
bot.start();
