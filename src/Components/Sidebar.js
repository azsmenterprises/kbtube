import React, { useState, useEffect } from 'react';
import { Link, NavLink  } from 'react-router-dom'
import { getToken } from "../AuthUser";
import { getUser } from "../AuthUser";
import { authHttps } from "../AuthUser";

function Sidebar() {

    let userData = getUser();
    let token = getToken();


    const http = authHttps();
    const [chanenl, setChanneel] = useState(false);
 


    const fetchChannel = async () => {
        try {
            const response = await http.post('user/myChanel');
            if (response.data && response.data.status == 1) {

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
        
        <div className="d-flex flex-column flex-shrink-0 p-3  sidebar-box large-sidebar overflow-y-sm">
            <ul className="nav flex-column mb-auto ">
                <li className="nav-item" >
                    <NavLink to="/" activeClassName="active" className={`nav-link`} aria-current="page"  data-bs-dismiss="offcanvas">
                        <i className='me-3 bi bi-house-door-fill'></i>
                        <span className='sidebar-title'>Home</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/shorts" activeClassName="active" className={`nav-link`} data-bs-dismiss="offcanvas" >
                        <i className='me-3 bi bi-skip-end-btn'></i>
                        <span className='sidebar-title'> Shorts </span>
                    </NavLink>
                </li>
                <li>
                    <NavLink activeClassName="active" to="/subscriptions"  className={`nav-link`} data-bs-dismiss="offcanvas" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="me-3 bi bi-play-btn" viewBox="0 0 16 16">
                            <path d="M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z" />
                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z" />
                        </svg>
                        <span className='sidebar-title'>Subscriptions</span>
                    </NavLink>
                </li>
                <li><hr className="divider" /></li>
                <li ><Link href='#' className="nav-link " ><strong>You <i className="bi bi-chevron-right"></i></strong> </Link> </li>
                {
                    userData == null ?
                        <li>
                            <NavLink to="/login" activeClassName="active" className={`nav-link`} data-bs-dismiss="offcanvas" >
                                <i class="me-3 bi bi-person-circle"></i>  Login
                            </NavLink>
                        </li>
                        :
                        <ul className='list-unstyled ms-0'>
                            {/* <li>
                                <NavLink to="/profile" activeClassName="active" className={`nav-link`} data-bs-dismiss="offcanvas" >
                                    <i class="me-3 bi bi-person-circle"></i>  Profile
                                </NavLink>
                            </li> */}
                            {chanenl == true ? (
                                <li >
                                    <NavLink to="/channel" activeClassName="active" className={`nav-link`} data-bs-dismiss="offcanvas" >
                                        <i class="me-3 bi bi-file-play"></i>  Your Channel
                                    </NavLink>
                                </li>
                            ) : (
                                <li>
                                    <NavLink to="/create-channel" activeClassName="active" className={`nav-link`} data-bs-dismiss="offcanvas" >
                                        <i class="me-3 bi bi-film"></i>  Create Channel
                                    </NavLink>
                                </li>
                            )}
                            {/* <li> 
                                <NavLink to="/history-videos" activeClassName="active" className={`nav-link`} data-bs-dismiss="offcanvas" >
                                    <i class="me-3 bi bi-clock-history"></i> History</NavLink>
                            </li>
                            <li ><NavLink to="/watch-later-videos" activeClassName="active" className={`nav-link`} data-bs-dismiss="offcanvas" >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="me-3 bi bi-clock" viewBox="0 0 16 16">
                                    <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
                                </svg> Watch Later</NavLink></li>
                            <li ><NavLink to="/liked-videos" className={`nav-link`} ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="me-3 bi bi-hand-thumbs-up" viewBox="0 0 16 16">
                                <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
                            </svg>Liked Videos</NavLink></li> */}
                        </ul>
                }

                <li><hr className="divider" /></li>

                <li className="nav-link  "><strong>Explore</strong></li>

                <li>
                    <NavLink to="/trending" activeClassName="active" className={`nav-link`} data-bs-dismiss="offcanvas" >
                        <i className='me-3 bi bi-fire'></i>
                        <span className='sidebar-title'> Trending </span>
                    </NavLink>
                </li>
                {/* <li>
                    <NavLink to="/shop" activeClassName="active" className={`nav-link`} data-bs-dismiss="offcanvas" >
                        <i className='me-3 bi bi-shop'></i>
                        <span className='sidebar-title'> Shop </span>
                    </NavLink>
                </li> */}
            </ul>
        </div>
       
    )
}

export default Sidebar