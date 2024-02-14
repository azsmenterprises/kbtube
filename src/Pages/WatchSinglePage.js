import React, { useState, useEffect } from 'react';

import profilePic from "../assets/images/profile-pic.jpg";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import ReadMoreVideoDesc from '../Components/ReadMoreVideoDesc';
import { Link } from 'react-router-dom'
import { getToken } from "../AuthUser";
import { authHttps } from "../AuthUser";
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

function WatchSinglePage() {
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
            const videoId = localStorage.getItem('videoId');
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

    const viewVideo = async (videoId, catid) => {
        localStorage.setItem('videoId', videoId);
        localStorage.setItem('catid', catid);
        await http.post('user/addView', { 'videoId': videoId });
        navigate('../watch');
    };



    const fetchAllVideo = async () => {
        try {
            const catid = localStorage.getItem('catid');
            const response = await http.post('user/categoryWiseVideo', { 'categoryId': catid });
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

    const longText = "Europe's nature is so beautiful, most of the scenes in this video were recorded by me during my trip to Europe. with the first shot being in Norway I bought this shot from another cameraman because it was so beautiful. Nature sounds captured by Microphone: Lewitt LCT 040 matched pair I want to share with you my nature Filmed from these Trips.";
    return (
        <>
            <div className='container-fluid mt-3 px-lg-4'>
                <div className='row'>
                    <div className='col-md-8'>
                        <div className='watch-video-comment-box'>
                            <div className='video-box-single-v'>
                                <Card className='shadow-none  overflow-visible'>
                                    <div className='video-box'>

                                        <CardMedia
                                            component="video"
                                            alt="Video Poster"
                                            autoPlay
                                            controls
                                            className='w-100'
                                            poster={allVideo.thumbnail}
                                            muted
                                            onError={(e) => console.error('Video Error:', e)}
                                        >
                                            {allVideo.url && (
                                                <source src={allVideo.url} type="video/mp4" />
                                            )}
                                            Your browser does not support the video tag.
                                        </CardMedia>



                                    </div>
                                    <CardContent >

                                        <div className='content-box'>
                                            <div className='row'>
                                                <div className='col-12'>
                                                    <h1 className='v-tiltle'>
                                                        {allVideo.title}

                                                    </h1>
                                                </div>
                                                <div className='col-lg-12'>



                                                    <Typography variant="body2" color="text.secondary" >
                                                        <div className='row  g-1 align-items-center justify-content-between mt-1'>

                                                            <div className='col-10 col-lg-5 d-flex'>
                                                                <div className='channel-thumbnail'>

                                                                    {
                                                                        allVideo.channelIcon ? (
                                                                            <img src={allVideo.channelIcon} className="rounded-circle  img-fluid" />
                                                                        ) : (
                                                                            <img src={profilePic} className="rounded-circle  img-fluid" />
                                                                        )}
                                                                </div>
                                                                <div className='px-2'>
                                                                    <a href='#' className='channel-name mb-0'>{name ? name : 'Channel name'}</a>
                                                                    <a href='#' className='views-time'><small> {subscriber ? subscriber : '0'} subscribers</small></a>
                                                                </div>

                                                                {token ? (
                                                                    subs ? (
                                                                        <div className="dropdown">
                                                                            <Link href="#" className="d-block caret-none  btn btn-light w-100 rounded-5 px-3 text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                <i class="bi bi-bell"></i>   Subscribed <i class="bi bi-chevron-down"></i>
                                                                            </Link>
                                                                            <ul className="dropdown-menu">
                                                                                <li><Link className="dropdown-item" href="/login"><i class="bi bi-bell-fill me-3"></i>All</Link></li>
                                                                                <li><Link className="dropdown-item" href="/login"><i className="me-3 bi bi-bell"></i> Personalized</Link></li>
                                                                                <li><Link className="dropdown-item" href="/login"><i class="bi bi-bell-slash me-3"></i> None</Link></li>
                                                                                <li><Link className="dropdown-item" href="#" onClick={() => removeSubscriber(chanelId)}><i class="bi bi-person-dash-fill me-3"></i> Unsubscribe</Link></li>
                                                                            </ul>
                                                                        </div>

                                                                    ) : (
                                                                        <button type='button' onClick={() => addSubscriber(chanelId)} className='btn btn-dark rounded-5 px-4'> <small>Subscribe</small></button>
                                                                    )

                                                                ) : (
                                                                    <Link to="../login" className='btn btn-dark rounded-5 px-3'> <small>Subscribe</small></Link>
                                                                )
                                                                }

                                                            </div>

                                                            {token ? (
                                                                <>
                                                                    <div className='col-6 col-lg-2'>
                                                                        <div className='bg-light w-100 rounded-5  d-flex align-items-center justify-content-around'>
                                                                            <button onClick={() => likeMaster(chanelId, 1)} type='button' className='btn btn-light rounded-5 border-0'>
                                                                                <small>
                                                                                    <i class="bi bi-hand-thumbs-up-fill"></i> {like ? like : '0'}
                                                                                </small>
                                                                            </button>
                                                                            <span>|</span>
                                                                            <button onClick={() => likeMaster(chanelId, 2)} type='button' className='btn btn-light rounded-5 border-0'>
                                                                                <small>
                                                                                    <i class="bi bi-hand-thumbs-down"></i> {dlike ? dlike : '0'}
                                                                                </small>
                                                                            </button>
                                                                        </div>

                                                                    </div>

                                                                </>
                                                            ) : (
                                                                <>
                                                                    <div className='col-6 col-lg-2'>
                                                                        <Link to="../login" type='button' className='btn btn-light w-100 rounded-5 px-3'>
                                                                            <small>
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-up-fill" viewBox="0 0 16 16">
                                                                                    <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z" />
                                                                                </svg> {like ? like : '0'}
                                                                            </small>
                                                                        </Link>
                                                                    </div>
                                                                    <div className='col-6 col-lg-2'>
                                                                        <Link to="../login" type='button' className='btn btn-light w-100 rounded-5  '>
                                                                            <small>
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-down" viewBox="0 0 16 16">
                                                                                    <path d="M8.864 15.674c-.956.24-1.843-.484-1.908-1.42-.072-1.05-.23-2.015-.428-2.59-.125-.36-.479-1.012-1.04-1.638-.557-.624-1.282-1.179-2.131-1.41C2.685 8.432 2 7.85 2 7V3c0-.845.682-1.464 1.448-1.546 1.07-.113 1.564-.415 2.068-.723l.048-.029c.272-.166.578-.349.97-.484C6.931.08 7.395 0 8 0h3.5c.937 0 1.599.478 1.934 1.064.164.287.254.607.254.913 0 .152-.023.312-.077.464.201.262.38.577.488.9.11.33.172.762.004 1.15.069.13.12.268.159.403.077.27.113.567.113.856 0 .289-.036.586-.113.856-.035.12-.08.244-.138.363.394.571.418 1.2.234 1.733-.206.592-.682 1.1-1.2 1.272-.847.283-1.803.276-2.516.211a9.877 9.877 0 0 1-.443-.05 9.364 9.364 0 0 1-.062 4.51c-.138.508-.55.848-1.012.964zM11.5 1H8c-.51 0-.863.068-1.14.163-.281.097-.506.229-.776.393l-.04.025c-.555.338-1.198.73-2.49.868-.333.035-.554.29-.554.55V7c0 .255.226.543.62.65 1.095.3 1.977.997 2.614 1.709.635.71 1.064 1.475 1.238 1.977.243.7.407 1.768.482 2.85.025.362.36.595.667.518l.262-.065c.16-.04.258-.144.288-.255a8.34 8.34 0 0 0-.145-4.726.5.5 0 0 1 .595-.643h.003l.014.004.058.013a8.912 8.912 0 0 0 1.036.157c.663.06 1.457.054 2.11-.163.175-.059.45-.301.57-.651.107-.308.087-.67-.266-1.021L12.793 7l.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581 0-.211-.027-.414-.075-.581-.05-.174-.111-.273-.154-.315l-.353-.354.353-.354c.047-.047.109-.176.005-.488a2.224 2.224 0 0 0-.505-.804l-.353-.354.353-.354c.006-.005.041-.05.041-.17a.866.866 0 0 0-.121-.415C12.4 1.272 12.063 1 11.5 1" />
                                                                                </svg>{dlike ? dlike : '0'}
                                                                            </small>
                                                                        </Link>
                                                                    </div>
                                                                </>
                                                            )
                                                            }
                                                            <div className='col-6 col-lg-3 d-flex justify-content-around align-items-center'>
                                                                <button type='button' className='btn btn-light  rounded-5 px-4'>
                                                                    <i className='class="bi bi-share'></i> <small> Share</small>
                                                                </button>

                                                                <div className="dropdown">
                                                                    <Link href="#" className="caret-none  text-decoration-none dropdown-toggle rounded-dots btn btn-light" data-bs-toggle="dropdown" aria-expanded="false">
                                                                        <i class="bi bi-three-dots text-dark"></i>
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
                                                            </div>
                                                        </div>
                                                    </Typography>
                                                    <Typography variant="body3" color="text.secondary" className='bg-secondary'>
                                                        <div className='video-description'>
                                                            <ReadMoreVideoDesc text={description ? description : ''} maxLength={150} />
                                                        </div>
                                                    </Typography>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                        {/* watch-video-comment-box end */}
                        <div className='comment-box-main my-3'>
                            <Card className='p-3'>


                                <div className='d-flex'>
                                    <h3 className='h5 text-light'>{allComment.comments ? allComment.comments.length : 0} Comments</h3>
                                    <div className="dropdown ms-3">
                                        <Link href="#" className="caret-none  text-decoration-none dropdown-toggle text-theme" data-bs-toggle="dropdown" aria-expanded="false">
                                            <strong cla> <i class="bi bi-filter-left"></i> Sort By</strong>
                                        </Link>
                                        <ul className="dropdown-menu">
                                            <li><Link className="dropdown-item" href="/login">Top Comments</Link></li>
                                            <li><Link className="dropdown-item" href="/login"> Newest First</Link></li>
                                        </ul>
                                    </div>
                                </div>

                                <div class="form-floating">
                                    <input type="text" id="inputComment"
                                        value={comments}
                                        onChange={(e) => setComments(e.target.value)}
                                        class="form-control border-2  border-start-0 border-end-0 border-top-0 border-dark" placeholder="Add a comment.." required="" />
                                    <label for="inputComment">Add a comment..</label>
                                </div>
                                <div className='d-flex justify-content-between mt-2'>

                                    <div className=''>
                                        {token ? (
                                            <button type='button' onClick={() => addComment()} className='btn btn-light rounded-5 px-3 ms-2'>Comment</button>
                                        ) : (
                                            <Link to="../login" className='btn btn-light rounded-5 px-3 ms-2'> Comment</Link>
                                        )
                                        }

                                    </div>
                                </div>

                                <div className='comments-list'>



                                    {loadingcomment ? (
                                        <p>Loading Comment...</p>
                                    ) : allComment.comments ? (
                                        allComment.comments.map((comment, index) => (
                                            <div className='single-comment-li'>
                                                <div className='row g-2  mt-1'>
                                                    <div class="col-2 col-lg-1">
                                                        <div className='channel-thumbnail'>
                                                            <img src='../logo192.png' className='w-100' />
                                                        </div>
                                                    </div>
                                                    <div className='col-10 col-lg-11 ps-2 text-light'>
                                                        <a href='#' className='channel-name mb-0 text-secondary'><small>{allComment.users[index].full_name}</small></a>
                                                        <p><small>{comment.comment}</small></p>
                                                        <div className='row justify-content-start'>
                                                            <div className='col-lg-4 '>
                                                                <div className='bg-light d-inline-block rounded-5'>
                                                                    <button onClick={() => likeMaster(chanelId, 1)} type='button' className='btn btn-light rounded-5 border-0'>
                                                                        <small>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-up-fill" viewBox="0 0 16 16">
                                                                                <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z" />
                                                                            </svg> {like ? like : '0'}
                                                                        </small>
                                                                    </button>
                                                                    <span className='text-dark'>|</span>
                                                                    <button onClick={() => likeMaster(chanelId, 2)} type='button' className='btn btn-light rounded-5 border-0'>
                                                                        <small>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-down" viewBox="0 0 16 16">
                                                                                <path d="M8.864 15.674c-.956.24-1.843-.484-1.908-1.42-.072-1.05-.23-2.015-.428-2.59-.125-.36-.479-1.012-1.04-1.638-.557-.624-1.282-1.179-2.131-1.41C2.685 8.432 2 7.85 2 7V3c0-.845.682-1.464 1.448-1.546 1.07-.113 1.564-.415 2.068-.723l.048-.029c.272-.166.578-.349.97-.484C6.931.08 7.395 0 8 0h3.5c.937 0 1.599.478 1.934 1.064.164.287.254.607.254.913 0 .152-.023.312-.077.464.201.262.38.577.488.9.11.33.172.762.004 1.15.069.13.12.268.159.403.077.27.113.567.113.856 0 .289-.036.586-.113.856-.035.12-.08.244-.138.363.394.571.418 1.2.234 1.733-.206.592-.682 1.1-1.2 1.272-.847.283-1.803.276-2.516.211a9.877 9.877 0 0 1-.443-.05 9.364 9.364 0 0 1-.062 4.51c-.138.508-.55.848-1.012.964zM11.5 1H8c-.51 0-.863.068-1.14.163-.281.097-.506.229-.776.393l-.04.025c-.555.338-1.198.73-2.49.868-.333.035-.554.29-.554.55V7c0 .255.226.543.62.65 1.095.3 1.977.997 2.614 1.709.635.71 1.064 1.475 1.238 1.977.243.7.407 1.768.482 2.85.025.362.36.595.667.518l.262-.065c.16-.04.258-.144.288-.255a8.34 8.34 0 0 0-.145-4.726.5.5 0 0 1 .595-.643h.003l.014.004.058.013a8.912 8.912 0 0 0 1.036.157c.663.06 1.457.054 2.11-.163.175-.059.45-.301.57-.651.107-.308.087-.67-.266-1.021L12.793 7l.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581 0-.211-.027-.414-.075-.581-.05-.174-.111-.273-.154-.315l-.353-.354.353-.354c.047-.047.109-.176.005-.488a2.224 2.224 0 0 0-.505-.804l-.353-.354.353-.354c.006-.005.041-.05.041-.17a.866.866 0 0 0-.121-.415C12.4 1.272 12.063 1 11.5 1" />
                                                                            </svg>{dlike ? dlike : '0'}
                                                                        </small>
                                                                    </button>
                                                                </div>

                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No Comment available.</p>
                                    )}
                                    *
                                </div>
                            </Card>
                        </div>
                        {/* comment-box-main end */}
                    </div>
                    <div className='col-md-4'>
                        <div className='row'>

                            <div className='col-lg-12'>

                                {loadingvideoss ? (
                                    <p>Loading Video...</p>
                                ) : allVideos.length && allVideos.length > 0 ? (
                                    allVideos.map((video, index) => (
                                        <div className='video-box-single-h'>
                                            <Card >

                                                <CardContent>
                                                    <div className='row g-2'>
                                                        <div className='col-5'>
                                                            <div className='video-box'>
                                                                <span className='duration-time'>11:11:11</span>
                                                                <div onClick={() => viewVideo(video.videoId, video.playlistCategory)}>
                                                                    <CardMedia
                                                                        component="video"
                                                                        alt="Video Poster"
                                                                        poster={video.thumbnail}
                                                                        className='w-100'
                                                                        muted
                                                                    >
                                                                        <source src={video.url} className='w-100' type="video/mp4" />
                                                                    </CardMedia>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='col-7'>
                                                            <div className='content-box'>
                                                                <div className='row'>
                                                                    <div className='col-12'>
                                                                        <Typography variant="h5" component="div" className='v-tiltle'>
                                                                            <a href='/watch'>{video.title}</a>
                                                                        </Typography>
                                                                        <Typography variant="body2" color="text.secondary">
                                                                            <a href='/channel' className='channel-name'>My Channel</a>
                                                                            <a href='/watch' className='views-time'>{formatViewsCount(video.view)} views <span>.</span> {<TimeAgo date={video.createdAt} />}</a>
                                                                        </Typography>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </CardContent>
                                            </Card>
                                        </div>
                                    ))
                                ) : (
                                    <p>No videos available.</p>
                                )}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default WatchSinglePage
