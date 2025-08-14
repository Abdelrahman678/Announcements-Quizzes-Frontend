import { Outlet } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";

export default function LayOut() {
  return (
    <>
      <div className="flex">
        {/* sidebar */}
        <SideBar />

        {/* dashboard with language switcher */}
        <div className="w-2/3 px-2 min-h-screen absolute right-0 md:w-3/4 bg-gray-200 rounded-xl">
          <LanguageSwitcher />
          <Outlet />
        </div>
      </div>
    </>
  );
}
