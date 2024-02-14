import React, { useEffect, useState } from "react";
import { https as makeHttps } from "../AuthUser";
import { useNavigate } from 'react-router-dom';


function Login() {
  const [isOpenForm, setIsOpenForm] = useState(false);


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [name, setName] = useState('');
  const [emails, setEmails] = useState('');
  const [phone, setPhone] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');


  const navigate = useNavigate();
  const toggleForm = () => {
    setIsOpenForm(!isOpenForm);
  };

  const http=makeHttps();
 

    const handleLogin = async () => {
    try {
        const response = await http.post('user/login', {
        email: email,
        password: password,
        });

        if(response.data){
            const token = response.data.user.token;
            sessionStorage.setItem('token',JSON.stringify(token))
            sessionStorage.setItem('user',JSON.stringify(response.data.user))
            //navigate('/');
            window.location.href='./';
        }
        
    } catch (error) {
        // Log the error to the console for debugging
        console.error('Error during login:', error);

        // Display the server's error message to the user
        alert(`Login failed. ${error.response.data.message}`);
    }
    };



     const handleRegister = async () => {
   
      

        try {
            const responses = await http.post('user/register', {
            full_name:name,
            email:emails,
            phone:phone,
            password:password1,
            confirm_password:password2
            });

            if(responses.data){

                const response = await http.post('user/login', {
                email: emails,
                password: password1,
                });

                if(response.data){
                    const token = response.data.user.token;
                    sessionStorage.setItem('token',JSON.stringify(token))
                    sessionStorage.setItem('user',JSON.stringify(response.data.user))
                    //navigate('/');
                    window.location.href='./';
                }
                
            } 
        }
        catch (error) {
                // Log the error to the console for debugging
                console.error('Error during Register:', error);

                // Display the server's error message to the user
                alert(`Register failed , Please Enter required fields. `);
        }
    };

  return (

        <>
            <div className="content-registration bg-dark">
                <div className="container">
                    <div className='row justify-content-center align-items-center' >
                        <div className='col-lg-4'>
                            <div className="content-top  mb-3">
                                <h2 class="fw-bolder text-center">
                                    <span className={`${isOpenForm ? 'd-none' : 'd-block'}`}>Login</span>
                                    <span className={`${isOpenForm ? 'd-block' : 'd-none'}`}>Signup</span>
                                </h2>
                            </div>
                            <div className='rounded-4 shadow bg-gray login-form-box'>
                                <form className={`p-3 ${isOpenForm ? 'd-none' : 'd-block'}`} >
                                    <div className="form-floating mb-3">
                                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}  className="form-control" id="floatingInput" placeholder="name@example.com" />
                                        <label for="floatingInput">Email address</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="password"  value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="floatingPassword" placeholder="Password" />
                                        <label for="floatingPassword">Password</label>
                                    </div>

                                    <div className='row my-3'>
                                        <div className='col-6'>
                                            <div className="form-check">
                                                <input className="form-check-input border-dark" type="checkbox" value="" id="RememberMe" name='RememberMe' />
                                                <label className="form-check-label" for="RememberMe"><small>Remember me</small></label>
                                            </div>
                                        </div>
                                        {/* <div className='col-6 text-end'>
                                            <a href='/' className='text-theme text-decoration-none'> <small>Forgot Password</small> </a>
                                        </div> */}

                                    </div>
                                    <button className="w-100 mb-2 btn btn-lg btn-light rounded-5" type="button" onClick={handleLogin}>Sign in</button>
                                    <div className="mt-2">
                                        Don’t have an account? <a href="javascript:void(0)" className="text-decoration-none secondary-color" onClick={toggleForm} >Sign up</a>
                                    </div>
                                </form>
                                <form className={`p-3 ${isOpenForm ? 'd-block' : 'd-none'}`}>
                                    <div className="form-floating mb-3">
                                        <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} id="name" placeholder="Enter your Name *" />
                                        <label for="Fname">Name</label>
                                    </div>
                                  
                                    <div className="form-floating mb-3">
                                        <input type="email" className="form-control" value={emails} onChange={(e) => setEmails(e.target.value)} id="EmailId" placeholder="E.g., name@example.com *" />
                                        <label for="EmailId">Email address</label>
                                    </div>

                                    <div className="form-floating mb-3">
                                        <input type="tel" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} id="phone" placeholder="9876543210 *" />
                                        <label for="EmailId">Phone</label>
                                    </div>

                                    <div className="form-floating mb-3">
                                        <input type="password" className="form-control" value={password1} onChange={(e) => setPassword1(e.target.value)} id="Password" placeholder="Enter Your New Password*" />
                                        <label for="Password">Password</label>
                                    </div>

                                    <div className="form-floating mb-3">
                                        <input type="password" className="form-control" value={password2} onChange={(e) => setPassword2(e.target.value)} id="Password" placeholder="Enter Your New Password*" />
                                        <label for="Password">Confirm Password</label>
                                    </div>

                                    <div className='row my-3'>
                                        <div className='col-6'>
                                            <div className="form-check">
                                                <input className="form-check-input border-dark" type="checkbox" value="" id="RememberMe" name='RememberMe' />
                                                <label className="form-check-label" checked for="RememberMe"><small>Remember me</small></label>
                                            </div>
                                        </div>
                                        {/* <div className='col-6 text-end'>
                                            <a href='/' className='text-theme text-decoration-none'> <small>Forgot Password</small> </a>
                                        </div> */}

                                    </div>
                                    <a className="w-100 mb-2 btn btn-lg btn-light rounded-5"   onClick={handleRegister} >Create an account</a>
                                    <div className="mt-2">
                                        Already have an account? <a href="javascript:void(0)" className="text-decoration-none secondary-color" onClick={toggleForm} >Login</a>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login