import { useState } from 'react'
import './App.css'
import Card from './component/Card' 

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
  <h1 className='bg-green-300 text-black p-4 rounded-x mb-4'>Tailwind test</h1>
  <Card username="namik" btnText="visit me"/>
  <Card/>
    </>
  )
}

export default App
