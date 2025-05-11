// validateRatingSyntax.ts

import { BOT_USERNAME, INVALID_RATING_FORMAT } from "./constants.ts";

export function validateRatingSyntax(text: string): {
  isValid: boolean;
  score?: number;
  comment?: string;
  error?: string;
} {
  const trimmed = text.trim();

  if (!trimmed.toLowerCase().startsWith(`@${BOT_USERNAME.toLowerCase()}`)) {
    return {
      isValid: false,
      error: INVALID_RATING_FORMAT,
    };
  }

  // Match @Bot 1-10 optional comment
  const pattern = new RegExp(
    `^@${BOT_USERNAME}\\s+([1-9]|10)\\b(?:\\s+(.*))?$`,
    "i"
  );
  const match = trimmed.match(pattern);

  if (!match) {
    return {
      isValid: false,
      error: INVALID_RATING_FORMAT,
    };
  }

  const score = parseInt(match[1], 10);
  if (score < 1 || score > 10) {
    return {
      isValid: false,
      error: INVALID_RATING_FORMAT,
    };
  }

  const comment = match[2]?.trim();

  return {
    isValid: true,
    score,
    comment,
  };
}
