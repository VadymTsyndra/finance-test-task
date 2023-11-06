import { createSlice } from "@reduxjs/toolkit";
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

const startPosition = {
  companies: [],
  errors: false,
  loading: true,
}

export function wait(delay) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

const companiesSlice = createSlice({
  name: 'companies',
  initialState: startPosition,
  reducers: {
    loadCompanies: (state, action) => {
      state.companies = action.payload;
      state.errors = false;
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  },
});

export default companiesSlice.reducer;
export const { loadCompanies, setErrors, setLoading } = companiesSlice.actions;

export const fetchCompanies = () => {
  return async (dispatch) => {
    try {
      socket.emit('start');

      socket.on('ticker', (data) => {
        dispatch(loadCompanies(data));
    });
  } catch {
    dispatch(setErrors('Something went wrong while fetching company data'))
  } finally {
    await wait(2000);
    dispatch(setLoading(false));
  }
  
    return () => {
      socket.disconnect();
    }
  }
}
