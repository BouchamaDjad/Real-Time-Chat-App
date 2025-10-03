import { useState, useContext, createContext } from 'react'
import './App.css'
import { Button } from "@/components/ui/button"

type Message = {
  content: string,
  sender: number
}

let UserIDContext = createContext<string | null>(null);

function InputComponent({onClick} : {onClick: any}) {
  let currentUser = useContext(UserIDContext);
  let [value, setValue] = useState('');
  

  let handleClick = () => {
    onClick({
      content: value,
      sender: currentUser
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

function Login({onClick} : {onClick: any}) {
  let [value, setValue] = useState('');
  
  let handleClick = () => {
    onClick(value);
  }

  let handleEnter = (e: React.KeyboardEvent) => {
    e.key === "Enter" && handleClick();
  }
  
  return (
    <div>
      <h1>Enter Username</h1>
      <input 
        type="text" name="message" id="input-message" value={value} 
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={handleEnter}
      />
      <Button onClick={handleClick} variant="outline">Button</Button>
    </div>
  )
}

function Chat({messages}: {messages: Message[]}) {
  console.log(messages);
  return (
    <div>
      {messages.map(
          ({content, sender},index) => {
            return <div key={index} className='messages'>
              {sender}:{content}
            </div>
          }
        )
      }
    </div>
  )
}


function App() {
  let [user, setUser] = useState<string | null>(null);
  let [messages, setMessages] = useState<Message[]>([]);

  return (
    user === null ?
    <Login onClick={setUser} /> : 
    <UserIDContext value={user}>
      <Chat messages={messages} />
      <InputComponent onClick={(x: Message) => setMessages([...messages,x])} />
    </UserIDContext>
  )
}

export default App
