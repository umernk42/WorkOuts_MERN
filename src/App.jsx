import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import { EditContextProvider } from "./context/EditContext";
import { DeleteContextProvider } from "./context/DeleteContext";

function App() {
  const baseURL = "https://workouts-mern-backend.onrender.com";

  //const baseURL = "http://localhost:4000";


  return (
    <>
      <EditContextProvider>
        <DeleteContextProvider>
          <div className="App">
            <BrowserRouter>
              <NavBar />
              <div className="pages">
                <Routes>
                  <Route
                    path="/WorkOuts_MERN/"
                    element={<Home baseURL={baseURL} />}
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
