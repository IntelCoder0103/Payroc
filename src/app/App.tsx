import { useState } from "react";
import Button from '@mui/material/Button';
import IngredientsList from "@/features/ingredients/components/IngredientsList";
import CategorySelector from "@/features/categories/components/categorySelector";
import { Card, FormControl, Icon, InputLabel, Slider, Typography } from "@mui/material";
import RecipesList from "@/features/recipes/components/RecipesList";
import { useLazyGetRecipesFromIngredientsQuery } from "@/features/recipes/recipesApi";
import { useAppSelector } from "./hooks";

function App() {
  const [trigger, { data: recipes = [] }] = useLazyGetRecipesFromIngredientsQuery();
  
  const { selectedIngredients } = useAppSelector(
    (state) => state.ingredients
  );
  const [categories, setCategories] = useState<string[]>([]);
  const handleSearch = async () => {
    const ingredients = Object.keys(selectedIngredients).map(id => selectedIngredients[id].ingredient)

    await trigger({
      ingredients,
      categories
    });
  }
  const sliderValueText = (value) => {
    return `${value} mins`;
  }
  return (
    <div className="flex  flex-col md:flex-row">
      <div className="sidebar shrink-0 border-r-2 p-4 pt-8 md:min-h-[100vh] bg-gray-50">
        <div className="flex flex-col gap-4">
          <CategorySelector selected={categories} setSelected={setCategories} />
          <div className="p-2">
            <Typography gutterBottom>Cooking Time</Typography>
            <Slider
              defaultValue={[30, 90]}
              getAriaLabel={() => "Temperature range"}
              valueLabelDisplay="auto"
              min={0}
              max={180}
              step={10}
              marks
              valueLabelFormat={sliderValueText}
              getAriaValueText={sliderValueText}
            />
          </div>
          <Button variant="contained" fullWidth onClick={handleSearch}>
            Search
          </Button>
        </div>
      </div>
      <div className="main">
        <div className="border-b-2">
          <IngredientsList />
        </div>
        <div className="p-4">
          <RecipesList recipes={recipes} />
        </div>
      </div>
    </div>
  );
}

export default App;
