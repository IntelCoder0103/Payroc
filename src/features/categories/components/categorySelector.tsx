import React, { useState } from "react";
import { useGetCategoriesQuery } from "../categoriesApi";
import {
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Box,
  Chip,
  MenuItem,
} from "@mui/material";

export interface ICategorySelectorProps {
  selected: string[];
  setSelected: (value: string[]) => void;
}

export default function CategorySelector(props: ICategorySelectorProps) {
  const { data: categories = [] } = useGetCategoriesQuery();
  const { selected, setSelected } = props;

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelected(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  return (
    <div>
      <FormControl sx={{ width: "100%" }}>
        <InputLabel id="demo-multiple-chip-label">Categories</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={selected}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {categories.map(({ strCategory }) => (
            <MenuItem key={strCategory} value={strCategory}>
              {strCategory}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
