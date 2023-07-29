interface RecipeThumb{
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
}

interface Recipe extends RecipeThumb {
  strCategory: string;
  strInstructions: string;
  strTags: string;

  [strIngredient: string]: string;
  [strMeasure]: string;
}