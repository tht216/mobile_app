import {configureStore} from '@reduxjs/toolkit';
import {api} from './src/utils/api';
import userReduce from './src/utils/userSlicer';
import {goongApi} from './src/utils/goongapi';
import pickupSlice from './src/utils/pickupSlice';
export const store = configureStore({
  reducer: {
    // Tạo thêm slice từ api
    [api.reducerPath]: api.reducer,
    [goongApi.reducerPath]: goongApi.reducer,
    userReduce,
    pickupSlice
  },

  // Thêm cấu hình middleware để dùng được các chức năng của RTK Query như caching, invalidation, polling, ...
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware).concat(goongApi.middleware),
});
