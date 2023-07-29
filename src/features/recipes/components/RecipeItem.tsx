import React, { useState } from "react";
import {
  IconButton,
  ImageListItem,
  ImageListItemBar,
  Icon,
} from "@mui/material";
import { useLazyGetRecipeByMealIdQuery } from "../recipesApi";
import RecipeDialog from "./RecipeDialog";

export interface IRecipeItemProps {
  recipeThumb: RecipeThumb;
}

export default function RecipeItem(props: IRecipeItemProps) {
  const { recipeThumb } = props;
  const [open, setOpen] = useState(false);
  const [trigger, { data: recipe }] = useLazyGetRecipeByMealIdQuery();

  const fetchRecipe = async () => trigger(recipeThumb.idMeal);
  const onClose = () => setOpen(false);
  const openDialog = async () => {
    await fetchRecipe();
    setOpen(true);
  };
  return (
    <ImageListItem>
      <img src={`${recipeThumb.strMealThumb}`} />
      <ImageListItemBar
        title={recipeThumb.strMeal}
        actionIcon={
          <IconButton onClick={fetchRecipe}>
            <Icon sx={{ color: `rgba(255,255,255,.54)` }}>restaurant</Icon>
          </IconButton>
        }
        onClick={openDialog}
        className="cursor-pointer"
      />
      {recipe && <RecipeDialog recipe={recipe} open={open} onClose={onClose} />}
    </ImageListItem>
  );
}
