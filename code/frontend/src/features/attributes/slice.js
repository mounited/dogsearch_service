import { createSlice, createSelector, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
  items: [
    {
      name: "is_animal_there",
      values: ["no", "yes"],
    },
    {
      name: "is_it_a_dog",
      values: ["no", "yes", "undefined"],
    },
    {
      name: "is_the_owner_there",
      values: ["no", "yes", "undefined"],
    },
    {
      name: "color",
      values: ["dark", "light", "undefined"],
    },
    {
      name: "tail",
      values: ["long", "short/absent", "undefined"],
    },
  ],
  status: "idle",
}

const attributesSlice = createSlice({
  name: 'attributes',
  initialState,
  reducers: {},
});

export const selectAllAttributes = (state) => state.attributes.items

export default attributesSlice.reducer
