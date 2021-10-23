import { createSlice, createSelector, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
  items: [
    {
      id: "617329f51e3aaa9c0c8e2838",
      filename: "134.jpg",
      attribute_values: {
        is_animal_there: "no",
        is_it_a_dog: "undefined",
        is_the_owner_there: "undefined",
        color: "undefined",
        tail: "undefined",
      },
    },
    {
      id: "617329f61e3aaa9c0c8e283a",
      filename: "149.jpg",
      attribute_values: {
        is_animal_there: "yes",
        is_it_a_dog: "yes",
        is_the_owner_there: "no",
        color: "dark",
        tail: "absent",
      },
    },
    {
      id: "617329f61e3aaa9c0c8e283c",
      filename: "203.jpg",
      attribute_values: {
        is_animal_there: "yes",
        is_it_a_dog: "no",
        is_the_owner_there: "undefined",
        color: "undefined",
        tail: "undefined",
      },
    },
    {
      id: "617329f61e3aaa9c0c8e283e",
      filename: "210.jpg",
      attribute_values: {
        is_animal_there: "no",
        is_it_a_dog: "undefined",
        is_the_owner_there: "undefined",
        color: "undefined",
        tail: "undefined",
      },
    },
    {
      id: "617329f61e3aaa9c0c8e2840",
      filename: "220.jpg",
      attribute_values: {
        is_animal_there: "yes",
        is_it_a_dog: "no",
        is_the_owner_there: "undefined",
        color: "undefined",
        tail: "undefined",
      },
    },
    {
      id: "617329f61e3aaa9c0c8e2844",
      filename: "2343.jpg",
      attribute_values: {
        is_animal_there: "yes",
        is_it_a_dog: "yes",
        is_the_owner_there: "no",
        color: "mixed",
        tail: "long",
      },
    },
  ],
  status: "idle",
}

const imagesSlice = createSlice({
  name: "images",
  initialState,
  reducers: {},
})

export const selectAllImages = (state) => state.images.items

export default imagesSlice.reducer
