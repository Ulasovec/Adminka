import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import BootstrapForm from "./components/BootstrapForm/BootstrapForm";
import {QueryClient, QueryClientProvider} from "react-query";
import SideBar from "./components/BootstrapSideNav/SideBar";
import {Routes,Route,Outlet} from "react-router-dom";
import UsersPage from "./pages/UsersPage";
import AdminPage from "./pages/AdminPage";
import SettingsPage from "./pages/SettingsPage";
import {UserContext} from "./context/UserContext";
import {useContext, useState} from "react";

const queryClient = new QueryClient();

function App() {
    // context value
const [isAuth, setIsAuth] = useState(false);
  return (
      <QueryClientProvider client={queryClient}>
          <UserContext.Provider value={{isAuth, setIsAuth}}>
          <Routes>
              <Route path="/" element={<Layout/>}>
                  <Route index element={<AdminPage/>} />
                  <Route path="/admins" element={<AdminPage/>} />
                  <Route path="/users" element={<UsersPage/>} />
                  <Route path="/settings" element={<SettingsPage/>} />
              </Route>
          </Routes>
          </UserContext.Provider>


      </QueryClientProvider>
  );
}



function Layout() {
    const {isAuth} = useContext(UserContext);
    return (
        (isAuth) ?
                <div>
                    <SideBar/>
                    <main>
                        <Outlet/>
                    </main>
                </div>
                :
                <div>
                    <BootstrapForm/>
                </div>

    )
}
export default App;
