import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Sidebar from '../Components/Sidebar';
import { Link } from 'react-router-dom';
import profilePic from "../assets/images/profile-pic.jpg";
import { getToken } from "../AuthUser";
import { authHttps } from "../AuthUser";
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

// const videos = [
//     {
//         title: 'Shorts Video 1',
//         description: 'This is a kbtube Shorts-like video.',
//         url: '../assets/videos/video-1.mp4',
//     },
//     {
//         title: 'Shorts Video 2',
//         description: 'Another Shorts-like video description.',
//         url: '../assets/videos/video-1.mp4',
//     },
//     // Add more video objects as needed
// ];
const ShortsVideo = () => {


    const http = authHttps();
    let token = getToken();
    const [allVideo, setallVideo] = useState([]);
    const [loadingvideos, setloadingvideos] = useState(true);

    const [allVideos, setallVideos] = useState([]);
    const [loadingvideoss, setloadingvideoss] = useState(true);

    const [name, setName] = useState('Channel Name');
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState('');
    const [subscriber, setSubscriber] = useState('');
    const [like, setLike] = useState('');
    const [dlike, setDlike] = useState('');
    const [chanelId, setChanelId] = useState('');
    const [subs, setSubs] = useState(false);
    const [comments, setComments] = useState('');

    const [allComment, setallComment] = useState([]);
    const [loadingcomment, setloadingcomment] = useState(true);






    const fetchVideo = async () => {
        try {
            const videoId = localStorage.getItem('shortsId');
            const response = await http.post('user/idWiseVideo', { 'videoId': videoId });

      

            if (response.data && response.data.data) {
                setallVideo(response.data.data);

                setName(response.data.data.name);
                setChanelId(response.data.data.chanelId);
                setDescription(response.data.data.description);
                setPhoto(response.data.data.photo);
                setSubscriber(response.data.data.subscriber);
                setLike(response.data.data.like);
                setDlike(response.data.data.dlike);
    

            } else {
                console.error('Invalid data structure received from the API:', response.data);
            }
        } catch (error) {
            console.error('Error fetching video categories:', error);
        } finally {
            setloadingvideos(false);
        }
    };

    useEffect(() => {
        fetchVideo();
    }, []);

    const navigate = useNavigate();

    


    const fetchAllVideo = async () => {
        try {
            const catid = localStorage.getItem('catid');
            const response = await http.post('user/shortVideo', { 'categoryId': catid });
            if (response.data && response.data.data) {
                setallVideos(response.data.data);
            } else {
                console.error('Invalid data structure received from the API:', response.data);
            }
        } catch (error) {
            console.error('Error fetching video categories:', error);
        } finally {
            setloadingvideoss(false);
        }
    };

    useEffect(() => {
        fetchAllVideo();
    }, []);




    const TimeAgo = ({ date }) => {
        // Assuming `date` is a string in the format 'YYYY-MM-DDTHH:mm:ss.sssZ'
        const parsedDate = new Date(date);

        const timeAgo = formatDistanceToNow(parsedDate, { addSuffix: true });

        return <span>{timeAgo}</span>;
    };



    const formatViewsCount = (count) => {
        if (count < 1000) {
            return count.toString();
        } else if (count < 1000000) {
            return `${(count / 1000).toFixed(1)}K`;
        } else {
            return `${(count / 1000000).toFixed(1)}M`;
        }
    };




    const addSubscriber = async (chanelId) => {
        const response = await http.post('user/addSubscriber', { 'chanelId': chanelId });

        if (response.data && response.data.status === 1) {
            setSubscriber(subscriber + 1);
            checksubscrive();
        }
    };


    const removeSubscriber = async (chanelId) => {
        const response = await http.post('user/removeSubscriber', { 'chanelId': chanelId });
        if (response.data && response.data.status === 1) {
            setSubscriber(subscriber - 1);
            checksubscrive();
        }
    };


    const likeMaster = async (chanelId, type) => {
        const videoId = localStorage.getItem('videoId');
        const response = await http.post('user/likeMaster', { 'chanelId': chanelId, 'videoId': videoId, 'type': type });
        if (response.data && response.data.status === 1) {

            if (type === 1) {
                setLike(like + 1);
                if (response.data.action === 2) {
                    setDlike(dlike - 1);
                }
            } else {
                setDlike(dlike + 1);
                if (response.data.action === 2) {
                    setLike(like - 1);
                }
            }

        }

    };

    const checksubscrive = async () => {
        try {
            const videoId = localStorage.getItem('videoId');
            const response = await http.post('user/checkSubscriber', { 'videoId': videoId });
            //console.log('checksubs',response);
            if (response.data && response.data.status === 1) {
                setSubs(true);

                //alert('done');
            } else {
                setSubs(false);
            }
        } catch (error) {
            setSubs(false);
        }
    };

    useEffect(() => {
        checksubscrive();
    }, []);


    const addComment = async () => {

        const videoId = localStorage.getItem('videoId');
        const response = await http.post('user/addComment', { 'videoId': videoId, 'comments': comments, });
        if (response.data && response.data.status === 1) {
            alert('ok');
        }

    };




    const fetchAllComments = async () => {
        try {
            const videoId = localStorage.getItem('videoId');
            const response = await http.post('user/videoIdWiseComment', { 'videoId': videoId, });

            console.log('comm', response);

            if (response.data && response.data.data) {
                setallComment(response.data.data);
            } else {
                console.error('Invalid data structure received from the API:', response.data);
            }
        } catch (error) {
            console.error('Error fetching video categories:', error);
        } finally {
            setloadingcomment(false);
        }
    };


    useEffect(() => {
        fetchAllComments();
    }, []);


   
    return (
        <>
            <div className='home-sidebar d-none d-lg-block'>
                <Sidebar />
            </div>
            <div className='contain-right-box pt-3'>
                <div className='row gy-3'>
                
                        <div className='col-lg-5 offset-lg-3 d-none'>
                            <div className='row g-2 '>
                                <div className='col-md-10'>
                                    <div className='video-box-single-v d-flex gap-2 align-items-center'>
                                        <Card className='shorts-card shadow-none'>
                                            <div className='video-box'>

                                                <CardMedia
                                                    component="video"
                                                    alt="Video Poster"
                                                    autoPlay
                                                    controls
                                                    className='w-100'
                                                    muted
                                                >
                                                  
                                                        <source src={allVideo.url} type="video/mp4" />
                                                   
                                                    Your browser does not support the video tag.
                                                </CardMedia>
                                            </div>
                                            <CardContent className='shorts-card-content'>
                                                <div className='content-box'>
                                                    <div className='row g-2'>
                                                        <div className='col-lg-12'>
                                                            <Typography variant="body2" color="text.secondary" >
                                                                <div class="d-flex align-items-center gap-2 ">
                                                                    <div className='channel-thumbnail'>
                                                                       

                                                                        {allVideo.channelIcon ? ( 
                                                                        <img src={allVideo.channelIcon} className="rounded-circle  img-fluid" />
                                                                        ) : (
                                                                        <img src={profilePic} className="rounded-circle  img-fluid" />

                                                                        )}
                                                                    </div>
                                                                    <Link href='#' className='mb-0 text-light small'><small>@{allVideo.channelName}</small></Link>
                                                                    <div className='me-2'>

                                                                           {token ? (
                                                                    subs ? (
                
                                                                             <Link href='#' className='btn bg-white rounded-5 px-2 py-1'><small>Subscribed</small></Link>
                                                                           

                                                                    ) : (
                                                                        <button type='button' onClick={() => addSubscriber(chanelId)} className='btn bg-white rounded-5 px-2 py-1'> <small>Subscribe</small></button>
                                                                    )

                                                                ) : (
                                                                    <Link to="../login" className='btn bg-white rounded-5 px-2 py-1'> <small>Subscribe</small></Link>
                                                                )
                                                                }
                                                                      
                                                                    </div>
                                                                </div>
                                                            </Typography>
                                                        </div>
                                                        <div className='col-12'>
                                                            <h3 className='text-light h6'>
                                                                {allVideo.title}
                                                            </h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>

                                        </Card>
                                        <div className='shorts-action-btns'>
                                            <div className='text-center'>
                                                <Link href="#" className='rounded-box-shorts btn btn-light'>
                                                    {/* <i class="bi bi-hand-thumbs-up-fill"></i> use this after liked video */}
                                                    <i class="bi bi-hand-thumbs-up"></i>
                                                </Link>
                                                <small>Like</small>
                                            </div>
                                            <div className='text-center'>
                                                <Link href="#" className='rounded-box-shorts btn btn-light'>
                                                    <i class="bi bi-hand-thumbs-down"></i>
                                                    {/* <i class="bi bi-hand-thumbs-down-fill"></i> use this after disliked video */}
                                                </Link>
                                                <small>Dislike</small>
                                            </div>
                                            <div className='text-center'>
                                                <Link href="#" className='rounded-box-shorts btn btn-light'>
                                                    <i class="bi bi-chat-right-text-fill"></i>
                                                </Link>
                                                <small>Comment</small>
                                            </div>
                                            {/* <div className='text-center'>
                                                <Link href="#" className='rounded-box-shorts btn btn-light' data-bs-toggle="modal" data-bs-target="#shareModal" >
                                                    <i class="bi bi-share-fill"></i>
                                                </Link>
                                                <small>Share</small>
                                                <div class="modal fade" id="shareModal" tabindex="-1" aria-labelledby="shareModalLabel" aria-hidden="true">
                                                    <div class="modal-dialog modal-dialog-centered">
                                                        <div class="modal-content">
                                                            <div class="modal-header">
                                                                <h5 class="modal-title" id="shareModalLabel">Share</h5>
                                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                            </div>
                                                            <div class="modal-body">
                                                                <div className='d-flex justify-content-center mb-4 overflow-auto gap-2 py-3'>
                                                                    <div>
                                                                        <Link href="#" className='rounded-box-shorts btn btn-success'>
                                                                            <i class="bi bi-whatsapp"></i>
                                                                        </Link>
                                                                    </div>
                                                                    <div>
                                                                        <Link href="#" className='rounded-box-shorts btn btn-primary'>
                                                                            <i class="bi bi-facebook"></i>
                                                                        </Link>
                                                                    </div>
                                                                    <div>
                                                                        <Link href="#" className='rounded-box-shorts btn btn-danger'>
                                                                            <i class="bi bi-instagram"></i>
                                                                        </Link>
                                                                    </div>
                                                                    <div>
                                                                        <Link href="#" className='rounded-box-shorts btn btn-light'>
                                                                            <i class="bi bi-twitter-x"></i>
                                                                        </Link>
                                                                    </div>
                                                                    <div>
                                                                        <Link href="#" className='rounded-box-shorts btn btn-primary'>
                                                                            <i class="bi bi-linkedin"></i>
                                                                        </Link>
                                                                    </div>
                                                                    <div>
                                                                        <Link href="#" className='rounded-box-shorts btn btn-light'>
                                                                            <i class="bi bi-telegram"></i>
                                                                        </Link>
                                                                    </div>
                                                                    <div>
                                                                        <Link href="#" className='rounded-box-shorts btn btn-dark'>
                                                                            <i class="bi bi-threads-fill"></i>
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                                <div class="input-group mb-3 border rounded-5">
                                                                    <input type="text" class="form-control border-0" value='https://kbtube.com/shorts/SfVINN7SI6w?feature=shared' placeholder="video url" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                                                    <span class="input-group-text btn btn-primary rounded-5 " id="basic-addon2">Copy</span>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div> */}
                                            <div className='text-center'>
                                                <Link href="#" className="caret-none rounded-box-shorts btn btn-light dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <i class="bi bi-three-dots-vertical"></i>
                                                </Link>
                                                <ul className="dropdown-menu">
                                                    <li><Link className="dropdown-item" href="/login"><i class="bi bi-bar-chart-steps me-3"></i>Add to queue</Link></li>
                                                    <li><Link className="dropdown-item" href="/login"><i className="me-3 bi bi-clock-history"></i> Save to Watch Later</Link></li>
                                                    <li><Link className="dropdown-item" href="/login"><i class="bi bi-plus-square me-3"></i> Save to Playlist</Link></li>
                                                    <li><Link className="dropdown-item" href="/login"><i class="bi bi-download me-3"></i> Download</Link></li>
                                                    <li><Link className="dropdown-item" href="/login"><i className="me-3 bi bi-share"></i> Share</Link></li>
                                                    <li><hr className="dropdown-divider" /></li>
                                                    <li><Link className="dropdown-item" href="#"><i className="me-3 bi bi-ban"></i>  Not Interested </Link></li>
                                                    <li><Link className="dropdown-item" href="#"><i class="bi bi-dash-circle me-3"></i>  Don't Recomended Channel </Link></li>
                                                    <li><Link className="dropdown-item" href="#"><i className="me-3 bi bi-flag"></i>  Report </Link></li>
                                                </ul>
                                            </div>
                                            <div className='text-center mt-2'>
                                                <Link href="#" className="rounded-3 overflow-hidden">
                                                    {
                                                    allVideo.channelIcon ? (
                                                        <img src={allVideo.channelIcon} width={50} height={50} alt='img'className="rounded-circle  img-fluid" />
                                                    ) : (
                                                        <img src={profilePic} width={50} height={50} alt='img' className="rounded-circle  img-fluid"/>
                                                    )}
                                                   
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {loadingvideoss ? (
                            <p>Loading Video...</p>
                        ) : allVideos.length && allVideos.length > 0 ? (
                            allVideos.map((video, index) => (
                        <div className='col-lg-5 offset-lg-3'>
                            <div className='row g-2 '>
                                <div className='col-md-10'>
                                    <div className='video-box-single-v d-flex gap-2 align-items-center'>
                                        <Card className='shorts-card shadow-none'>
                                            <div className='video-box'>

                                                <CardMedia
                                                    component="video"
                                                    alt="Video Poster"
                                                    poster={video.thumbnail}
                                                    autoPlay
                                                    controls
                                                    className='w-100'
                                                    muted
                                                >
                                                    <source src={video.url} className='w-100' type="video/mp4" />
                                                    Your browser does not support the video tag.
                                                </CardMedia>
                                            </div>
                                            <CardContent className='shorts-card-content '>
                                                <div className='content-box'>
                                                    <div className='row g-2'>
                                                        <div className='col-lg-12'>
                                                            <Typography variant="body2" color="text.secondary" >
                                                                <div class="d-flex align-items-center gap-2 ">
                                                                    <div className='channel-thumbnail'>
                                                                        {video.channelIcon ? ( 
                                                                        <img src={video.channelIcon} className="rounded-circle  img-fluid" />
                                                                        ) : (
                                                                        <img src={profilePic} className="rounded-circle  img-fluid" />

                                                                        )}
                                                                    </div>
                                                                    <Link href='#' className='mb-0 text-light small'><small>@{video.channelName}</small></Link>
                                                                    <div className='me-2'>
                                                                       
                                                                           {token ? (
                                                                    subs ? (
                
                                                                             <Link href='#' className='btn bg-white rounded-5 px-2 py-1'><small>Subscribed</small></Link>
                                                                           

                                                                            ) : (
                                                                                <button type='button' onClick={() => addSubscriber(chanelId)} className='btn bg-white rounded-5 px-2 py-1'> <small>Subscribe</small></button>
                                                                            )

                                                                        ) : (
                                                                            <Link to="../login" className='btn bg-white rounded-5 px-2 py-1'> <small>Subscribe</small></Link>
                                                                        )
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </Typography>
                                                        </div>
                                                        <div className='col-12'>
                                                            <h3 className='text-light h6'>
                                                                {video.title}
                                                            </h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>

                                        </Card>
                                        <div className='shorts-action-btns'>
                                            <div className='text-center'>
                                                <Link href="#" className='rounded-box-shorts btn btn-light'>
                                                  
                                                    <i class="bi bi-hand-thumbs-up"></i>
                                                </Link>
                                                <small>Like</small>
                                            </div>
                                            <div className='text-center'>
                                                <Link href="#" className='rounded-box-shorts btn btn-light'>
                                                    <i class="bi bi-hand-thumbs-down"></i>
                                                   
                                                </Link>
                                                <small>Dislike</small>
                                            </div>
                                            <div className='text-center'>
                                                <Link href="#" className='rounded-box-shorts btn btn-light'>
                                                    <i class="bi bi-chat-right-text-fill"></i>
                                                </Link>
                                                <small>Comment</small>
                                            </div>
                                            {/* <div className='text-center'>
                                                <Link href="#" className='rounded-box-shorts btn btn-light' data-bs-toggle="modal" data-bs-target="#shareModal" >
                                                    <i class="bi bi-share-fill"></i>
                                                </Link>
                                                <small>Share</small>
                                                <div class="modal fade" id="shareModal" tabindex="-1" aria-labelledby="shareModalLabel" aria-hidden="true">
                                                    <div class="modal-dialog modal-dialog-centered">
                                                        <div class="modal-content">
                                                            <div class="modal-header">
                                                                <h5 class="modal-title" id="shareModalLabel">Share</h5>
                                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                            </div>
                                                            <div class="modal-body">
                                                                <div className='d-flex justify-content-center mb-4 overflow-auto gap-2 py-3'>
                                                                    <div>
                                                                        <Link href="#" className='rounded-box-shorts btn btn-success'>
                                                                            <i class="bi bi-whatsapp"></i>
                                                                        </Link>
                                                                    </div>
                                                                    <div>
                                                                        <Link href="#" className='rounded-box-shorts btn btn-primary'>
                                                                            <i class="bi bi-facebook"></i>
                                                                        </Link>
                                                                    </div>
                                                                    <div>
                                                                        <Link href="#" className='rounded-box-shorts btn btn-danger'>
                                                                            <i class="bi bi-instagram"></i>
                                                                        </Link>
                                                                    </div>
                                                                    <div>
                                                                        <Link href="#" className='rounded-box-shorts btn btn-light'>
                                                                            <i class="bi bi-twitter-x"></i>
                                                                        </Link>
                                                                    </div>
                                                                    <div>
                                                                        <Link href="#" className='rounded-box-shorts btn btn-primary'>
                                                                            <i class="bi bi-linkedin"></i>
                                                                        </Link>
                                                                    </div>
                                                                    <div>
                                                                        <Link href="#" className='rounded-box-shorts btn btn-light'>
                                                                            <i class="bi bi-telegram"></i>
                                                                        </Link>
                                                                    </div>
                                                                    <div>
                                                                        <Link href="#" className='rounded-box-shorts btn btn-dark'>
                                                                            <i class="bi bi-threads-fill"></i>
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                                <div class="input-group mb-3 border rounded-5">
                                                                    <input type="text" class="form-control border-0" value='https://kbtube.com/shorts/SfVINN7SI6w?feature=shared' placeholder="video url" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                                                    <span class="input-group-text btn btn-primary rounded-5 " id="basic-addon2">Copy</span>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div> */}
                                            {/* <div className='text-center'>
                                                <Link href="#" className="caret-none rounded-box-shorts btn btn-light dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <i class="bi bi-three-dots-vertical"></i>
                                                </Link>
                                                <ul className="dropdown-menu">
                                                    <li><Link className="dropdown-item" href="/login"><i class="bi bi-bar-chart-steps me-3"></i>Add to queue</Link></li>
                                                    <li><Link className="dropdown-item" href="/login"><i className="me-3 bi bi-clock-history"></i> Save to Watch Later</Link></li>
                                                    <li><Link className="dropdown-item" href="/login"><i class="bi bi-plus-square me-3"></i> Save to Playlist</Link></li>
                                                    <li><Link className="dropdown-item" href="/login"><i class="bi bi-download me-3"></i> Download</Link></li>
                                                    <li><Link className="dropdown-item" href="/login"><i className="me-3 bi bi-share"></i> Share</Link></li>
                                                    <li><hr className="dropdown-divider" /></li>
                                                    <li><Link className="dropdown-item" href="#"><i className="me-3 bi bi-ban"></i>  Not Interested </Link></li>
                                                    <li><Link className="dropdown-item" href="#"><i class="bi bi-dash-circle me-3"></i>  Don't Recomended Channel </Link></li>
                                                    <li><Link className="dropdown-item" href="#"><i className="me-3 bi bi-flag"></i>  Report </Link></li>
                                                </ul>
                                            </div> */}
                                            <div className='text-center mt-2'>
                                                <Link href="#" className="rounded-3 overflow-hidden">
                                                    
                                                     {video.channelIcon ? ( 
                                                    <img src={video.channelIcon} className='rounded-box-shorts btn btn-light mt-1' width={50} height={50} alt='img'/>
                                                    ) : (
                                                    <img src={profilePic} className='rounded-box-shorts btn btn-light mt-1' width={50} height={50} alt='img'/>

                                                    )}
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                  ))
                    ) : (
                        <p>No videos available.</p>
                    )}
                </div>
            </div>
        </>
    )
}

export default ShortsVideo