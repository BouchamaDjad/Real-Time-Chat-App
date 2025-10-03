import { useState, useContext, createContext } from 'react'
import './App.css'
import { Button } from "@/components/ui/button"

type Message = {
  content: string,
  sender: number
}

let sendIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
</svg>

let UserIDContext = createContext<string | null>(null);

function InputComponent({onClick} : {onClick: any}) {
  let currentUser = useContext(UserIDContext);
  let [value, setValue] = useState('');
  

  let handleClick = () => {
    value !== "" && onClick({
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
      <Button onClick={handleClick} variant="outline">{sendIcon}</Button>
    </div>
  )
}

function Login({onClick} : {onClick: any}) {
  let [value, setValue] = useState('');
  
  let handleClick = () => {
    value !== "" && onClick(value);
  }

  let handleEnter = (e: React.KeyboardEvent) => {
    e.key === "Enter" && handleClick();
  }
  
  return (
    <div>
      <div className='text-3xl font-bold'>Enter Username</div>
      <input 
        type="text" name="message" id="input-message" value={value} 
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={handleEnter}
      />
      <Button onClick={handleClick} variant="outline">{sendIcon}</Button>
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
    user == null ?
    <Login onClick={setUser} /> : 
    <UserIDContext value={user}>
      <Chat messages={messages} />
      <InputComponent onClick={(x: Message) => setMessages([...messages,x])} />
    </UserIDContext>
  )
}

export default App
