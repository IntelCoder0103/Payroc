import { useGetIngredientsQuery } from "@/features/ingredients/ingredientsApi";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Dialog,
  DialogTitle,
  ImageListItemBar,
  Paper,
  Typography,
} from "@mui/material";
import * as React from "react";
import Slider from "react-slick";

export interface IRecipeDialogProps {
  recipe: Recipe;
  open: boolean;
  onClose: () => void;
}

export default function RecipeDialog(props: IRecipeDialogProps) {
  const { open, recipe, onClose } = props;
  const { data: allIngredients } = useGetIngredientsQuery();
  const recipeIngredients = new Array(20)
    .fill(0)
    .map((_, index) => {
      return recipe[`strIngredient${index + 1}`] ?? "";
    })
    .filter((x) => x !== "");

  const settings = {
    dots: true,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 3,
    variableWidth: true,
  };

  return (
    <Dialog onClose={onClose} open={open}>
      <Paper>
        <CardHeader title={recipe.strMeal} />
        <CardMedia
          component="img"
          image={recipe.strMealThumb}
          style={{ height: "15rem" }}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {recipe.strInstructions}
          </Typography>
          <div className="p-4">
            <Slider {...settings}>
              {recipeIngredients.map((ing, index) => (
                <div className="p-1">
                  <div className="relative ingredient-thumb border">
                    <img
                      src={`https://www.themealdb.com/images/ingredients/${ing}-Small.png?`}
                      className=" w-[8rem]"
                    />
                    <ImageListItemBar
                      title={ing}
                      subtitle={recipe[`strMeasure${index}`]}
                    />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </CardContent>
      </Paper>
    </Dialog>
  );
}
