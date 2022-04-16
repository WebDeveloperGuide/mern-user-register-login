import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFound from './pages/NotFound';
import PrivateRouter from "./PrivateRouter";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Toast from "./components/Toast";
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <>
      <Toast/>
      <Router>
        <Switch>
          <PrivateRouter path="/" component={HomePage} exact/>
          <PrivateRouter path="/dashboard" component={HomePage}/>
          <Route path="/login" component={LoginPage}/>
          <Route path="/register" component={RegisterPage}/>
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>  
    </>
  );
}

export default App;
