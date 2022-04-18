import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import LoginForm from "./components/BootstrapForm/LoginForm";
import {QueryClient, QueryClientProvider} from "react-query";
import SideBar from "./components/BootstrapSideNav/SideBar";
import {Routes,Route,Outlet} from "react-router-dom";
import UsersPage from "./pages/UsersPage";
import AdminPage from "./pages/AdminPage";
import SettingsPage from "./pages/SettingsPage";
import {UserContext} from "./store/context/UserContext";
import {useContext, useState} from "react";
import useIsAuthReducer from "./store/reducers/AuthReducer";
import CreateRolePage from "./pages/CreateRolePage";
import CreateUsersRolePade from "./pages/CreateUsersRolePade";
import ApplicationsPage from "./pages/ApplicationsPage";


const queryClient = new QueryClient();

function App() {
    // context value
// // const [sid, setSid] = useState(undefined);
// // const [roleId, setRoleId] = useState(undefined);
// console.log(roleId);
//      const [isAuth,setIsAuth] = useReducer((isAuth, action) => ({...isAuth, ...action}),
//         {sid: '', role_id: ''})
    const {isAuth,setIsAuth} = useIsAuthReducer();
    const [deleteUsersId, setDeleteUsersId] = useState([])

  return (
      <div className='App'>
      <QueryClientProvider client={queryClient}>
          <UserContext.Provider value={{isAuth,setIsAuth,deleteUsersId,setDeleteUsersId}}>
          <Routes>
              <Route path="/" element={<Layout/>}>
                  <Route index element={<AdminPage/>}/>
                  <Route path="/users" element={<UsersPage/>} />
                  <Route path="/settings" element={<SettingsPage/>}/>
                  <Route path="/role" element={<CreateRolePage/>}/>
                  <Route path="/users/:id" element={<CreateUsersRolePade/>}/>
                  <Route path="/applications" element={<ApplicationsPage/>}/>
              </Route>
          </Routes>
          </UserContext.Provider>


      </QueryClientProvider>
      </div>
  );
}



function Layout() {
    const {isAuth} = useContext(UserContext);
    return (
        (isAuth.sid) ?
                <div>
                    <SideBar/>
                    <main>
                        <Outlet/>
                    </main>
                </div>
                :
                <div>
                    <LoginForm/>
                </div>

    )
}
export default App;
