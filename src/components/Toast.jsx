import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Toast as BsToast} from "bootstrap" //此Toast和土司元件命名有衝突，所以改名
import { removeMessage } from '../redux/toastSlice';



export default function Toast(){
const messages = useSelector((state)=>state.toast.messages)
//console結果為陣列形式(參考toastSlice.js中的messages)
//console.log(messages)

//一個id對應到一個DOM元素
const toastRefs = useRef({})

const dispatch = useDispatch();

//透過 messages 建立 Toast 實例，建立完馬上呼叫 show() 開啟吐司
useEffect(()=>{
  messages.forEach((message)=> {
    const messageElement = toastRefs.current[message.id];

    if(messageElement){
      const toastInstance = new BsToast(messageElement);
      toastInstance.show();
      //
      setTimeout(()=>{
        dispatch(removeMessage(message.id));

      },2000)
    }
  });
},[messages])//當建立新產品時(ProductModal的createProduct)，讓useEffec知道有更新，所以帶入messages

//手動關閉吐司
const handleDismiss = (message_id) => {
  dispatch(removeMessage(message_id));
};

  return(
    <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1000 }}>
      {/*因為是陣列使用map，資料格式參考toastSlice.js中的messages */}
      {messages.map((message)=>(
        <div key={message.id} ref = {(el) => toastRefs.current[message.id] = el} 
        className="toast" role="alert" aria-live="assertive" aria-atomic="true">
          {/*用三元運算子判定背景顏色 */}
          <div className={`toast-header ${message.status === 'success' ? 'bg-success' : 'bg-danger'} text-white `}>
            
            <strong className="me-auto">{message.status === 'success' ? '成功' : '失敗'}</strong>
            
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={()=>{handleDismiss(message.id)}}
            ></button>
          </div>
          <div className="toast-body">{message.text}</div>
        </div>
      ))}
    </div>


  )
}