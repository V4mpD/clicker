import { createSlice } from "@reduxjs/toolkit";

interface IUserData {
  data: any[];
  error: null;
  loading: false;
}

const initialState: IUserData = {
  data: [],
  error: null,
  loading: false,
};

export const udataSlice = createSlice({
  name: "user_data",
  initialState,
  reducers: {
    changeValue: (state, data) => {
      const id = data.payload.id;
      const value = data.payload.value;
      const currentUpgrade = state.data.find((item: any) => item.id === id)
      state.data.push({...currentUpgrade,value:currentUpgrade.value=value});
      state.data.pop();
    },
    changeCost: (state, data) => {
      const id = data.payload.id;
      const cost = data.payload.cost;
      const currentUpgrade = state.data.find((item: any) => item.id === id)
      state.data.push({...currentUpgrade,cost:currentUpgrade.cost=cost});
      state.data.pop();

    },
    initData: (state,data) => {
      const upgrade = data.payload;
      state.data.push(data.payload);
    }
  },
});

export const { changeValue,changeCost,initData } = udataSlice.actions;

export default udataSlice.reducer;
