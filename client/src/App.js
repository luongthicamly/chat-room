import './App.css';
import React, { useEffect } from 'react';
import {connect, useDispatch} from 'react-redux';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import jwt_decode  from 'jwt-decode';
import Tab_regis_login from './components/Tab_regis_login';
import Chat from './components/chat';
import { insertUser } from './action/userAction';
import GroupChat from './components/GroupChat';
function App(props) {
  const dispatch = useDispatch();
  
  useEffect(()=>{
    const token = window.sessionStorage.getItem("token");
    console.log(token)
    if(token){
      const decodedUser = jwt_decode(token);
      // console.log(decodedUser.data)
      const action = insertUser(decodedUser.data);
      dispatch(action);
    }
  },[])
  return (
    <>
   
    <Router >
      <Routes>
        <Route path='/login' element={<Tab_regis_login/>}></Route>
        <Route path='/group-chat' element={<GroupChat/>}></Route>
        <Route path='/chat' element={<Chat/>}></Route>
      </Routes>
    </Router>
    </>
  );
}
const mapState = (state) => {
  return{
    users: state.users,
    mess: state.mess
  }
}
export default connect(mapState)(App);
