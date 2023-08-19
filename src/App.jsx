import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import { EditContextProvider } from "./context/EditContext";
import { DeleteContextProvider } from "./context/DeleteContext";
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { useAuthContext } from "./hooks/useAuthContext";


function App() {
  const baseURL = "https://workouts-mern-backend.onrender.com";

  //const baseURL = "http://localhost:4000";
  const {user} = useAuthContext();
  const appName = '/WorkOuts_MERN';

  return (
    <>
    
      <EditContextProvider>
        <DeleteContextProvider>
          <div className="App">
            <BrowserRouter>
              <NavBar appName={appName} />
              <div className="pages">
                <Routes>
                  <Route
                    path={`${appName}/`}
                    element={user ? <Home baseURL={baseURL} /> : <Navigate to={`${appName}/login`} />}
                  />
                  <Route
                    path={`${appName}/login`}
                    element={!user ? <Login baseURL={baseURL} /> : <Navigate to={`${appName}/`} /> }
                  />
                  <Route
                    path={`${appName}/signup`}
                    element={!user ? <SignUp baseURL={baseURL} /> : <Navigate to={`${appName}/`} />}
                  />    
                </Routes>
              </div>
            </BrowserRouter>
          </div>
        </DeleteContextProvider>
      </EditContextProvider>
    </>
  );
}

export default App;