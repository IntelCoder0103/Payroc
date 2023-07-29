import * as React from 'react';
import { useLazyGetRecipesFromIngredientsQuery } from '../recipesApi';
import { ImageList, ImageListItem, ImageListItemBar, useMediaQuery } from '@mui/material';
import RecipeItem from './RecipeItem';

export interface IRecipesListProps {
  recipes: RecipeThumb[]
}

export default function RecipesList(props: IRecipesListProps) {
  const { recipes } = props;
  const isMobile = useMediaQuery('(max-width: 576px)');
  
  return (
    <div>
      <ImageList cols={isMobile? 1: 3} gap={12}>
        {recipes.map((r) => (
          <RecipeItem recipeThumb={r}/>
        ))}
      </ImageList>
    </div>
  );
}
