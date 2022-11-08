import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./CssFiles/login.css"
import './CssFiles/profile.css'

import Login from "./Pages/Login";
import Admin from "./Pages/Admin";
import User from "./Pages/User";
import Tech from "./Pages/Tech";

import SinglePage from "./Components/SinglePage/SinglePage";


import CreateAccount from "./Components/Admin/CreateAccount";
import ManageAccounts from "./Components/Admin/ManageAccounts";
import TicketHistory from "./Components/Admin/TicketHistory";
import SharedLayout from "./Pages/SharedLayout";

import { useState } from "react";


function App() {

  // const storedValue = localStorage.getItem('auth')

  const [auth, setAuth] = useState(true)

  // const test = () => {
  //   setAuth(true)
  //   localStorage.setItem('auth', auth)
  // }
  // const test1 = () => {
  //   setAuth(false)
  //   localStorage.setItem('auth', auth)
  // }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={!auth ? <Login /> : <Navigate to='/admin' />} />
          <Route exact path="/admin" element={auth ? <Admin /> : <Navigate to='/' />} />
          <Route exact path="/user" element={<User />} />
          <Route exact path="/tech" element={<Tech />} />

          <Route exact path="/singlePage" element={<SinglePage />} />

          
          <Route path="/admin" element={<SharedLayout />}>
          <Route path= "/admin/CreateAccount" element={<CreateAccount />}/>
          <Route path= "/admin/ManageAccounts" element={<ManageAccounts/>}/>
          <Route path= "/admin/TicketHistory" element={<TicketHistory />}/>
          </Route>

        </Routes>
      </div>
    </Router>


  );


}

export default App;
