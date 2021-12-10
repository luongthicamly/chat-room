import React, {useState } from 'react';
import Registration from './registration';
import Login from './login';

function Tab_regis_login(props) {
    const tabs = ['Login','Registration']
    const [typeTab, setTypeTab] = useState('Login');
    // console.log(props.setToken)
    return (
        <div className='bg-login'>
        <div className='bg-login_container'>
        <div className="tab">
          <div className='tab-header'>
            <div className='tab-header_bg'>
              {tabs.map(tab =>(
                <div 
                key={tab} 
                onClick={() =>setTypeTab(tab)}
                className={typeTab === tab ? 'active' :'tab'}
                >
                  {tab}
                </div>
              ))}
            </div>
          </div>
          <div className='tab-content mt-5 p-2'>
            {
              typeTab === 'Login' 
              ? <Login />
              : <Registration/>
            }
          </div>
          
        </div>
      </div>
      </div>
    );
}

export default Tab_regis_login;