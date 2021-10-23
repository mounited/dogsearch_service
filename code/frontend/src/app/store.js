import { configureStore } from '@reduxjs/toolkit';

import attributesReducer from "features/attributes/slice"
import imagesReducer from "features/images/slice"


export const store = configureStore({
  reducer: {
    attributes: attributesReducer,
    images: imagesReducer,
  },
});
