import { createSlice, createSelector, createAsyncThunk } from "@reduxjs/toolkit"

import { client } from "api/client"

export const fetchImages = createAsyncThunk(
  "attributes/fetchImages",
  async (query) => {
    const response = await client.get("/images", query)
    return response
  }
)

export const addNewImage = createAsyncThunk(
  "attributes/addNewImage",
  async (image) => {
    const response = await client.post("/images", image)
    return response
  }
)

const initialState = {
  items: [],
  status: "idle",
}

const imagesSlice = createSlice({
  name: "images",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchImages.pending]: (state, action) => {
      state.status = "loading"
    },
    [fetchImages.fulfilled]: (state, action) => {
      state.status = "success"
      state.items = action.payload
    },
    [fetchImages.rejected]: (state, action) => {
      state.status = "failed"
    },
    [addNewImage.pending]: (state, action) => {
      state.status = "loading"
    },
    [addNewImage.fulfilled]: (state, action) => {
      state.status = "success"
      // state.items = action.payload
    },
    [addNewImage.rejected]: (state, action) => {
      state.status = "failed"
    },
  }
})

export const selectAllImages = (state) => state.images.items

export default imagesSlice.reducer
