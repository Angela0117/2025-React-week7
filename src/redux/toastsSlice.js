import {createSlice} from "@reduxjs/toolkit"

//初始狀態可以設成
const initialState = { messages: [] }

const toastSlice = createSlice({
 name:"toast",
 initialState
})

export default toastSlice.reducer