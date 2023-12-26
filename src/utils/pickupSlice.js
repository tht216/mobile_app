import {createSlice} from '@reduxjs/toolkit';

const initialStates = {
  isDone: false,
  customerId: '',
  companyId: '',
  status: '',
  long: 107.281772,
  lat: 10.418179,
  address: 'C79J+CXP, Phước Hải, Đất Đỏ, Bà Rịa - Vũng Tàu, Việt Nam',
  amount: 0,
  serviceType: '',
  subPrice: 0,
  delivery: 0,
  isMissed: false,
  isComplete: false,
  id: '',
};

export const pickupSlice = createSlice({
  name: 'pickupSlicer',
  initialState: initialStates,
  reducers: {
    saveCustomerId: (state, action) => {
      if (action.payload) {
        state.customerId = action.payload || '';
      }
    },
    saveCompanyId: (state, action) => {
      if (action.payload) {
        state.companyId = action.payload || '';
      }
    },
    saveLong: (state, action) => {
      if (action.payload) {
        state.long = action.payload || 0;
      }
    },
    saveLat: (state, action) => {
      if (action.payload) {
        state.lat = action.payload || 0;
      }
    },
    saveAddress: (state, action) => {
      if (action.payload) {
        state.address = action.payload || '';
      }
    },
    saveAmount: (state, action) => {
      if (action.payload) {
        state.amount = action.payload || 0;
      }
    },
    saveServiceType: (state, action) => {
      if (action.payload) {
        state.serviceType = action.payload || 0;
      }
    },
    saveSubPrice: (state, action) => {
      if (action.payload) {
        state.subPrice = action.payload || 0;
      }
    },
    saveDelivery: (state, action) => {
      if (action.payload) {
        state.delivery = action.payload || 0;
      }
    },
    saveId: (state, action) => {
      if (action.payload) {
        state.id = action.payload || '';
      }
    },
    completePickup: state => {
      state.isDone = true;
      state.customerId = '';
      state.companyId = '';
      state.status = '';
      state.long = 0;
      state.lat = 0;
      state.address = '';
      state.amount = 0;
      state.serviceType = '';
    },
    completeDeliveryPickup: state => {
      state.isDone = true;
      state.isComplete = true;
      state.customerId = '';
      state.companyId = '';
      state.status = '';
      state.long = 0;
      state.lat = 0;
      state.address = '';
      state.amount = 0;
      state.serviceType = '';
    },
    nextPickup: state => {
      state.isDone = false;
      state.isComplete = false;
    },
  },
});

export const {
  nextPickup,
  completePickup,
  saveAddress,
  saveAmount,
  saveCompanyId,
  saveCustomerId,
  saveLat,
  saveLong,
  saveServiceType,
  saveSubPrice,
  saveDelivery,
  completeDeliveryPickup,
  saveId
} = pickupSlice.actions;

export default pickupSlice.reducer;
