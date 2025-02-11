import './App.css';
import './Theme2.css'
import './Theme3.css'
import { useSelector, useDispatch } from 'react-redux'
import { CLEAR, DELETE_DIGIT, EVALUATE } from './Redux/CalculateSlice';
import DigiButton from './Components/Button/DigiButton';
import OperatorButton from './Components/Button/OperatorButton';
import { useEffect, useState } from 'react';

function App() {
  const Operand = useSelector(state => state.Calculate)
  const dispatch = useDispatch()
  const interformat = new Intl.NumberFormat("en-Us", { maximumFractionDigits: 0 })
  
  function formatOperand(operand) {
    if (operand === null) return
    const [integer, decimal] = operand.split(".")
    if (decimal === null) return interformat.format(integer)
    return `${interformat.format(integer)}.${decimal}`
  }

  const [theme, setTheme] = useState(1)
  
  useEffect(() => {
    console.log(theme)
  }, [theme]) // Added theme to dependency array

  const getThemeClass = (baseClass, theme) => {
    return theme === 1 ? baseClass : theme === 2 ? `${baseClass}2` : `${baseClass}3`
  }

  return (
    <div className={getThemeClass('Background', theme)}>
      <div className='calculator'>
        <div className={getThemeClass('calculator-header', theme)}>
          <h2>calc</h2>
          <div className='header-theme-selector'>
            <h3>THEME</h3>
            <aside>
              <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
              </ul>
              <input 
                id={getThemeClass('selector', theme)}
                type="range"
                max={3}
                min={1}
                value={theme}
                onChange={(e) => {
                  setTheme(e.target.value)
                  console.log(theme)
                }}
              />
            </aside>
          </div>
        </div>
        <div className={getThemeClass('calculator-screen', theme)}>
          <div className={getThemeClass('previous-operand', theme)}>
            {formatOperand(Operand.previousOperand)} {Operand.operation}
          </div>
          <div className='current-operand'>{formatOperand(Operand.currentOperand)}</div>
        </div>
        <div className={getThemeClass('calculator-keypad', theme)}>
          <div className={getThemeClass('keypad-keys', theme)}>
            <div 
              className={getThemeClass('del-key', theme)}
              onClick={() => dispatch(DELETE_DIGIT())}
            >
              Del
            </div>
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
            <div 
              className={getThemeClass('key-result', theme)}
              onClick={() => dispatch(EVALUATE())}
            >
              =
            </div>
            <div 
              className={getThemeClass('key-reset', theme)}
              onClick={() => dispatch(CLEAR())}
            >
              RESET
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
