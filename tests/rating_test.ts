import {
  assertEquals,
  assertFalse,
  assertObjectMatch,
} from "https://deno.land/std@0.224.0/assert/mod.ts";
import { validateRatingSyntax } from "../utils/rating.ts";
import { BOT_USERNAME, INVALID_RATING_FORMAT } from "../utils/constants.ts";

Deno.test("valid rating with comment", () => {
  const result = validateRatingSyntax(`@${BOT_USERNAME} 7 helpful user`);
  assertEquals(result, {
    isValid: true,
    score: 7,
    comment: "helpful user",
  });
});

Deno.test("valid rating without comment", () => {
  const result = validateRatingSyntax(`@${BOT_USERNAME} 3`);
  assertEquals(result, {
    isValid: true,
    score: 3,
    comment: undefined,
  });
});

Deno.test("invalid: missing @ mention", () => {
  const result = validateRatingSyntax("MyBot 4 nice");
  assertObjectMatch(result, {
    isValid: false,
    error: INVALID_RATING_FORMAT,
  });
});

Deno.test("invalid: bad format", () => {
  const result = validateRatingSyntax(`@${BOT_USERNAME} cool person`);
  assertObjectMatch(result, {
    isValid: false,
    error: INVALID_RATING_FORMAT,
  });
});

Deno.test("invalid: out-of-range score", () => {
  const result = validateRatingSyntax(`@${BOT_USERNAME} 11 too much`);
  assertObjectMatch(result, {
    isValid: false,
    error: INVALID_RATING_FORMAT,
  });
});

Deno.test("invalid: zero is not allowed", () => {
  const result = validateRatingSyntax(`@${BOT_USERNAME} 0`);
  assertObjectMatch(result, {
    isValid: false,
    error: INVALID_RATING_FORMAT,
  });
});
