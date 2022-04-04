import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import BootstrapForm from "./components/BootstrapForm/BootstrapForm";
import {QueryClient, QueryClientProvider} from "react-query";
import SideBar from "./components/BootstrapSideNav/SideBar";


const queryClient = new QueryClient();

function App() {

  return (
      <QueryClientProvider client={queryClient}>
    <div className="App">
       <BootstrapForm/>
        <SideBar/>

    </div>
      </QueryClientProvider>
  );
}

export default App;
