import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Simple translations
const resources = {
  en: {
    translation: {
      dashboard: "Dashboard",
      announcements: "Announcements",
      quizzes: "Quizzes",
      logout: "Logout",
      welcome: "Welcome to Coligo",
      login: "Login",
      recentAnnouncements: "Recent Announcements",
      recentQuizzes: "Recent Quizzes",
      viewAll: "View All",
      noRecentAnnouncements: "No recent announcements",
      noRecentQuizzes: "No recent quizzes",
      questions: "questions",
    },
  },
  ar: {
    translation: {
      dashboard: "لوحة القيادة",
      Dashboard: "لوحة القيادة",
      "Recent Announcements": "آخر الإعلانات",
      "Recent Quizzes": "آخر الاختبارات",
      "View All": "عرض الكل",
      announcements: "الإعلانات",
      Announcements: "الإعلانات",
      "No announcements available.": "لا توجد إعلانات",
      quizzes: "الاختبارات",
      Quizzes: "الاختبارات",
      "No quizzes available.": "لا توجد اختبارات",
      Options: "خيارات",
      logout: "تسجيل خروج",
      "welcome to coligo": "مرحباً بكم في كوليجو",
      login: "تسجيل الدخول",
      recentAnnouncements: "آخر الإعلانات",
      recentQuizzes: "آخر الاختبارات",
      viewAll: "عرض الكل",
      noRecentAnnouncements: "لا توجد إعلانات حديثة",
      noRecentQuizzes: "لا توجد اختبارات حديثة",
      questions: "أسئلة",
      "Please log in to access the dashboard":
        "من فضلك قم بتسجيل الدخول للاستفادة من لوحة القيادة",
      "You are already logged in!": "أنت مسجل بالفعل",
      Coligo: "كوليجو",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
