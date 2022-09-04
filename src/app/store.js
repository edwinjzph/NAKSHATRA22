import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import subReducer from '../features/subSlice'
import eventsslice from '../features/eventsslice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    sub: subReducer,
    event:eventsslice,
  },
});
