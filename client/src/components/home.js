import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
//import {DataContext} from '../../../DataContext';
import { useState,useContext,useEffect } from 'react';
import '../styles/home.css';

export default function LoginForm() {
  //const { hellodata, setHelloData } = useContext(DataContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState(false);
  const navigate = useNavigate();
  let data={};
  const validateUser = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:3002/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    data = await response.json();
    console.log(data);
    
    //setHelloData(data); 
    if (data.status === 'ok') {
      //console.log(hellodata);
      navigate('/profile', { replace: true });
    }
    else if(data.status !='ok') {
      setErrMsg(true);
      alert("Incorrect username or password");
    }
    
}



//----------------------------------------------------

// const Home = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const history = useNavigate();

//   const handleSignIn = () => {
//     const usernameExists = checkUsernameExists(username);
//     fetch('http://localhost:3002/', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ username, password }),
//     })
//       .then(response => response.json())
//     if (!usernameExists) {
//       window.location.href = './createacount';
//     } else {
//       if (password !== 'validpassword') {
//         window.location.href = './createacount';
//       } else {
//         // Continue with successful login logic
//         history.push('/profile'); // Navigate to the profile page
//       }
//     }

//     // const isAuthenticated = authenticateUser(username, password);

//     // if (isAuthenticated) {
//     //   // Redirect to the profile page if authentication is successful
//     //   history.push('/profile');
//     // } else {
//     //   // Redirect to the create account page if authentication fails
//     //   history.push('/createacount');
//     // }

//   };

   const handleUsernameChange = (event) => {
     setUsername(event.target.value);
   };

   const handlePasswordChange = (event) => {
     setPassword(event.target.value);
   };

   const checkUsernameExists = (username) => {
     return false;
   };
//---------------------------------------------------------------------------
  // const authenticateUser = async (username, password) => {
  //   // Implement your authentication logic here
  //   // You can make a fetch request to the backend and verify the credentials

  //   // For example, assuming you have a backend API endpoint /api/login
  //   try {
  //     const response = await fetch('http://localhost:3002/', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ username, password }),
  //     });
  //     const data = await response.json();
  //     return data.success;
  //   } catch (error) {
  //     console.error(error);
  //     return false;
  //   }
  // };

  return (
    <div>
      <div id="login1">
        <div className="loginpage">
          <div className="loginframe">
            <h1 className="h">User Login</h1>
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
              <button type="button" className="button" onClick={validateUser}>
                Sign in
              </button>
              <br />
              <div className="createacount">
                <Link to="/createacount" style={{ textDecoration: 'none' }}>
                  Create Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

//export default Home;


// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import '../styles/home.css';

// const Home = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSignIn = (e) => {
//     e.preventDefault();

//     fetch('http://localhost:3002/', {
//       method: 'POST',
//       crossDomain: true,
//       headers: {
//         'Content-Type': 'application/json',
//         Accept: 'application/json',
//         'Access-Control-Allow-Origin': '*',
//       },
//       body: JSON.stringify({
//         username,
//         password,
//       }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data, 'userRegister');
//         if (data.status === 'ok') {
//           alert('Login successful');
//           // window.localStorage.setItem('token', data.data);
//           // window.localStorage.setItem('loggedIn', true);

//           navigate('/profile');
//         } else {
//           alert('Invalid username or password');
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//         alert('An error occurred. Please try again.');
//       });
//   };

//   const handleUsernameChange = (event) => {
//     setUsername(event.target.value);
//   };

//   const handlePasswordChange = (event) => {
//     setPassword(event.target.value);
//   };

//   return (
//     <div>
//       <div id="login1">
//         <div className="loginpage">
//           <div className="loginframe">
//             <form onSubmit={handleSignIn}>
//               <h1 className="h">User Login</h1>
//               <div>
//                 <input
//                   type="text"
//                   className="input1"
//                   placeholder="username"
//                   value={username}
//                   onChange={handleUsernameChange}
//                 />
//                 <br />
//                 <input
//                   type="password"
//                   className="input1"
//                   placeholder="password"
//                   value={password}
//                   onChange={handlePasswordChange}
//                 />
//                 <br />
//                 <button type="submit" className="button">
//                   Sign in
//                 </button>
//                 <br />
//                 <div className="createacount">
//                   <Link to="/createaccount" style={{ textDecoration: 'none' }}>
//                     Create Account
//                   </Link>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;