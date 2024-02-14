import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { getToken } from "../AuthUser";
import  profile  from '../assets/images/profile-pic.jpg';
import { authHttps } from "../AuthUser";

function Topbar() {
    const http=authHttps();
    let token = getToken();
    const [chanenl, setChanneel] = useState(false);
   

     const fetchChannel = async () => {
        try {
            const response = await http.post('user/myChanel');
            if (response.data && response.data.status==1) {

               setChanneel(true);
            
            } 
        } catch (error) {
            console.error('Error fetching Channel:', error);
        } 
        };


        useEffect(() => {
        fetchChannel();
        }, []);
    
    return (
        

        <>
            {      
            token?
                <div className='col-lg-3 col-8 order-lg-2'>
                    <div className='d-flex justify-content-end'>
                        <div className="dropdown text-end me-4">
                            <Link href="#" className="d-block caret-none  text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="bi bi-camera-reels secondary-color"></i>
                            </Link>
                            <ul className="dropdown-menu">
                             
                                   {chanenl==true ? (
                                <li><a className="dropdown-item" href="/content" data-bs-toggle="modal" data-bs-target="#videoUpload">Upload Video</a></li>
                              ) : (
                                    <Link to="./create-channel" className="dropdown-item">Create Chanel</Link>
                                 )}
                                <li><a className="dropdown-item" href="#">Go Live</a></li>
                            </ul>
                        </div>
                        <div className="dropdown text-end me-4 ">
                            <Link href="#" className="d-block caret-none  text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className='bi bi-bell secondary-color'></i>
                            </Link>
                            <ul className="dropdown-menu ">
                                <li><a className="dropdown-item" href="#">Notification 1</a></li>
                                <li><a className="dropdown-item" href="#">Notification 2</a></li>
                            </ul>
                        </div>

                        <div className="dropdown text-end">
                            <a href="#" className="d-block caret-none  text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle" />
                            </a>
                            <ul className="dropdown-menu ">
                               
                                <li><a className="dropdown-item" href="/profile">Profile</a></li>
                                <li><a className="dropdown-item" href="#">Settings</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <Link to="signout"><a className="dropdown-item" href="#">Sign out</a></Link>
                            </ul>
                        </div>
                    </div>
                </div>
                :
                <div className='col-lg-3 col-8 order-lg-2'>
                    <div className='d-flex justify-content-end'>
                        <Link to="/login" className='text-decoration-none secondary-color '>
                            <div className="text-end me-4 ">
                                <div className="d-block caret-none" >
                                    <img src={profile} alt="mdo" width="32" height="32" className="rounded-circle" /> Signin
                                </div>
                            
                            </div>
                        </Link>
                    </div>
                </div>
            }
                    
               
        </>
    )
}

export default Topbar