import { useReducer, createContext, useContext } from "react";

const initialState: TState = {
    bill: "",
    tip: "",
    people: "",
    billError: "",
    peopleError: "",
    tipAmount: 0,
    total: 0
}

type TState = {
    bill: string;
    tip: string;
    people: string;
    billError: string;
    peopleError: string;
    tipAmount: number;
    total: number;
}

export function reducer(state: TState, action: { type: string, payload: string}): TState {
    function calculate(){
        if(state.billError || state.peopleError) return { ...state, tipAmount: 0, total: 0 }
        if(state.bill === "" || state.people === "") return { ...state, tipAmount: 0, total: 0 }
        const tipAmount = (Number(state.bill) * Number(state.tip)) / 100 / Number(state.people)
        const total = (Number(state.bill) / Number(state.people)) + tipAmount
        return { ...state, tipAmount: tipAmount, total: total }
    }

    switch (action.type) {
        case "setBill":
            return { ...state, bill: action.payload }
        case "setTip":
            return { ...state, tip: action.payload}
        case "setPeople":
            return { ...state, people: action.payload}
        case "setBillError":
            return { ...state, billError: action.payload as string }
        case "setPeopleError":
            return { ...state, peopleError: action.payload as string }
        case "calculate":
            return calculate();
        case "reset": 
            return initialState;
        default:
            return state
    }
}

const myContext = createContext<{ 
    state: TState, 
    dispatch: React.Dispatch<{ type: string, payload: string }> 
}>({ 
    state: initialState, 
    dispatch: () => {} 
});

export default function MyContextProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    
    return (
        <myContext.Provider value={{ state, dispatch }}>
            {children}
        </myContext.Provider>
    )
}

export function useMyContext() {
    const context = useContext(myContext);
    if(!context) 
        throw new Error("useMyContext must be used within a MyContextProvider");
    return context;
}