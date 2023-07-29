import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://www.themealdb.com/api/json/v1/1/list.php?c=list",
  }),
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => "",
      transformResponse: (res: any) => {
        return res.meals;
      },
    }),
  }),
});
export const { useGetCategoriesQuery } = categoriesApi;
