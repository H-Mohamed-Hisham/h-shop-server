export const validateCategoryInput = (name) => {
  const inputError = {};

  if (name.trim() === "") {
    inputError.name = "Name must not be empty";
  }

  return {
    inputError,
    valid: Object.keys(inputError).length < 1,
  };
};
