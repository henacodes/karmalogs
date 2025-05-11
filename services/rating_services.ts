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

export async function getUserRatingSummary(ratedUserId: string) {
  try {
    const result = await Rating.aggregate([
      { $match: { ratedUserId } },
      {
        $group: {
          _id: null,
          karma: { $avg: "$score" },
          totalComments: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $ifNull: ["$comment", false] },
                    { $ne: [{ $trim: { input: "$comment" } }, ""] },
                  ],
                },
                1,
                0,
              ],
            },
          },
          raters: { $addToSet: "$userId" }, // collect unique raters
        },
      },
      {
        $project: {
          _id: 0,
          karma: { $round: ["$karma", 2] }, // rounded to 2 decimal places
          totalComments: 1,
          totalRaters: { $size: "$raters" },
        },
      },
    ]);

    if (result.length === 0) {
      return {
        karma: 0,
        totalComments: 0,
        totalRaters: 0,
      };
    }

    return result[0];
  } catch (error) {
    console.error("Error fetching user rating summary:", error);
    throw new Error("Failed to fetch user rating summary.");
  }
}
