import './App.css';
import './Theme2.css'
import './Theme3.css'
import { useSelector, useDispatch } from 'react-redux'
import { CLEAR, DELETE_DIGIT, EVALUATE } from './Redux/CalculateSlice';
import DigiButton from './Components/Button/DigiButton';
import OperatorButton from './Components/Button/OperatorButton';
import { useEffect, useState } from 'react';


function App() {

  const Operand = useSelector(state=>state.Calculate)
  const dispatch = useDispatch()

  const interformat =  new Intl.NumberFormat("en-Us",{maximumFractionDigits:0})

  function formatOperand(operand){
    if (operand == null) return 
    const [integer,decimal]=operand.split(".")
    if (decimal == null) return interformat.format(integer)
    return `${interformat.format(integer)}.${decimal}`
  }
  
  const [theme,setTheme] = useState(1)

  useEffect(() => {
    console.log(theme)
  }, [])

  return (
  <div className={theme == 1 ? 'Background' : theme == 2 ? 'Background2' : 'Background3' } >
    <div className='calculator'>
      <div className={theme == 1 ? 'calculator-header' : theme == 2 ? 'calculator-header2' : 'calculator-header3' }>
        <h2>calc</h2>
        <div className='header-theme-selector'>
          <h3>THEME</h3>
          <aside>
          <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
          </ul>
          <input id={theme==1?'selector':theme==2? 'selector2' : 'selector3'} type="range" max={3} min={1} value={theme} onChange={(e)=>{setTheme(e.target.value);console.log(theme)}} />
        </aside>
        </div>
      </div>
      <div className={theme == 1 ? 'calculator-screen' : theme == 2 ? 'calculator-screen2' : 'calculator-screen3' }>
        <div className={theme == 1 ? 'previous-operand' : theme == 2 ? 'previous-operand2' : 'previous-operand3' }>{formatOperand(Operand.previousOperand)} {Operand.operation}</div>
        <div className='current-operand'>{formatOperand(Operand.currentOperand)}</div>
      </div>
      <div className={theme == 1 ? 'calculator-keypad' : theme == 2 ? 'calculator-keypad2' : 'calculator-keypad3' }>
        <div className={theme == 1 ? 'keypad-keys' : theme == 2 ? 'keypad-keys2' : 'keypad-keys3' }>
          <div className={theme==1?'del-key':theme==2?'del-key2':'del-key3'} onClick={()=>dispatch(DELETE_DIGIT())}>Del</div>
          <DigiButton theme={theme} digit='9'/>
          <DigiButton theme={theme} digit='8'/>
          <DigiButton theme={theme} digit='7'/>
          <OperatorButton theme={theme} operation='+'/>
          <DigiButton theme={theme} digit='6'/>
          <DigiButton theme={theme} digit='5'/>
          <DigiButton theme={theme} digit='4'/>
          <OperatorButton theme={theme} operation='-'/>
          <DigiButton theme={theme} digit='3'/>
          <DigiButton theme={theme} digit='2'/>
          <DigiButton theme={theme} digit='1'/>
          <OperatorButton theme={theme} operation='*'/>
          <OperatorButton theme={theme} operation='/'/>
          <DigiButton theme={theme} digit='0'/>
          <DigiButton theme={theme} digit='.'/>
          <div className={theme==1?'key-result':theme==2?'key-result2':'key-result3'} onClick={()=>dispatch(EVALUATE())}>=</div>
          <div className={theme==1?'key-reset':theme==2?'key-reset2':'key-reset3'} onClick={()=>dispatch(CLEAR())}>RESET</div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default App;

