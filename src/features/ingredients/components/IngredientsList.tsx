import React, { useState, useMemo, useRef } from "react";
import { useGetIngredientsQuery } from "../ingredientsApi";
import {
  TextField,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Button,
  IconButton,
  Icon,
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  Typography,
  AppBar,
  Toolbar,
} from "@mui/material";
import { ClickAwayListener } from "@mui/base";
import IngredientsSearch from "./IngredientsSearch";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { adjustQuantity, removeFromSelected } from "../ingredientsSlice";
import Slider from "react-slick";

export interface IIngredientsListProps {}

export default function IngredientsList(props: IIngredientsListProps) {
  const { selectedIngredients } = useAppSelector((state) => state.ingredients);
  const ingredientIds = Object.keys(selectedIngredients);
  const dispatch = useAppDispatch();

  const increaseQuantity = (ingredient: Ingredient) => {
    dispatch(adjustQuantity({ ingredient, quantity: 1 }));
  };
  const decreaseQuantity = (ingredient: Ingredient) => {
    dispatch(adjustQuantity({ ingredient, quantity: -1 }));
  };

  const sliderSettings = {
    dots: true,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
  };

  return (
    <div className="ingredients-list">
      <AppBar position="static" color="primary" elevation={1}>
        <Toolbar>
          <Typography variant="h5">
            Ingredients
          </Typography>
          <div className="ml-auto mr-3">
            <IngredientsSearch />
          </div>
        </Toolbar>
      </AppBar>
      <div className="p-6">
        <Slider {...sliderSettings}>
          {ingredientIds.map((id) => {
            const { ingredient, quantity } = selectedIngredients[id];
            return (
              <div className="">
                <Card
                  key={ingredient.idIngredient}
                  className="shrink-0 relative m-1 w-[12rem]"
                  elevation={3}
                >
                  <CardHeader
                    title={ingredient.strIngredient}
                    titleTypographyProps={{ fontSize: 14 }}
                    action={
                      <IconButton
                        size="small"
                        onClick={() => dispatch(removeFromSelected(ingredient))}
                      >
                        <Icon>close</Icon>
                      </IconButton>
                    }
                  ></CardHeader>
                  <CardMedia
                    component="img"
                    alt={ingredient.strIngredient}
                    image={`https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}.png?`}
                    style={{ height: "8rem", background: "#fafafa" }}
                  />
                  <CardActions>
                    <IconButton
                      size="small"
                      onClick={() => increaseQuantity(ingredient)}
                    >
                      <Icon>add</Icon>
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => decreaseQuantity(ingredient)}
                    >
                      <Icon>remove</Icon>
                    </IconButton>
                    <div className="font-bold ml-auto">{quantity}</div>
                  </CardActions>
                </Card>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
}
