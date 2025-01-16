import { useEffect, useState } from "react";
import { useMyContext } from "../reducer&context";

export default function Outputs() {
  const [reset, setReset] = useState(false);
  const { state, dispatch } = useMyContext();
  useEffect(() => {
    if(state.bill || state.tip || state.people) setReset(true);
    else setReset(false);
  }, [state])

  return (
    <div className="w-[100%] max-w-[413px] h-[257px] desktop:h-[417px] rounded-[15px] bg-[#00474B] 
      p-[24px] pt-[37px] desktop:p-[40px] flex flex-col items-center justify-between">
      <div className="w-[100%] flex flex-col items-center gap-[20px] desktop:gap-[25px]">
        <div className="w-[100%] flex align-center justify-between">
          <div className="flex flex-col align-start justify-center">
            <h1 className="text-[16px] leading-[23.7px] font-bold text-white">Tip Amount</h1>
            <p className="text-[13px] leading-[19.25px] font-bold text-[#7F9D9F]">/ person</p>
          </div>
          <h1 className="text-[32px] font-bold leading-[47.39px] tracking-[-0.67px] text-[#26C2AE]
            desktop:text-[48px] desktop:leading-[71.09px] desktop:tracking-[-1px]">${state.tipAmount.toFixed(2)}</h1>
        </div>
        <div className="w-[100%] flex align-center justify-between">
          <div className="flex flex-col align-start justify-center">
            <h1 className="text-[16px] leading-[23.7px] font-bold text-white">Total</h1>
            <p className="text-[13px] leading-[19.25px] font-bold text-[#7F9D9F]">/ person</p>
          </div>
          <h1 className="text-[32px] font-bold leading-[47.39px] tracking-[-0.67px] text-[#26C2AE]
            desktop:text-[48px] desktop:leading-[71.09px] desktop:tracking-[-1px]">${state.total.toFixed(2)}</h1>
        </div>
      </div>
      <button className={`h-[48px] w-[100%] rounded-[5px] ${reset ? 'bg-[#26C2AE]' : 'bg-[#0D686D]'}
        ${reset ? 'desktop:hover:bg-[#9FE8DF] cursor-pointer' : 'desktop:hover:bg-[#0D686D] cursor-default'}`}
        onClick={() => reset && dispatch({ type: "reset", payload: "" })}>
          <h1 className="text-[20px] font-bold leading-[29.62px] text-[#00474B]">RESET</h1>
      </button>
    </div>
  )
}
