import { Bot } from "https://deno.land/x/grammy@v1.36.1/mod.ts";

import { connectMongoDB } from "./config/mongo.ts";
import { registerHandlers } from "./handlers/index.ts";

const BOT_TOKEN = Deno.env.get("BOT_TOKEN");

connectMongoDB();

if (!BOT_TOKEN) {
  throw new Error("Bot token is not provided");
}
const bot = new Bot(BOT_TOKEN);

registerHandlers(bot);

export default bot;
