import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const ingredientsApi = createApi({
  reducerPath: "ingredientsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://www.themealdb.com/api/json/v1/1/list.php?i=list",
  }),
  endpoints: (builder) => ({
    getIngredients: builder.query<Ingredient[], void>({
      query: () => "",
      transformResponse: (res: any) => {
        return res.meals;
      }
    }),
  }),
});
export const { useGetIngredientsQuery } = ingredientsApi;
