import { BrowserRouter } from "react-router-dom";
import Navbar from './components/Navbar';
import AppRouter from "./components/AppRouter";
import { UserProvider } from "./context/UserContext";



const App = () => {
  
  
  return (
  <UserProvider>
    <BrowserRouter>
        <Navbar/>
        <AppRouter/>
        
    </BrowserRouter>
  </UserProvider>
  );
}



export default App;
