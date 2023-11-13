import { MainNav } from "../components/MainNav";
import { SubNav } from "../components/SubNav";

export const MainLayout = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      {user ? (
        <>
          <MainNav />
          <SubNav />
        </>
        ) : null
      }
      {
        user ? (
          <>
            <div className="w-full pl-[22rem] p-6 pb-[5rem] h-screen bg-slate-950">
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