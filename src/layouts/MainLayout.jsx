import { MainNav } from "../components/MainNav";
import { SubNav } from "../components/SubNav";

export const MainLayout = ({ children }) => {
  return (
    <div>
      {
        localStorage.getItem("user") ? (
        <>
          <MainNav />
          <SubNav />
        </>
        ) : null
      }
      {
        localStorage.getItem("user") ? (
          <>
            <div className="w-full pl-[22rem] p-6 h-screen bg-slate-950">
              {children}
            </div>
          </> 
          ) : (
          <>
            <div className="w-full h-screen bg-slate-950">
              {children}
            </div>
          </>
        )
      }
    </div>
  );
}