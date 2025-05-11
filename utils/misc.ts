import { Context } from "https://deno.land/x/grammy@v1.36.1/context.ts";
import { BOT_USERNAME } from "./constants.ts";

export function isBotMentioned(ctx: Context) {
  if (ctx && ctx.message?.text) {
    const mentionPattern = new RegExp(`@${BOT_USERNAME}`, "i");

    return mentionPattern.test(ctx.message.text);
  }

  // Return false if there's no message or context object
  return false;
}

export function isReplyToAnotherUser(ctx: Context) {
  const message = ctx.message!;
  if (message.reply_to_message) {
    const repliedUserId = message.reply_to_message.from!.id;
    const currentUserId = message.from.id;

    if (repliedUserId == currentUserId) {
      throw new Error("You can't rate yourself");
    }
  } else {
    throw new Error("You need to reply to a user");
  }
}

export function replyToUser(ctx: Context, message: string) {
  if (ctx.message) {
    ctx.reply(message, {
      reply_parameters: { message_id: ctx.message.message_id },
    });
  }
}
