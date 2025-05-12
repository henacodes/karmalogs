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

export function isReply(
  ctx: Context,
  selfReplyAllowed: boolean
): string | null {
  const message = ctx.message;
  if (!message) {
    return "Uknown error occured";
  }

  if (!message.reply_to_message) {
    return "You need to reply to a user to use this feature.";
  }

  const repliedUserId = message.reply_to_message.from!.id;
  const currentUserId = message.from.id;

  if (repliedUserId === currentUserId && !selfReplyAllowed) {
    return "You can't rate yourself.";
  }

  return null;
}

export function replyToUser(ctx: Context, message: string, options?: object) {
  if (ctx.message) {
    ctx.reply(message, {
      ...options,
      reply_parameters: { message_id: ctx.message.message_id },
    });
  }
}
