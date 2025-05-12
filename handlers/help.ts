import { Bot } from "https://deno.land/x/grammy@v1.36.1/mod.ts";

export default function handleHelp(bot: Bot) {
  bot.command("help", async (ctx) => {
    if (ctx.chat.type != "private") return;

    ctx.reply(
      `Private cases
        \n/start - Start the bot
        \n/mykarma - See peoples rating of you
        \n/help - get help message

        \nIn groups
        \nTo use the bot in groups, first add the bot to the group.
        \nTo rate a user in a group, reply to the user's message in the group with a text in the following format
        \n@KarmalogsBot <Your rating 1-10 ( inclusive )> [optional comment about the person]
        \nFor example, you may send 
        \n@KarmalogsBot 8 He is very humble and good
        \nThis means you rated the user 8/10 and gave him a comment for other people to see

        \nPS: Your rating is total anonymous and you can update it anytime.

        \nAlso the bot is under development and if you have something to say about it, please reach out to me at @genuinely_curious
        
        `
    );
  });
}
