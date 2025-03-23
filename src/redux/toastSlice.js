import {createSlice} from "@reduxjs/toolkit"

//初始狀態可以設成
// const initialState = { messages: [] }

//測試資料
const initialState = {
  messages: [
    // {
    //   id: Date.now(),
    //   text: "hello",
    //   status: "success",
    // },
  ],
};


const toastSlice = createSlice({
 name:"toast",
 initialState,
 //在 API 回傳後透過 slice 設定的 action 新增吐司訊息（通知使用者結果）：前置作業
 //1. reducer要加s，因為Slice有很多個
 //2. 在 slice 設定 reducers，並將 actions 解構後匯出
 //3 pushMessage：可以透過 Date.now() 作為 id
 reducers:{
  pushMessage(state,action){
    //如上測試資料，先將text和status解構出來
    const {text ,status} = action.payload;
    const id = Date.now();
    
    //此處的state就是initialState.messages這個陣列，將資料Push進去
    state.messages.push({
      id,
      text,
      status
    })
  },
  //透過 message_id 去陣列裡面找尋相對應的index
  removeMessage(state,action){
    const message_id = action.payload;
    //當message.id 等於我們傳入的message_id，就會給index，如果找不到就是-1
    const index = state.messages.findIndex((message) => message.id === message_id);
    //刪除存在Store裡的舊吐司訊息：如果不是-1，就刪除該筆資料，讓每次出現的只有最新一筆的吐司
    if (index!==-1){
      state.messages.splice(index,1);
    }
  }
}
})
export const { pushMessage,removeMessage } = toastSlice.actions;
export default toastSlice.reducer;