import { useCallback,useEffect, useState} from "react"
import './pass.css'
export default function Password() {
    const [length, setLength] = useState( 8);
    const [numAllowed, setNumAllowed] = useState(false);
    const [charAllowed, setCharAllowed] = useState(false);
    const [copy,setcopy] = useState(false)
    const [password, setPassword] = useState("");
   /*callback hook
    useCallback is a React Hook that lets you cache a function definition between re-renders.
      */
    const passwordGenerator = useCallback( () => {
    let pass =""
    let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numAllowed ) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*()_{}[]<>?/"
    for(let i=1; i<=length; i++ ){
        let char = Math.floor(Math.random () * str.length +1 ) 
        pass += str.charAt(char)
    }
    setcopy(false)
    setPassword(pass) //passing variable-pass value to store in password
   } ,[length, numAllowed,charAllowed,setPassword]) //callback hook
   
   useEffect(() =>{
    passwordGenerator() // function is called
   }, 
   [length, numAllowed,charAllowed,passwordGenerator])
    function isCopy(){
        navigator.clipboard.writeText(password)
        setcopy(true)
    }
  return (
    <>
    <div >
        <div >
        
      <input 
      type='text' 
      value={password} // gets value from password useState hook
      className='outline-none w-full py-1 px-3 ' 
      placeholder='password ' 
      readOnly />
      <br /><br />
     <button onClick={isCopy} >{copy? "Copied":"Copy"}</button>
    </div> 
    <br />
    <div >
     <div >
     <input type='range' min={6} max={100} 
     value={length}  
     onChange={(e)=> {setLength(e.target.value)}} className='cursor-pointer'  
     />&nbsp;
     <label>
        length:{length}
     </label>
     </div>
     <div > 
     <input type='checkbox' defaultChecked ={numAllowed} 
     id ="numberInput" onChange={() =>{

        setNumAllowed((prev) => !prev)
     }}

     />   
     <label htmlFor='numberInput'> Numbers</label>
     </div>
     <div > 
     <input type='checkbox' defaultChecked ={charAllowed} 
     id ="characterInput" onChange={() =>{

        setCharAllowed((prev) => !prev)
     }}

     />   
     <label htmlFor='characterInput'>  Charaters</label>
     </div>
    </div>
        </div>
      
    </>
  )
}