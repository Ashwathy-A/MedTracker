import React, { useState} from 'react';
import '../styles/home.css';
import { Link,useNavigate } from 'react-router-dom';

export default function CreateForm() {
  //const { hellodata, setHelloData } = useContext(DataContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState(false);
  const navigate = useNavigate();
  let data={};
  const CreateUser = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:3002/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    data = await response.json();
    console.log(data);
    
    //setHelloData(data); 
    if (data.status === 'ok') {
      alert("login to access profile");
      navigate('/', { replace: true });
    }
    else if(data.status !='ok') {
      setErrMsg(true);
      alert("can't create account or user already exists");
    }
    
}
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
 
   const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  

  

  // const handleConfirmPasswordChange = (event) => {
  //   setConfirmPassword(event.target.value);
  // };

  




      // .then((res) => res.json())
      // .then((data) => {
      //   console.log(data, "userRegister");
      //   if (data.status === "ok") {
      //     alert("Registration Successful");
      //   } else {
      //     alert("Something went wrong");
      //   }
      // })
      // .catch(error => {
      //   console.error(error);
      // });
  

  // 
  
  return (
    <div>
      <div id="login1">
        <div className="loginpage">
          <div className="loginframe">
            <h1 className="h">Create Account</h1>
            <div>
              <input
                type="text"
                className="input1"
                placeholder="username"
                value={username}
                onChange={handleUsernameChange}
              />
              <br />
              <input
                type="password"
                className="input1"
                placeholder="password"
                value={password}
                onChange={handlePasswordChange}
              />
              <br />
              <button href="/login" type="button" className="button" onClick={CreateUser}>
                Create
              </button>
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

//export default createacount;