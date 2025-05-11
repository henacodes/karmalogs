export interface Rating {
  userId: string;
  ratedUserId: string;
  score: number;
  comment: string;
}

interface RatingSummary {
  karma: number;
  totalComments: number;
  totalRaters: number;
}
