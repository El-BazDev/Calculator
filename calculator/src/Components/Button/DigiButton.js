import { useDispatch } from 'react-redux'
import { ADD_DEGIT } from '../../Redux/CalculateSlice'


function DigiButton({digit,theme}) {
    const dispatch = useDispatch()

  return (
    
    <button className={theme==1?'keys':theme==2?'keys2':'keys3'} onClick={()=>dispatch(ADD_DEGIT({digit:digit}))}>{digit}</button>
  )
}

export default DigiButton