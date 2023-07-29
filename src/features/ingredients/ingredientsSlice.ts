import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';

interface IngredientsState{
  selectedIngredients: {
    [ingredientId: string | number]: {
      ingredient: Ingredient,
      quantity: number
    }
  };
}

const initialState: IngredientsState = {
  selectedIngredients: {}
}

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    addToSelected: (state, action: PayloadAction<Ingredient>) => {
      const ingredient = action.payload;
      state.selectedIngredients[ingredient.idIngredient] = {
        ingredient,
        quantity: 1
      };
    },
    removeFromSelected: (state, action: PayloadAction<Ingredient>) => {
      delete state.selectedIngredients[action.payload.idIngredient];
    },
    adjustQuantity: (state, action: PayloadAction<{ ingredient: Ingredient, quantity: number }>) => {
      const { ingredient: {idIngredient}, quantity } = action.payload;
      if (idIngredient in state.selectedIngredients) {
        
        let value = state.selectedIngredients[idIngredient].quantity;
        value = Math.max(1, value + quantity);
        state.selectedIngredients[idIngredient].quantity = value;
      }
    }
  }
});
export const { addToSelected, removeFromSelected, adjustQuantity } =
  ingredientsSlice.actions;

export default ingredientsSlice;