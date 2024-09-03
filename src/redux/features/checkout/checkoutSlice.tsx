import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

type TOrder = {
  product: string; 
  quantity: number;
  totalAmount: number;
  name?: string; 
  image?: string; 
};

export type TCheckout = {
  user: string;
  address: string;
  phone: string;
  paymentMethod: "stripe" | "on-delivery";
  orders: TOrder[];
  paymentId?: string;
};


type TState = {
    checkout : TCheckout | {}
}

const initialState: TState = {
  checkout: {},
};

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    addCheckout: (state, action: PayloadAction<TCheckout>) => {
      state.checkout = action.payload 
    },
   
    clearCheckout: (state) => {
      state.checkout = {};
    },
  },
});

export const { addCheckout,clearCheckout } = checkoutSlice.actions;

export default checkoutSlice.reducer;

export const selectCheckout = (state: RootState) => state.checkout.checkout;
