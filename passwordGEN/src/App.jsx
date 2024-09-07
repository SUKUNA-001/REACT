import { useState,useCallback,useEffect ,useRef} from 'react'
function App() {
  const [length, setLength] = useState(8)
  const[numallow, setNumallow] = useState(false);
  const[charallow, setCharallow] = useState(false);
  const[password,setPassword] = useState("")

  //USEREFhook
  const passwordRef = useRef(null)
  
  const passGen = useCallback(() => {
    let pass=""
    let str="qwertyuioopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM"
    if(numallow)str += "1234567890"
    if(charallow) str += "!@#$%^&*{}[]"

    for(let i=1; i<=length; i++ ){
      let char = Math.floor(Math.random()*str.length+1)

      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length, numallow, charallow, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 99);
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passGen()
  }, [length, numallow, charallow, password])

  return (
    <>
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-400 bg-gray-700" >
      <h1 className='text-white text-center my-2'>Password Genrator</h1>
     <div className='flex shadow rounded-lg overflow-hidden mb-4'>
      <input type='text'
      value={password}
      className='outline-none w-full py-1 px-3'
      placeholder='password'
      readOnly
      ref ={passwordRef}
      />
      <button onClick={copyPasswordToClipboard}className='outline-none bg-blue-600 text-white px-3 py-0.5 shrink-0'>Copy</button>
     </div>
     <div className='flex text-sm gap-x-2'>
     <div className='flex items-center gap-x-1'>
     <input 
        type="range"
        min={6}
        max={100}
        value={length}
         className='cursor-pointer'
         onChange={(e) => {setLength(e.target.value)}}
          />
          <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input 
            type="checkbox"
            defaultChecked={numallow}
            id='numInput'
            onChange={() => {
              setNumallow((prev) => !prev);
            }}
            />
            <label htmlFor='numberInput'>Number</label>
          </div>
          <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={charallow}
              id="characterInput"
              onChange={() => {
                  setCharallow((prev) => !prev )
              }}
          />
          <label htmlFor='characterInput'>Charcter</label>
     </div>
    </div>
    </div>
    </>
  )
}

export default App


