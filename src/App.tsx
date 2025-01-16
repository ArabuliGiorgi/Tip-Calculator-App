import Logo from "/images/logo.svg"
import Inputs from "./components/Inputs"
import Outputs from "./components/Outputs"
import MyContextProvider from "./reducer&context"

function App() {
  return (
    <main className="w-[100%] min-h-screen flex flex-col items-center justify-between desktop:justify-center desktop:pb-[50px]">
      <img src={Logo} alt="logo" className="mt-[50px] mb-[40px] desktop:mb-[87px]"/>
      <div className="w-[100%] max-w-[920px] p-[24px] pb-[32px] desktop:p-[32px] bg-[#FFFFFF] shadow-[0px 32px 43px 0px #4FA6AF33] rounded-t-[25px] 
        desktop:rounded-[25px] desktop:pl-[48px] flex flex-col items-center gap-[24px] desktop:flex-row desktop:justify-between 
        desktop:gap-0">
          <MyContextProvider>
            <Inputs />
            <Outputs />
          </MyContextProvider>
      </div>
    </main>
  )
}

export default App