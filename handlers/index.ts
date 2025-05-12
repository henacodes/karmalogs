import { Bot } from "https://deno.land/x/grammy@v1.36.1/mod.ts";
import handleStart from "./start.ts";
import handleMyKarma from "./my_karma.ts";
import handleKarma from "./karma.ts";
import handleMention from "./mention.ts";

export function registerHandlers(bot: Bot) {
  handleStart(bot);
  handleMyKarma(bot);
  handleKarma(bot);
  handleMention(bot);
}
