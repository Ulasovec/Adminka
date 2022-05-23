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
import GenericPage from "./pages/GenericPage";
import ModelsPage from "./pages/ModelsPage";
import ModelPage from "./pages/ModelPage";


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
                            <Route path="/users-roles" element={<h1>Users-Roles</h1>}/>
                            <Route path="/tables" element={<h1>Table List</h1>}/>

                            <Route path="/content/collections" element={<ModelsPage title="Collections"/>}>
                                <Route path=":modelName" element={<ModelPage title="Collection"/>}/>
                                <Route path=":modelName/:id" element={<h1>Content - CollectionName - id</h1>}/>
                                <Route index element={<div>Choose any collection, please.</div>}/>
                            </Route>
                            <Route path="/content/singles" element={<ModelsPage title="Singles"/>}>
                                <Route path=":modelName" element={<ModelPage title="Single"/>}/>
                                <Route path=":modelName/:id" element={<h1>Content - SingleName - id</h1>}/>
                                <Route index element={<div>Choose any single, please.</div>}/>
                            </Route>

                            <Route path="/models" element={<ModelsPage/>}>
                                <Route path=":modelName" element={<ModelPage/>}/>
                                <Route index element={<div>Choose any model, please.</div>}/>
                            </Route>
                            <Route path="/directories" element={<h1>Data Tree</h1>}/>
                            <Route path="/logic" element={<h1>Calculator List</h1>}/>
                            <Route path="/about" element={<GenericPage/>}/>
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
                {/*<GenericPage/>*/}
            </div>
    )
}

export default App;
