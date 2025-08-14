import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import LayOut from "./components/LayOut/LayOut";
import Dashboard from "./components/Dashboard/Dashboard";
import Announcement from "./components/Announcement/Announcement";
import Quiz from "./components/Quiz/Quiz";
import Home from "./components/Home/Home";
import { RequireAuth } from "./components/Hoc/requireAuth";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/",
      element: (
        <RequireAuth>
          <LayOut />
        </RequireAuth>
      ),
      children: [
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "announcements",
          element: <Announcement />,
        },
        {
          path: "quizzes",
          element: <Quiz />,
        },
      ],
    },
  ]);
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
