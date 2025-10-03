import { useState } from 'react'
import './App.css'
import { Button } from "@/components/ui/button"

type Message = {
  content: string,
  sender: number
}

function InputComponent({onClick} : {onClick: any}) {
  let [value, setValue] = useState('');
  
  let handleClick = () => {
    onClick({
      content: value,
      sender: 0
    });
    setValue("");
  }

  let handleEnter = (e: React.KeyboardEvent) => {
    e.key === "Enter" && handleClick();
  }
  
  return (
    <div>
      <input 
        type="text" name="message" id="input-message" value={value} 
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={handleEnter}
      />
      <Button onClick={handleClick} variant="outline">Button</Button>
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
  let [messages, setMessages] = useState<Message[]>([]);

  return (
    <>
      <Chat messages={messages} />
      <InputComponent onClick={(x: Message) => setMessages([...messages,x])} />
    </>
  )
}

export default App
