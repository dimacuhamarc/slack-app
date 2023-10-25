import { MainNav } from "../components/MainNav";
import { SubNav } from "../components/SubNav";

export const DashboardLayout = ({ children }) => {
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
      <div className="w-full h-screen bg-slate-950">
        {children}
      </div>
    </div>
  );
}