import { createSlice, createSelector, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
  items: [
    {
      id: "61744f24834e3d009b84d0d7",
      filename: "./6399.jpg",
      attribute_values: {
        is_animal_there: "no",
        is_it_a_dog: "undefined",
        is_the_owner_there: "undefined",
        color: "undefined",
        tail: "undefined",
      },
    },
    {
      id: "61744f25834e3d009b84d0d9",
      filename: "./6602.jpg",
      attribute_values: {
        is_animal_there: "no",
        is_it_a_dog: "undefined",
        is_the_owner_there: "undefined",
        color: "undefined",
        tail: "undefined",
      },
    },
    {
      id: "61744f25834e3d009b84d0db",
      filename: "./599.jpg",
      attribute_values: {
        is_animal_there: "yes",
        is_it_a_dog: "yes",
        is_the_owner_there: "no",
        color: "mixed",
        tail: "absent",
      },
    },
    {
      id: "61744f25834e3d009b84d0dd",
      filename: "./771.jpg",
      attribute_values: {
        is_animal_there: "no",
        is_it_a_dog: "undefined",
        is_the_owner_there: "undefined",
        color: "undefined",
        tail: "undefined",
      },
    },
    {
      id: "61744f25834e3d009b84d0df",
      filename: "./759.jpg",
      attribute_values: {
        is_animal_there: "no",
        is_it_a_dog: "undefined",
        is_the_owner_there: "undefined",
        color: "undefined",
        tail: "undefined",
      },
    },
    {
      id: "61744f25834e3d009b84d0e1",
      filename: "./6788.jpg",
      attribute_values: {
        is_animal_there: "no",
        is_it_a_dog: "undefined",
        is_the_owner_there: "undefined",
        color: "undefined",
        tail: "undefined",
      },
    },
    {
      id: "61744f25834e3d009b84d0e3",
      filename: "./6617.jpg",
      attribute_values: {
        is_animal_there: "no",
        is_it_a_dog: "undefined",
        is_the_owner_there: "undefined",
        color: "undefined",
        tail: "undefined",
      },
    },
    {
      id: "61744f25834e3d009b84d0e5",
      filename: "./6603.jpg",
      attribute_values: {
        is_animal_there: "no",
        is_it_a_dog: "undefined",
        is_the_owner_there: "undefined",
        color: "undefined",
        tail: "undefined",
      },
    },
    {
      id: "61744f25834e3d009b84d0e7",
      filename: "./836.jpg",
      attribute_values: {
        is_animal_there: "no",
        is_it_a_dog: "undefined",
        is_the_owner_there: "undefined",
        color: "undefined",
        tail: "undefined",
      },
    },
    {
      id: "61744f26834e3d009b84d0e9",
      filename: "./822.jpg",
      attribute_values: {
        is_animal_there: "no",
        is_it_a_dog: "undefined",
        is_the_owner_there: "undefined",
        color: "undefined",
        tail: "undefined",
      },
    },
    {
      id: "61744f26834e3d009b84d0eb",
      filename: "./834.jpg",
      attribute_values: {
        is_animal_there: "yes",
        is_it_a_dog: "no",
        is_the_owner_there: "undefined",
        color: "undefined",
        tail: "undefined",
      },
    },
    {
      id: "61744f26834e3d009b84d0ed",
      filename: "./820.jpg",
      attribute_values: {
        is_animal_there: "no",
        is_it_a_dog: "undefined",
        is_the_owner_there: "undefined",
        color: "undefined",
        tail: "undefined",
      },
    },
    {
      id: "61744f26834e3d009b84d0ef",
      filename: "./149.jpg",
      attribute_values: {
        is_animal_there: "no",
        is_it_a_dog: "undefined",
        is_the_owner_there: "undefined",
        color: "undefined",
        tail: "undefined",
      },
    },
    {
      id: "61744f26834e3d009b84d0f1",
      filename: "./2473.jpg",
      attribute_values: {
        is_animal_there: "no",
        is_it_a_dog: "undefined",
        is_the_owner_there: "undefined",
        color: "undefined",
        tail: "undefined",
      },
    },
    {
      id: "61744f26834e3d009b84d0f3",
      filename: "./2467.jpg",
      attribute_values: {
        is_animal_there: "no",
        is_it_a_dog: "undefined",
        is_the_owner_there: "undefined",
        color: "undefined",
        tail: "undefined",
      },
    },
    {
      id: "61744f27834e3d009b84d0f5",
      filename: "./2507.jpg",
      attribute_values: {
        is_animal_there: "yes",
        is_it_a_dog: "no",
        is_the_owner_there: "undefined",
        color: "undefined",
        tail: "undefined",
      },
    },
    {
      id: "61744f27834e3d009b84d0f7",
      filename: "./203.jpg",
      attribute_values: {
        is_animal_there: "yes",
        is_it_a_dog: "yes",
        is_the_owner_there: "no",
        color: "light",
        tail: "long",
      },
    },
    {
      id: "61744f27834e3d009b84d0f9",
      filename: "./6563.jpg",
      attribute_values: {
        is_animal_there: "no",
        is_it_a_dog: "undefined",
        is_the_owner_there: "undefined",
        color: "undefined",
        tail: "undefined",
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
