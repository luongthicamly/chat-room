import { connect } from 'react-redux';
import { useNavigate } from 'react-router';
import React, {useEffect} from 'react';
import avatar from '../images/inu.jpg';

function GroupChat(props) {
    const users = props.users; 
    // const navigate = useNavigate();
    // useEffect(()=>{
    //     console.log(users)
    //     if(users.length === 0){
    //       navigate('/login', { replace: true });
    //     }
    //   }, [users])
    return (
        <div className='box-group-chat'>
            <div className='group-chat d-flex'>
               <div className='group-avatar'>
                <img src={avatar} alt='avatar'/>
               </div>
                <div className='content-group'>
                    <p className='name'>Name</p>
                    <p className='content-chat'>
                        hello
                    </p>
                </div>
            </div>
        </div>
    );
}
const mapState = (state) =>{
    return{
        users: state.users
    }
}
export default connect(mapState)(GroupChat);