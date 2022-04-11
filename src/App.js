import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import BootstrapForm from "./components/BootstrapForm/BootstrapForm";
import {QueryClient, QueryClientProvider} from "react-query";
import SideBar from "./components/BootstrapSideNav/SideBar";
import {Routes,Route,Outlet} from "react-router-dom";
import UsersPage from "./pages/UsersPage";
import AdminPage from "./pages/AdminPage";
import SettingsPage from "./pages/SettingsPage";
import {UserContext} from "./store/context/UserContext";
import {useContext, useState} from "react";
import useIsAuthReducer from "./store/reducers/AuthReducer";
import useUserNameReducer from "./store/reducers/UserNameReducer";
import CreateRolePage from "./pages/CreateRolePage";


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
      <QueryClientProvider client={queryClient}>
          <UserContext.Provider value={{isAuth,setIsAuth,deleteUsersId,setDeleteUsersId}}>
          <Routes>
              <Route path="/" element={<Layout/>}>
                  <Route index element={<AdminPage/>}/>
                  <Route path="/users" element={<UsersPage/>} />
                  <Route path="/settings" element={<SettingsPage/>}/>
                  <Route path="/role" element={<CreateRolePage/>}/>
                  {/*<Route path="/logout" element={<AdminPage/>}/>*/}
              </Route>
          </Routes>
          </UserContext.Provider>


      </QueryClientProvider>
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
                    <BootstrapForm/>
                </div>

    )
}
export default App;
