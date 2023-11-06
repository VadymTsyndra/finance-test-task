import { configureStore } from '@reduxjs/toolkit';
import companiesSlice from '../features/companies/companiesSlice';

export const store = configureStore({
  reducer: {
    companiesSlice,
  },
});
