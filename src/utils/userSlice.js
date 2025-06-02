import { createSlice } from "@reduxjs/toolkit";



const userSlice = createSlice({

  name:"user",
  initialState:[],
  reducers:{

  addUser:(state,action)=>{
     state.push(action.payload);
  },
  removeUser:(state,action)=>{
    const {_id}= action.payload;
     return state.filter((user)=> user._id!==_id);
  }

  }


})

export const {addUser,removeUser} = userSlice.actions;

export default userSlice.reducer;