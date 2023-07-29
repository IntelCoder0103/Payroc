import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const recipesApi = createApi({
  reducerPath: "recipesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://www.themealdb.com/api/json/v1/1",
  }),
  endpoints: (builder) => ({
    getRecipesFromIngredients: builder.query<
      RecipeThumb[],
      { ingredients: Ingredient[]; categories: string[] }
    >({
      query: ({ ingredients, categories }) =>
        `/filter.php?${ingredients.map((i) => `i=${i.strIngredient}`).join("&")}
        `,
      transformResponse: (res: any) => {
        return res.meals ?? [];
      },
    }),
    getRecipeByMealId: builder.query<Recipe, string>({
      query: (id) => `/lookup.php?i=${id}`,
      transformResponse: (res: any) => {
        return (res.meals ?? [])[0];
      },
    }),
  }),
});
export const { useGetRecipesFromIngredientsQuery, useLazyGetRecipesFromIngredientsQuery, useLazyGetRecipeByMealIdQuery } = recipesApi;
