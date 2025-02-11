import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentOperand: null,
    previousOperand: null,
    operation: null,
    overwrite: false
}

function evaluate({currentOperand, previousOperand, operation}) {
    const prev = parseFloat(previousOperand)
    const current = parseFloat(currentOperand)
    
    if (isNaN(prev) || isNaN(current)) {
        return ""
    }
    
    let computation = ""
    switch (operation) {
        case "+":
            computation = prev + current
            break
        case "*":
            computation = prev * current
            break
        case "/":
            computation = prev / current
            break
        case "-":
            computation = prev - current  // Fixed: was using division instead of subtraction
            break
        default:
            return ""  // Added default case
    }
    return computation.toString()
}

export const CalculateSlice = createSlice({
    name: 'Calculate',
    initialState,
    reducers: {
        ADD_DEGIT: (state, action) => {
            if (state.overwrite) {
                return {
                    ...state,
                    currentOperand: action.payload.digit,
                    overwrite: false
                }
            }
            if (action.payload.digit === "0" && state.currentOperand === "0") {
                return state
            }
            if (action.payload.digit === "." && state.currentOperand?.includes(".")) {
                return state
            }
            return {
                ...state,
                currentOperand: `${state.currentOperand || ""}${action.payload.digit}`
            }
        },
        CHOOSE_OPERATION: (state, action) => {
            if (state.currentOperand === null && state.previousOperand === null) {
                return state
            }
            if (state.previousOperand === null) {
                return {
                    ...state,
                    operation: action.payload.operation,
                    previousOperand: state.currentOperand,
                    currentOperand: null,
                }
            }
            if (state.currentOperand === null) {
                return {
                    ...state,
                    operation: action.payload.operation
                }
            }
            return {
                ...state,
                previousOperand: evaluate(state),
                operation: action.payload.operation,
                currentOperand: null
            }
        },
        CLEAR: () => initialState,  // Fixed: return initialState instead of empty object
        DELETE_DIGIT: (state) => {
            if (state.overwrite) {
                return {
                    ...state,
                    overwrite: false,
                    currentOperand: null
                }
            }
            if (state.currentOperand === null) {
                return state
            }
            if (state.currentOperand.length === 1) {
                return {
                    ...state,
                    currentOperand: null
                }
            }
            return {
                ...state,
                currentOperand: state.currentOperand.slice(0, -1)
            }
        },
        EVALUATE: (state) => {
            if (state.currentOperand === null || state.previousOperand === null || state.operation === null) {
                return state
            }
            return {
                ...state,
                overwrite: true,
                previousOperand: null,
                operation: null,
                currentOperand: evaluate(state)
            }
        }
    },
})

export const { CHOOSE_OPERATION, ADD_DEGIT, DELETE_DIGIT, EVALUATE, CLEAR } = CalculateSlice.actions
export default CalculateSlice.reducer
