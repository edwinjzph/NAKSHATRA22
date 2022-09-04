import {  createSlice } from '@reduxjs/toolkit';





export const subSlice = createSlice({
  name: 'sub',
  initialState:{
    sub: null,
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    int: (state,action) => {
      state.sub=action.payload;
    },
    out: (state) =>{
      state.sub =null;
    }
  },

});

export const { int,out} = subSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined in line where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectsub = (state) => state.sub.sub;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.


export default subSlice.reducer;