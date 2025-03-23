
import {configureStore} from "@reduxjs/toolkit";
import toastRedcucr from "./toastSlice"

const store = configureStore({
  //reducer不用加s，因為只有個store
  reducer:{
    toast:toastRedcucr
  }
})

export default store;