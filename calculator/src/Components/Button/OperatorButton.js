import React from 'react'
import { useDispatch } from 'react-redux'
import { CHOOSE_OPERATION } from '../../Redux/CalculateSlice'


function OperatorButton({operation,theme}) {
  
  const dispatch = useDispatch()
  return (
    <button className={theme==1?'keys':theme==2?'keys2':'keys3'} onClick={()=>dispatch(CHOOSE_OPERATION({operation:operation}))}>{operation}</button>
  )
}

export default OperatorButton