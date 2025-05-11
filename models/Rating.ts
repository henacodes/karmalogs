import { model, Schema } from "npm:mongoose@^6.7";

const ratingSchema = new Schema({
  userId: { type: String, required: true },
  ratedUserId: { type: String, required: true },
  score: { type: Number, min: 1, max: 10, required: true },
  comment: { type: String, default: "" },
  lastUpdated: { type: Date, default: Date.now },
});

// Validations for required fields
ratingSchema.path("userId").required(true, "User ID is required.");
ratingSchema.path("ratedUserId").required(true, "Rated user ID is required.");
ratingSchema.path("score").required(true, "Score is required.");

// Export model.
export default model("Rating", ratingSchema);
