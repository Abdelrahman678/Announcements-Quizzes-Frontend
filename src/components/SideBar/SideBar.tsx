import {
  FaHome,
  FaBullhorn,
  FaClipboardCheck,
  FaSignOutAlt,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useTranslation } from "react-i18next";

export default function SideBar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  const { t } = useTranslation();

  return (
    <div className="w-1/3 fixed top-0 left-0 bottom-0 rounded-r-xl md:w-1/4 bg-primary text-white">
      <h2 className="text-xl md:text-xl p-2 mb-5">{t("Coligo")}</h2>
      <hr />
      <nav className="mt-4">
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex items-center sm:p-2 lg:p-4 hover:bg-white hover:text-sky-400 cursor-pointer ${
                  isActive ? "bg-white text-sky-400" : ""
                }`
              }
            >
              <span className="text-sm ml-1 lg:text-xl">
                <FaHome />
              </span>
              <span className="ml-2 text-sm lg:text-xl">{t("dashboard")}</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/announcements"
              className={({ isActive }) =>
                `flex items-center sm:p-2 lg:p-4 hover:bg-white hover:text-sky-400 cursor-pointer ${
                  isActive ? "bg-white text-sky-400" : ""
                }`
              }
            >
              <span className="text-sm ml-1 lg:text-xl">
                <FaBullhorn />
              </span>
              <span className="ml-2 text-sm lg:text-xl">{t("announcements")}</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/quizzes"
              className={({ isActive }) =>
                `flex items-center sm:p-2 lg:p-4 hover:bg-white hover:text-sky-400 cursor-pointer ${
                  isActive ? "bg-white text-sky-400" : ""
                }`
              }
            >
              <span className="text-sm ml-1 lg:text-xl">
                <FaClipboardCheck />
              </span>
              <span className="ml-2 text-sm lg:text-xl">{t("quizzes")}</span>
            </NavLink>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="w-full flex items-center sm:p-2 lg:p-4 hover:bg-white hover:text-sky-400 cursor-pointer text-left"
            >
              <span className="text-sm ml-1 lg:text-xl">
                <FaSignOutAlt />
              </span>
              <span className="ml-2 text-sm lg:text-xl">{t("logout")}</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
