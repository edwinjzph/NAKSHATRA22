import {  createSlice } from '@reduxjs/toolkit';





export const eventSlice = createSlice({
  name: 'event',
  initialState:{
    event: null,
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    into: (state,action) => {
      state.event=action.payload;
    },
    outo: (state) =>{
      state.event =null;
    }
  },

});

export const { into,outo} = eventSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined in line where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectevent = (state) => state.event.event;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.


export default eventSlice.reducer;