import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";

export default function Home() {
  const { isAuthenticated, login, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate("/dashboard");
  };

  const handleLogout = () => {
    logout();
  };
  const { t } = useTranslation();

  return (
    <>
      <LanguageSwitcher />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="p-8 bg-white rounded-lg shadow-md text-center">
          <h1 className="text-3xl font-bold mb-6">{t("welcome to coligo")}</h1>
          {isAuthenticated ? (
            <div>
              <p className="mb-4">{t("You are already logged in!")}</p>
              <button
                onClick={handleLogout}
                className="px-6 py-2 bg-red-500 text-white rounded-md cursor-pointer hover:bg-red-600 transition-colors"
              >
                {t("logout")}
              </button>
            </div>
          ) : (
            <div>
              <p className="mb-4">
                {t("Please log in to access the dashboard")}
              </p>
              <button
                onClick={handleLogin}
                className="px-6 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 transition-colors"
              >
                {t("login")}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
