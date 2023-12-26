import {createSlice} from '@reduxjs/toolkit';

const initialStates = {
  isLogin: false,
  id: '',
  isCompany: false,
  email: '',
  address: '',
  location: '',
  destination: {},
};

export const userSlicer = createSlice({
  name: 'userSlice',
  initialState: initialStates,
  reducers: {
    loginAccount: (state, action) => {
      state.isLogin = true;
      if (action.payload === 'company') {
        state.isCompany = true;
      }
    },
    saveId: (state, action) => {
      if (action.payload) {
        state.id = action.payload || '';
      }
    },
    setAddress: (state, action) => {
      if (action.payload) {
        state.address = action.payload || '';
      }
    },
    setLocation: (state, action) => {
      if (action.payload) {
        state.location = action.payload || '';
      }
    },
    setDestination: (state, action) => {
      if (action.payload) {
        state.destination = action.payload || '';
      }
    },
    logOutAccount: state => {
      state.isLogin = false;
      state.id = '';
      state.isCompany = false;
      state.email = '';
      state.address = '';
      state.location = '';
      state.destination = {};
    },
  },
});

export const {
  loginAccount,
  logOutAccount,
  saveId,
  setAddress,
  setLocation,
  setDestination,
} = userSlicer.actions;

export default userSlicer.reducer;
