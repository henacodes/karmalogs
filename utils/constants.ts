export const INVALID_RATING_FORMAT =
  "Invalid format. Use: @<Bot Username> <rating 1-10> [optional comment]";
export const BOT_USERNAME = Deno.env.get("BOT_USERNAME")!;
export const MONGO_URL = Deno.env.get("MONGO_DB_URL");
