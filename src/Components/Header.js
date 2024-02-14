import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import logo from '../logo.png';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import UploadVideo from './UploadVideo';
import { https as makeHttps } from "../AuthUser";

function Header() {
    

    const [description, setDescription] = useState('');

    const navigate = useNavigate();

    const handleFileChanges = async (event) => {
        const value = event.target.value;
        setDescription(value);
        localStorage.setItem('searchkey', value);
    }

    const searchVideo = async () => {
        //navigate('./');
        window.location.href = './';
    };


    return (
        <>
            <header className="p-0 pt-2 p-lg-3 mb-0 border-bottom  fixed-top bg-dark">
                <div className="container-fluid">
                    <div className="row align-items-center justify-content-between">
                        <div className='col-lg-3 col-4 d-flex'>
                            <Link href="#" className='me-3 d-none d-lg-inline-block' >
                               <i className="bi bi-list secondary-color font-lg"  ></i>
                            </Link>
                            <Link href="#" className='me-3 d-inline-block d-lg-none' data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                               <i className="bi bi-list secondary-color font-lg"></i>
                            </Link>
                            <Link to="/" className="d-flex align-items-center mb-2 mb-lg-0  text-decoration-none">
                                <img src={logo} alt='log' width={100} />
                            </Link>
                        </div>

                        <Topbar />


                        <div className='col-lg-5'>
                            <div className="search-bar">

                                <input
                                    type="search"
                                    placeholder="Search"
                                    value={description}
                                    onChange={handleFileChanges}
                                />
                                <button onClick={() => searchVideo()}>
                                    <i className="bi bi-search secondary-color"></i>
                                </button>

                            </div>
                        </div>
                    </div>
                </div>

                {/* sidebar header start */}
                <div className="offcanvas offcanvas-start px-0" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel" style={{width: '256px'}}>

                    
                    <div className='d-flex ms-3'>
                            <Link href="#" className='me-3 secondary-color font-lg' data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                               <i className="bi bi-list"></i>
                            </Link>
                            <Link to="/" className="d-flex align-items-center mb-2 mb-lg-0  text-decoration-none">
                                <img src={logo} alt='log' width={100} />
                            </Link>
                    </div>

                    <div className="offcanvas-body overflow-y-sm p-0">
                        <Sidebar />
                    </div>

                </div>
                {/* sidebar header end */}
                
            </header>
            
            <UploadVideo />
           

            
        </>
    )
};
export default Header
