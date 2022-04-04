import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import BootstrapForm from "./components/BootstrapForm/BootstrapForm";
import {QueryClient, QueryClientProvider} from "react-query";
const queryClient = new QueryClient();

function App() {

  return (
      <QueryClientProvider client={queryClient}>
    <div className="App">
<BootstrapForm/>
    </div>
      </QueryClientProvider>
  );
}

export default App;
