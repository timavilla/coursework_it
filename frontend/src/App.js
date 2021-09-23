import { BrowserRouter } from "react-router-dom";
import Navbar from './components/Navbar';
import AppRouter from "./components/AppRouter";
import { UserProvider } from "./context/UserContext";
import { AdminProvider } from "./context/AdminContext";



const App = () => {
  
  
  return (
  <UserProvider>
    <AdminProvider>
      <BrowserRouter>
          <Navbar/>
          <AppRouter/>
      </BrowserRouter>
    </AdminProvider>
  </UserProvider>
  );
}



export default App;
