import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import LoginForm from "./components/BootstrapForm/LoginForm";
import {QueryClient, QueryClientProvider} from "react-query";
import SideBar from "./components/BootstrapSideNav/SideBar";
import {Routes, Route, Outlet} from "react-router-dom";
import UsersPage from "./pages/UsersPage";
import AdminPage from "./pages/AdminPage";
import SettingsPage from "./pages/SettingsPage";
import {UserContext} from "./store/context/UserContext";
import {useContext, useState} from "react";
import useIsAuthReducer from "./store/reducers/AuthReducer";
import RolesPage from "./pages/RolesPage";
import UsersRolesPage from "./pages/UsersRolesPage";
import ApplicationsPage from "./pages/ApplicationsPage";
import {Container} from "react-bootstrap";
import {Toaster} from "react-hot-toast";
import AboutPage from "./pages/AboutPage";


const queryClient = new QueryClient();

function App() {
    // context value
// // const [sid, setSid] = useState(undefined);
// // const [roleId, setRoleId] = useState(undefined);
// console.log(roleId);
//      const [isAuth,setIsAuth] = useReducer((isAuth, action) => ({...isAuth, ...action}),
//         {sid: '', role_id: ''})
    const {isAuth, setIsAuth} = useIsAuthReducer();
    const [deleteUsersId, setDeleteUsersId] = useState([])


    return (
        <div className='App'>
            <QueryClientProvider client={queryClient}>
                <UserContext.Provider value={{isAuth, setIsAuth, deleteUsersId, setDeleteUsersId}}>
                    <Routes>
                        <Route path="/" element={<Layout/>}>
                            <Route index element={<AdminPage/>}/>
                            <Route path="/admin" element={<AdminPage/>}/>
                            <Route path="/users" element={<UsersPage/>}/>
                            <Route path="/settings" element={<SettingsPage/>}/>
                            <Route path="/roles" element={<RolesPage/>}/>
                            <Route path="/users/:id" element={<UsersRolesPage/>}/>
                            <Route path="/applications" element={<ApplicationsPage/>}/>
                            <Route path="/users-roles" element={<Container>Users-Roles</Container>}/>
                            <Route path="/tables" element={<Container>Table List</Container>}/>
                            <Route path="/models" element={<Container>Model List</Container>}/>
                            <Route path="/directories" element={<Container>Data Tree</Container>}/>
                            <Route path="/logic" element={<Container>Calculator List</Container>}/>
                            <Route path="/about" element={<AboutPage/>}/>
                        </Route>
                    </Routes>
                </UserContext.Provider>


            </QueryClientProvider>
        </div>
    );
}


function Layout() {
    const {isAuth} = useContext(UserContext);
    const [expanded, setExpanded] = useState(false);
    return (
        (isAuth.sid) ?
            <div>
                <SideBar expanded={expanded} setExpanded={setExpanded}/>
                <main style={{marginLeft: (expanded) ? 240 : 64, padding: '15px 20px 0 20px'}}>
                    <Container>
                        <Outlet/>
                    </Container>
                    <Toaster/>
                </main>
            </div>
            :
            <div>
                <LoginForm/>
                {/*<AboutPage/>*/}
            </div>
    )
}

export default App;
