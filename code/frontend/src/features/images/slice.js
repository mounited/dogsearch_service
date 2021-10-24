import { createSlice, createSelector, createAsyncThunk } from "@reduxjs/toolkit"

import { client } from "api/client"

export const fetchImages = createAsyncThunk(
  "attributes/fetchImages",
  async (query, { getState }) => {
    const response = await client.get("/images", query)
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
  }
})

export const selectAllImages = (state) => state.images.items

export default imagesSlice.reducer
