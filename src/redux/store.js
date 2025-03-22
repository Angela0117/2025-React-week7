
import {configureStore} from "@reduxjs/toolkit";
import toastReducr from "./toastsSlice"

const store = configureStore({
  //reducer不用加s
  reducer:{
    toast:toastReducr
  }
})

export default store;