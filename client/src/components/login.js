import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';
import loginAPI from '../api/loginAPI';
function Login(props) {
    const [values, setValues] = useState({});
    const navigate = useNavigate();

    // if(token){
    //     navigate('/chat', { replace: true });
    // }
    const handleOnChange = (e) => {
        const target = e.target;
        setValues( values => ({...values, [target.name]:target.value}));
    }
    
    const handleLogin = async (e) =>{
        
        e.preventDefault();
        navigate('/group-chat', { replace: true })
        loginAPI.postLogin(values)
        .then(response => {
            if(response.status === 400){
                console.log('lỗi');
            } else{
                 console.log(response.data);
                window.sessionStorage.setItem("token", response.data.accessToken);
                
            }
        });
    }
    return (
        <div className='form'>
        <h3 className='title-form text-center'>Login</h3>
        <form onSubmit={handleLogin}>
            <div className="form-group">
                <label>Email address</label>
                <input 
                    type="email" 
                    className="form-control" 
                    name='email' 
                    placeholder="Enter email" 
                    onChange={handleOnChange} 
                    value={values.email || ''}/>
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input 
                    type="password" 
                    className="form-control" 
                    name='password' 
                    placeholder="Password" 
                    onChange={handleOnChange}
                    value={values.password || ''}/>
            </div>
            <button type="submit" className="btn btn-submit mt-2" onClick={handleLogin}>Submit</button>
        </form>
    </div>
    );
}
const mapState = (state) =>{
    return{
        users: state.users
    }
}
export default connect(mapState)(Login);