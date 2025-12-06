import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import Main from "./layouts/Main";
import PrivateRoute from "./layouts/PrivateRoute";
import PublicRoute from "./layouts/PublicRoute";
import Layout from "./layouts/Layout";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Routes>
      <Route element = {<Layout/>}>
        <Route element={<Main/>}>
        <Route element={<PrivateRoute/>}>
          <Route path="/" element={<Dashboard/>}/>
        </Route>
      </Route>
        <Route element = {<PublicRoute/>}>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
