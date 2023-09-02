export const validateProductInput = (
  name,
  image,
  price,
  description,
  brand,
  categoryId,
  countInStock
) => {
  var convertedPrice = parseFloat(price).toFixed(2);

  if (name.trim() === "") {
    inputError.name = "Product name must not be empty";
  }

  if (image.trim() === "") {
    inputError.name = "Image must not be empty";
  }

  if (brand === "") {
    inputError.brand = "Brand must not be empty";
  }

  if (categoryId === "") {
    inputError.categoryId = "Category must not be empty";
  }

  if (description === "") {
    inputError.description = "Description must not be empty";
  }

  if (price === "") {
    inputError.price = "Price must not be empty";
  } else if (!typeof convertedPrice === "number") {
    inputError.countInStock = "Price must be number";
  } else if (convertedPrice <= 0) {
    inputError.price = "Price must be greater than zero";
  }

  if (countInStock === "") {
    inputError.countInStock = "Count-In-Stock must not be empty";
  } else if (!typeof countInStock === "number") {
    inputError.countInStock = "Count-In-Stock must be number";
  }

  return {
    inputError,
    valid: Object.keys(inputError).length < 1,
  };
};
