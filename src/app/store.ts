import { configureStore } from "@reduxjs/toolkit";
import { ingredientsApi } from "@/features/ingredients/ingredientsApi";
import ingredientsSlice from "@/features/ingredients/ingredientsSlice";
import { categoriesApi } from "@/features/categories/categoriesApi";
import { recipesApi } from "@/features/recipes/recipesApi";
export const store = configureStore({
  reducer: {
    ingredients: ingredientsSlice.reducer,
    [ingredientsApi.reducerPath]: ingredientsApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [recipesApi.reducerPath]: recipesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(ingredientsApi.middleware)
      .concat(categoriesApi.middleware)
      .concat(recipesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;