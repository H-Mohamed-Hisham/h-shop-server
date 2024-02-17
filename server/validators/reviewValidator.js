export const validateReviewInput = (rating, comment) => {
  const inputError = {};

  if (rating === "") {
    inputError.rating = "Rating must not be empty";
  }

  if (rating < 1 || rating > 5) {
    inputError.rating = "Rating must be between 1 to 5";
  }

  if (comment === "") {
    inputError.comment = "Comment must not be empty";
  }

  return {
    inputError,
    valid: Object.keys(inputError).length < 1,
  };
};
