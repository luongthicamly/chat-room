import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { insertUser } from '../action/userAction';
//  import axios from "axios";
import userAPI from '../api/userAPI';
function  Registration(props) {
    const [values, setValue] = useState({});
    const dispatch = useDispatch();
    // console.log(props.users);

    const handleChange = (e) => {
        const target = e.target;
        setValue(values => ({...values, [target.name]: target.value}))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        userAPI.postUser(values)
        .then(response =>{
            // props.setToken(response.data);
            // console.log(response)
            const time_id = new Date();
            const userNew = response.data;
            userNew._id= time_id.getTime();
            dispatch(insertUser(userNew));
        });
    }
    return (
        <div className='form'>
            <h3 className='title-form text-center'>Registration</h3>
            <form>
                <div className='row'>
                    <div className='col-lg-6'>
                        <div className="form-group">
                        <label>Name</label>
                        <input type="text" className="form-control" 
                        name='name'
                        placeholder="Enter Name" 
                        onChange={handleChange} 
                        value={values.name || '' }/>
                        {/* <small className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                        </div>
                        <div className="form-group">
                            <label>Email address</label>
                            <input type="email" className="form-control" 
                            name='email'
                            placeholder="Enter email" 
                            onChange={handleChange}
                            value={values.email || ''}/>
                            {/* <small className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                        </div>
                        <div className='form-group col-lg-12'>
                            <div className='row'>
                                <div className="form-check col-lg-6">
                                    <input className="form-check-input" type="radio" 
                                        name="gender" id="male" 
                                        value="Nam"
                                        onChange={handleChange}
                                    />
                                    <label className="form-check-label" htmlFor="male">
                                        Nam
                                    </label>
                                </div>
                                <div className="form-check col-lg-6">
                                    <input className="form-check-input" 
                                        type="radio" name="gender" 
                                        id="female" value="Nữ"
                                        onChange={handleChange}
                                    />
                                    <label className="form-check-label" htmlFor="female">
                                        Nữ
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-6'>
                        <div className="form-group">
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control"
                                 name= 'password'
                                 placeholder="Password" 
                                 onChange={handleChange}
                                 value={values.password || ''}
                                 />
                                <small className="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div className="form-group">
                                <label>Birthday</label>
                                <input type="text" className="form-control" 
                                name='birthday'
                                placeholder="Enter birthday" 
                                onChange={handleChange}
                                value={values.birthday || ''}/>
                                <small className="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <button type="button" className="btn btn-submit mt-2"
                            onClick={handleSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
const mapState = (state) => {
    return{
        users: state.users
    }
}
export default connect(mapState)(Registration);