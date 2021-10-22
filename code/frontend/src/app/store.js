import { configureStore } from '@reduxjs/toolkit';

import attributesReducer from "features/attributes/slice"


export const store = configureStore({
  reducer: {
    attributes: attributesReducer,
  },
});
