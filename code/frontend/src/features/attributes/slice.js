import { createSlice, createSelector, createAsyncThunk } from "@reduxjs/toolkit"

import { client } from "api/client"

export const fetchAttributes = createAsyncThunk(
  "attributes/fetchAttributes",
  async (_, { getState }) => {
    const response = await client.get("/attributes")
    return response
  }
)

const initialState = {
  items: [],
  status: "idle",
}

const attributesSlice = createSlice({
  name: 'attributes',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAttributes.pending]: (state, action) => {
      state.status = "loading"
    },
    [fetchAttributes.fulfilled]: (state, action) => {
      state.status = "success"
      state.items = action.payload
    },
    [fetchAttributes.rejected]: (state, action) => {
      state.status = "failed"
    },
  },
});

export const selectAllAttributes = (state) => state.attributes.items

export default attributesSlice.reducer
