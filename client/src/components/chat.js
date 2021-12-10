import '../App.css';
import socketIO from 'socket.io-client';
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';

const host = 'http://localhost:3333/';
function Chat(props) {
  const navigate = useNavigate();
  const [mess, setMess] = useState([]);
  const [message, setMessage] = useState('');
  const [id, setID] = useState('');
  const socketRef = useRef();
  const users = props.users;
  // useEffect(()=>{
  //   if(users.length === 0){
  //     navigate('/login', { replace: true });
  //   }
  //   if(users.length > 0){
  //     users.map(u => {
  //       setID(u._id)
        
  //     })
  //   }
  // }, [users])
  useEffect(()=>{
    socketRef.current = socketIO.connect(host);
    // socketRef.current.on('getId', data => {
    //   setId(data);
    //   console.log(data)
    // })
    socketRef.current.on('sendDataServer', dataGot => {
      setMess(oldMsgs => [... oldMsgs, dataGot.data]);
    })
    return() => {
      socketRef.current.disconnect();
    }
  },[]);
  useEffect( ()=>{
      axios.get(`http://localhost:3333/chat`)
      .then(res => setMess(res.data));
  },[]);
  function formatDate(string){
    var options = {year:'numeric', month:'long', day:'numeric', hour:'2-digit', minute:'2-digit'};
    return new Date(string).toLocaleDateString([],options);
}
  const handleSendMessage = (e) => {
    e.preventDefault()

    if(message !== null){
      const time = new Date();
      time.getTime();
      const msg = {
        body: message,
        idUser: id,
        time: time,
        id_group: 1
      }
      socketRef.current.emit('sendDataClient', msg);
      setMessage('')
    }
    console.log(formatDate('2021-11-29T09:34:27.857Z'))
  }
  const renderMess = mess.map((m,index) =>
    <div
      key={index} 
      className={`${m.idUser === id ? `your-message ${m.idUser}` : `other-people ${id}`} chat-item`}
    >
      <div>
        <p>{formatDate(m.time)}</p>
        <div className="content_message">
          {m.body}
        </div>
      </div>
    </div>
  )
  const handleChange = (e) => {
    setMessage(e.target.value);
  }
  return (
    <div className="box-chat">
      <div className="box-chat_message">
        {renderMess}
      </div>
      <form onSubmit={handleSendMessage}>
      <div className="send-box">
        <input
          value={message}
          onChange={handleChange}
          placeholder="Nhập tin nhắn ... " 
        />
        <button onClick={handleSendMessage}>
          send
        </button>
      </div>
      </form>
    </div>
  );
}
const mapState = (state) =>{
  return{
    users: state.users
  }
}
export default connect(mapState)(Chat);
