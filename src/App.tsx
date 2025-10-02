import { useState } from 'react'
import './App.css'

// Two Important compon-nt 
// whr your usr writ his rspons
// whr vry mssag is isplacd

function InputComponent({onClick} : {onClick: any}) {
  let [value, setValue] = useState('');
  return (
    <div>
      <input type="text" name="message" id="input-message" value={value} onChange={(event) => setValue(event.target.value)}/>
      <button type="submit" onClick={() => onClick({content: value})}>send</button>
    </div>
  )
}

function Chat({messages}: {messages: {content:string}[]}) {
  console.log(messages);
  return (
    <div>
      {messages.map(
          ({content},index) => {
            return <div key={index} className='messages'>
              {content}
            </div>
          }
        )
      }
    </div>
  )
}


function App() {
  let [messages, setMessages] = useState([
  {content: "Hello, there"},
  {content: "Hi How are you?"}
]);

  return (
    <>
      <Chat messages={messages} />
      <InputComponent onClick={(x: {content:string}) => setMessages([...messages,x])} />
    </>
  )
}

export default App
