// समीक्षाओं से रेटिंग का सारांश निकालने वाला छोटा हेल्पर।
// यह सिर्फ़ उन्हीं समीक्षाओं को गिनता है जिनमें 1 से 5 के बीच मान्य rating हो —
// इसलिए वेबसाइट पर दिखने वाला औसत हमेशा वास्तविक डेटा से बनता है।

import reviews from '../data/reviews.js';

export function getRatingSummary() {
  if (!Array.isArray(reviews) || reviews.length === 0) {
    return null;
  }

  const rated = reviews.filter(
    (review) => Number.isFinite(review.rating) && review.rating >= 1 && review.rating <= 5
  );

  if (rated.length === 0) {
    return null;
  }

  const total = rated.reduce((sum, review) => sum + review.rating, 0);

  return {
    average: total / rated.length,
    count: rated.length,
    verified: rated.filter((review) => review.verified).length,
  };
}

export default getRatingSummary;
