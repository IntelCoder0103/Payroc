import React, { useState, useMemo, useRef } from "react";
import { useGetIngredientsQuery } from "../ingredientsApi";
import {
  TextField,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Card,
  Icon,
  Input,
  FilledInput,
} from "@mui/material";
import { ClickAwayListener } from "@mui/base";
import { useDebounce, useAppSelector, useAppDispatch } from "@/app/hooks";
import { FixedSizeGrid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { addToSelected, removeFromSelected } from "../ingredientsSlice";

export interface IIngredientsSearchProps {}

export default function IngredientsSearch(props: IIngredientsSearchProps) {
  const { data: ingredients = [] } = useGetIngredientsQuery();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const [open, setOpen] = useState(false);

  const { selectedIngredients } = useAppSelector((state) => state.ingredients);
  const dispatch = useAppDispatch();

  const filteredIngredients = useMemo(() => {
    const query = debouncedSearch.toLowerCase();
    return ingredients.filter(
      (x) =>
        x.strIngredient.toLowerCase().includes(query) ||
        x.strDescription?.toLowerCase().includes(query)
    );
  }, [debouncedSearch, ingredients]);
  const COL_COUNT = 4;

  const handleIngredientClick = (item: Ingredient) => {
    if (item.idIngredient in selectedIngredients)
      dispatch(removeFromSelected(item));
    else dispatch(addToSelected(item));
  };
  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <div className="flex gap-4 flex-col w-[30rem] relative">
        <Input
          placeholder="Type here to search ingredient"
          className="ingredient-search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setOpen(true)}
          autoFocus
          startAdornment={
            <Icon>search</Icon>
          }
        />
        {open && (
          <Card className="absolute w-full top-[3rem] z-10 p-2" elevation={6}>
            <ImageList sx={{ height: 480 }} cols={COL_COUNT} rowHeight={120}>
              <AutoSizer>
                {({ width, height }) => (
                  <FixedSizeGrid
                    columnCount={COL_COUNT}
                    rowCount={Math.ceil(filteredIngredients.length / COL_COUNT)}
                    rowHeight={110}
                    columnWidth={width / COL_COUNT - 5}
                    width={width}
                    height={height}
                  >
                    {({ rowIndex, columnIndex, style }) => {
                      const item =
                        filteredIngredients[rowIndex * COL_COUNT + columnIndex];
                      if (!item) return <></>;
                      const selected = item.idIngredient in selectedIngredients;
                      return (
                        <div style={style} className="p-1">
                          {selected && (
                            <span className="absolute z-10 right-0 text-green-400">
                              <Icon>task_alt</Icon>
                            </span>
                          )}
                          <div
                            key={item.idIngredient}
                            onClick={() => handleIngredientClick(item)}
                            className="bg-gray-100 relative rounded-md"
                          >
                            <img
                              src={`https://www.themealdb.com/images/ingredients/${item.strIngredient}-Small.png?`}
                              alt={item.strIngredient}
                            />
                            <ImageListItemBar
                              subtitle={item.strIngredient}
                              className="rounded-b-md"
                            />
                          </div>
                        </div>
                      );
                    }}
                  </FixedSizeGrid>
                )}
              </AutoSizer>
            </ImageList>
            {filteredIngredients.length === 0 && (
              <div className="absolute top-[45%] w-full text-center">
                No Ingredients
              </div>
            )}
          </Card>
        )}
      </div>
    </ClickAwayListener>
  );
}
