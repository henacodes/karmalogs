import Rating from "../models/Rating.ts";
import { type Rating as RatingType } from "../types.ts";

export async function AddOrUpdateRating(rating: RatingType) {
  const alreadyExists = await Rating.find({
    userId: rating.userId,
    ratedUserId: rating.ratedUserId,
  });

  if (alreadyExists[0]) {
    // update the existing rating with a new one
    const prevRating = alreadyExists[0];

    prevRating.score = rating.score || prevRating.score;
    prevRating.comment = rating.comment || prevRating.comment;

    await prevRating.save();

    return "Rated updated successfully. Thanks for contributing ✨✨";
  } else {
    const newRating = new Rating({ ...rating, lastUpdated: new Date() });
    await newRating.save();
    return "Rated successfully. Thanks for contributing ✨✨!";
  }
}

export async function findUserRatings(userId: string) {
  const ratings = await Rating.find({ userId });
  return ratings;
}
