import React from 'react'
import { Link } from 'react-router-dom';

import icon1 from '../assets/icons/house.svg';
import icon2 from '../assets/icons/skip-end-btn.svg';
import icon3 from '../assets/icons/plus-circle.svg';
import icon4 from '../assets/icons/film.svg';
import icon5 from '../assets/icons/person-circle.svg';


function Footer() {
    return (
        <>
            <div className='bg-white fixed-bottom p-3 d-block d-lg-none'>
                <div className='d-flex gap-3 justify-content-between'>
                    
                    <div>
                        <Link to="/" className="nav-link  d-grid text-center justify-content-center">
                            <img src={icon1 } alt='' width={15} className='d-block m-auto'/>
                            <small className=''> home </small>
                        </Link>
                    </div>
                    <div>
                        <Link to="/" className="nav-link  d-grid text-center justify-content-center">
                            <img src={icon2 } alt='' width={15} className='d-block m-auto'/>
                            <small className=''> short </small>
                        </Link>
                    </div>
                    <div>
                        <Link to="/" className="nav-link  d-grid text-center justify-content-center" data-bs-toggle="modal" data-bs-target="#videoUpload">
                            <img src={icon3 } alt='' width={15} className='d-block m-auto'/>
                            <small className=''> Add </small>
                        </Link>
                    </div>
                    <div>
                        <Link to="/" className="nav-link  d-grid text-center justify-content-center">
                            <img src={icon4 } alt='' width={15} className='d-block m-auto'/>
                            <small className=''> subscribtions </small>
                        </Link>
                    </div>
                    <div>
                        <Link to="/login" className="nav-link  d-grid text-center justify-content-center">
                            <img src={icon5 } alt='' width={15} className='d-block m-auto'/>
                            <small className=''> you </small>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
};
export default Footer
