import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
 import { javascript } from '@codemirror/lang-javascript';
import { aura } from '@uiw/codemirror-theme-aura';
import ReactMarkdown from "react-markdown"

import "./App.css"
import Button from './components/Button';
import Select from './components/Select';
import OutputCont from './components/OutputCont';

function App() {
  const [code, setCode] = React.useState("");

  const [language,setLanguage] = React.useState("");

  const [output,setOutput] = React.useState("Output will be generated here...")

  const [isLoadingConvert, setIsLoadingConvert] = React.useState(false);
  const [isLoadingDebug, setIsLoadingDebug] = React.useState(false);
  const [isLoadingQualityCheck, setIsLoadingQualityCheck] = React.useState(false);
  const [isLoadingExecute, setIsLoadingExecute] = React.useState(false);

  const onEdit = React.useCallback((value, viewUpdate) => {
    setCode(value)
  }, []);

  async function convertCode(){
    try {
      setIsLoadingConvert(true)
      setOutput("Converting your code...")
      let req = await fetch(`https://lazy-ruby-angelfish-tam.cyclic.cloud/api/convert`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({code,language})
      });
      let res =await req.json();

      setIsLoadingConvert(false)
      
      if(!res.error){
      setOutput(res.data)
      }
      else{
        alert(res.msg)
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function debugCode(){
    setIsLoadingDebug(true)
    setOutput("Debugging your code...")
    try {
      let req = await fetch(`https://lazy-ruby-angelfish-tam.cyclic.cloud/api/debug`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({code})
      });
      let res =await req.json();
      setIsLoadingDebug(false);
      if(!res.error){
        setOutput(res.data)
        }
        else{
          alert(res.msg)
    } 
  }catch (error) {
      console.log(error)
    }
  }

  async function checkCodeQuality(){

    try {
      setIsLoadingQualityCheck(true)
      setOutput("Analyzing your code...")
      let req = await fetch(`https://lazy-ruby-angelfish-tam.cyclic.cloud/api/qualityCheck`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({code})
      });
      let res =await req.json();
      setIsLoadingQualityCheck(false)
      if(!res.error){
        setOutput(res.data)
        }
        else{
          alert(res.msg)
    } 
  }catch (error) {
      console.log(error)
    }
  }

  async function executeCode(){
    try {
      setIsLoadingExecute(true)
      setOutput("Executing your code...")
      let req = await fetch(`https://lazy-ruby-angelfish-tam.cyclic.cloud/api/execute`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({code})
      });
      let res =await req.json();
      setIsLoadingExecute(false)
      if(!res.error){
        setOutput(res.data)
        }
        else{
          alert(res.msg)
    } 
  }catch (error) {
      console.log(error)
    }
  }

  const [isShown, setIsShown] = React.useState(false);

  const [theme,setTheme] = React.useState("");
  let themes = ["light","dark"]

  React.useEffect(() => {
    setTimeout(() => {
      setIsShown(true);
    }, 1000);
  }, []);

   const handleThemeChange = (event) => {
    const selectedTheme = event.target.value;
    setTheme(selectedTheme);
  };

  const handleLangChange=(e)=>{
   setLanguage(e.target.value)
  }

  return (
    <div>
      <h1 style={{textAlign:"center"}} className={`welcome-heading ${isShown ? 'animate-fade-in' : ''}`}>WELCOME TO THE <span className="typewriter">CODE MASTER</span></h1>
      <div className='btnCont'>
    <Select handleLangChange={handleLangChange}/>
    <Button value="Covert Code" handleClick={convertCode} isLoading={isLoadingConvert} />
        <Button value="Debug Code" handleClick={debugCode} isLoading={isLoadingDebug} />
        <Button value="Check Code Quality" handleClick={checkCodeQuality} isLoading={isLoadingQualityCheck} />
        <Button value="Run Code" handleClick={executeCode} isLoading={isLoadingExecute} />
    </div>
      <div className='main'>
      <div className='code-editor'>
      <select value={theme} onChange={handleThemeChange}>
        <option value="">Chnage Theme</option>
        {themes.map((themeOption) => (
          <option key={themeOption} value={themeOption}>
            {themeOption}
          </option>
        ))}
      </select>
      <CodeMirror
      value="//Enter your code here..."
      width= "35rem"
      height="30rem"
      theme={theme || aura}
      extensions={[javascript({ jsx: true })]}
      onChange={onEdit}
    />
   
      </div>
      
   {/* <OutputCont value={output || "YOUR RESPONSE WILL BE GENERATED HERE..."}/> */}
   <div className='markdown'>
   <ReactMarkdown>{output}</ReactMarkdown>
   </div>
   
      </div>
    </div>
    
  );
}
export default App;
