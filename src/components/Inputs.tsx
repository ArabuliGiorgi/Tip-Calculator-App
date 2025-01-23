import { useEffect, useState } from 'react';
import Money from '/images/icon-dollar.svg'
import Man from '/images/icon-person.svg'
import { useMyContext } from '../reducer&context';

export default function Inputs() {
  const [tip, setTip] = useState("");
  const { state, dispatch } = useMyContext();
  useEffect(() => {
    dispatch({ type: "calculate", payload: "" });
    if(state.tip === "" && tip !== "C"){
      setTip("");
    }
  }, [state.bill, state.tip, state.people, dispatch, tip]);

  function handleTip(str: string){
    if(tip !== "C" && str === "C"){
      dispatch({ type: "setTip", payload: "" });
    }
    if(str !== "C"){
      dispatch({ type: "setTip", payload: str });
    }
    setTip(str);
  }
  function handleInputs(e: React.ChangeEvent<HTMLInputElement>){
    if(e.target.name === "bill") {
      if(Number(e.target.value) < 0){
        dispatch({ type: "setBillError", payload: "Can't be negative" });
      }else{
        dispatch({ type: "setBillError", payload: "" });
      }
      dispatch({ type: "setBill", payload: e.target.value });
    }
    if(e.target.name === "people") {
      dispatch({ type: "setPeople", payload: e.target.value });
      if(e.target.value === "") {
        dispatch({ type: "setPeopleError", payload: "" });
        return;
      }
      if(Number(e.target.value) <= 0){
        if (Number(e.target.value) === 0) {
          dispatch({ type: "setPeopleError", payload: "Can't be zero" });
        } else {
          dispatch({ type: "setPeopleError", payload: "Can't be negative" });
        }
      }else{
        dispatch({ type: "setPeopleError", payload: "" });
      }
    }
    if(e.target.name === "tip" && tip === "C") {
      if(Number(e.target.value) < 0 || Number(e.target.value) > 100){
        return;
      }
      dispatch({ type: "setTip", payload: e.target.value })
    }
  }

  return (
    <div className="w-[100%] max-w-[400px] p-[8px] desktop:p-[16px] flex flex-col gap-[32px] desktop:gap-[40px]">
      <div className="w-[100%]">
        <div className="w-[100%] flex items-center justify-between mb-[6px]">
          <h1 className="text-[16px] font-bold leading-[23.7px] text-[#5E7A7D]">Bill</h1>
          <h1 className={`${state.billError ? 'block' : 'hidden'} text-[16px] font-bold leading-[23.7px] 
            text-[#E17457]`}>{state.billError}</h1>
        </div>
        <div className="w-[100%] relative">
          <input type="number" name="bill" className={`w-[100%] h-[48px] bg-[#F3F9FA] rounded-[5px] text-right
            pr-[17px] font-bold text-[24px] leading-[35.54px] text-[#00474B] placeholder:opacity-35 
            desktop:hover:cursor-pointer ${state.billError ? 'border-solid border-[2px] border-[#E17052]' : ''} 
            focus:outline-none focus:border-solid focus:border-[#26C2AE] focus:border-[2px]`} placeholder='0' 
            value={state.bill} onChange={handleInputs}/>
          <img src={Money} alt="money" className="absolute top-[16px] left-[17px]"/>
        </div>
      </div>
      <div className="w-[100%]">
        <div className="w-[100%] flex items-center justify-between">
          <h1 className="text-[16px] font-bold leading-[23.7px] text-[#5E7A7D] mb-[6px]">Select Tip %</h1>
        </div>
        <div>
          <div className="w-[100%] grid grid-cols-2 desktop:grid-cols-3 gap-[16px]">
            <button className={`w-[100%] h-[48px] rounded-[5px] text-[24px] font-bold leading-[35.54px] 
              ${tip === "5" ? 'bg-[#26C2AE] text-[#00474B]' : 'bg-[#00474B] text-[#FFFFFF] desktop:hover:bg-[#9FE8DF] desktop:hover:text-[#00474B]'}`} 
              onClick={() => handleTip("5")}>5%</button>
            <button className={`w-[100%] h-[48px] rounded-[5px] text-[24px] font-bold leading-[35.54px] 
              ${tip === "10" ? 'bg-[#26C2AE] text-[#00474B]' : 'bg-[#00474B] text-[#FFFFFF] desktop:hover:bg-[#9FE8DF] desktop:hover:text-[#00474B]'}`} 
              onClick={() => handleTip("10")}>10%</button>
            <button className={`w-[100%] h-[48px] rounded-[5px] text-[24px] font-bold leading-[35.54px] 
              ${tip === "15" ? 'bg-[#26C2AE] text-[#00474B]' : 'bg-[#00474B] text-[#FFFFFF] desktop:hover:bg-[#9FE8DF] desktop:hover:text-[#00474B]'}`} 
              onClick={() => handleTip("15")}>15%</button>
            <button className={`w-[100%] h-[48px] rounded-[5px] text-[24px] font-bold leading-[35.54px] 
              ${tip === "25" ? 'bg-[#26C2AE] text-[#00474B]' : 'bg-[#00474B] text-[#FFFFFF] desktop:hover:bg-[#9FE8DF] desktop:hover:text-[#00474B]'}`} 
              onClick={() => handleTip("25")}>25%</button>
            <button className={`w-[100%] h-[48px] rounded-[5px] text-[24px] font-bold leading-[35.54px] 
              ${tip === "50" ? 'bg-[#26C2AE] text-[#00474B]' : 'bg-[#00474B] text-[#FFFFFF] desktop:hover:bg-[#9FE8DF] desktop:hover:text-[#00474B]'}`} 
              onClick={() => handleTip("50")}>50%</button>
            <input type="number" className="w-[100%] h-[48px] bg-[#F3F9FA] rounded-[5px] text-right pr-[15px] font-bold text-[24px] leading-[35.54px] 
              text-[#00474B] placeholder:text-[24px] placeholder:font-bold placeholder:leading-[35.54px] placeholder:text-[#547878] desktop:hover:cursor-pointer 
              focus:outline-none focus:border-solid focus:border-[#26C2AE] focus:border-[2px]" placeholder='Custom' onClick={() => handleTip("C")}
              name='tip' value={tip === "C" ? state.tip : ''} onChange={handleInputs}/>
          </div>
        </div>
      </div>
      <div className="w-[100%]">
        <div className="w-[100%] flex items-center justify-between mb-[6px]">
          <h1 className="text-[16px] font-bold leading-[23.7px] text-[#5E7A7D]">Number of People</h1>
          <h1 className={`${state.peopleError ? 'block' : 'hidden'} text-[16px] font-bold leading-[23.7px] 
            text-[#E17457] tracking-[-0.7px] desktop:tracking-0`}>{state.peopleError}</h1>
        </div>
        <div className="w-[100%] relative">
          <input type="number" name="people" className={`w-[100%] h-[48px] bg-[#F3F9FA] rounded-[5px] text-right pr-[17px] font-bold text-[24px] 
            leading-[35.54px] text-[#00474B] placeholder:opacity-35 desktop:hover:cursor-pointer 
            ${state.peopleError ? 'border-solid border-[2px] border-[#E17052]' : ''} focus:outline-none 
            focus:border-solid focus:border-[#26C2AE] focus:border-[2px]`} placeholder='0' 
            value={state.people} onChange={handleInputs}/>
          <img src={Man} alt="person" className='absolute top-[16px] left-[17px]'/>
        </div>
      </div>
    </div>
  )
}