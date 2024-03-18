import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { AuthContextProvider } from "./contexts/AuthContext/provider";
import './global.css';

function App() {
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
}

export default App;
