import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../Components/Sidebar'
import { useNavigate } from 'react-router-dom';
import profilePic from "../assets/images/profile-pic.jpg";
import ImgCreateVideo from '../assets/images/channel-create.png';
import VideoListVerticalCard from '../Components/VideoListVerticalCard';
import { authHttps,getToken } from "../AuthUser";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import video1 from '../assets/videos/video-1.mp4';
import img3 from '../assets/images/thumnail-3.jpg';
import { formatDistanceToNow } from 'date-fns';

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

function Channel() {

    const http=authHttps();
    const token=getToken();

    const [allVideo, setallVideo] = useState([]);
    const [loadingvideos, setloadingvideos] = useState(true);
    const [name, setName] = useState('Channel Name');
    const [handel, setHandel] = useState('N/A');
    const [description, setDescription] = useState('');
    const [contact, setContact] = useState('');
    const [photo, setPhoto] = useState('');
    const [banner, setBanner] = useState('');
    const [subscriber, setsubscriber] = useState(0);
    



  const navigate = useNavigate();

  const viewVideo = async (videoId,catid) => {
    localStorage.setItem('videoId', videoId);
    localStorage.setItem('catid', catid);
    await http.post('user/addView',{'videoId':videoId});
    navigate('../watch');
  };

   

 const fetchVideo = async () => {
  try {
    const response = await http.post('user/userWiseVideo');
    if (response.data && response.data.data) {
      console.log('allvideo', response.data.data);
      setallVideo(response.data.data);
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
 

  const fetchChannel = async () => {
        try {
            const response = await http.post('user/myChanel');
            console.log(response);
            if (response.data && response.data.status==1) {

                setName(response.data.data.name);
                setHandel(response.data.data.url);
                setDescription(response.data.data.description);
                setContact(response.data.data.name);
                setPhoto(response.data.data.photo);
                setBanner(response.data.data.banner);
                setsubscriber(response.data.data.subscriber);
            
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
            <div className='home-sidebar d-none d-lg-block'>
                <Sidebar />
            </div>
            <div className='contain-right-box'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-8'>
                            <div className='profile-box video-box-single-h '>
                                <div className='row g-3 align-items-center'>
                                    <div className='col-lg-3'>
                                        <div className='profile-pic-box rounded-circle bg-white '>
                                            {
                                            photo ? (
                                                <img src={photo} className="rounded-circle  img-fluid" />
                                            ) : (
                                                 <img src={profilePic} className="rounded-circle  img-fluid" />
                                            )}
                                        </div>
                                    </div>
                                    <div className='col-lg-9'>
                                        <div className='content-box'>
                                            <Link to='/channel' className='text-light'> 
                                            
                                            {
                                            name ? (
                                                name
                                            ) : (
                                                name
                                            )}
                                             </Link>
                                            <div className='channel-name'>
                                                <Link to='/channel' className='text-theme'> @{handel} </Link>
                                                <span className='text-secondary'>{subscriber} Subscriber</span> <span>.</span> <span className='text-secondary'>3 videos</span>
                                                <p className='mt-1'><Link href='/channel' className='text-secondary'> {description} </Link></p>
                                            </div>
                                            <div className='d-flex gap-2'>
                                                <Link to="/customization" className="btn btn-light  rounded-5 px-3"><small>Customization</small></Link>
                                                <Link to="/manage-videos" className="btn btn-light  rounded-5 px-3"><small>Mannage Videos</small></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* top channer profile  row end */}
                    <div className='border-top my-3'></div>
                    <div className='row'>
                        <div className='col-12 theme-tabs'>
                            <nav >
                                <div className="nav nav-tabs mb-3" id="nav-tab" role="tablist">
                                    <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Home</button>
                                    <button className="nav-link" id="nav-videos-tab" data-bs-toggle="tab" data-bs-target="#nav-videos" type="button" role="tab" aria-controls="nav-videos" aria-selected="false">Videos</button>
                                    <button className="nav-link" id="nav-playlist-tab" data-bs-toggle="tab" data-bs-target="#nav-playlist" type="button" role="tab" aria-controls="nav-playlist" aria-selected="false">PlayList</button>
                                </div>
                            </nav>
                            <div className="tab-content" id="nav-tabContent">
                                <div className="tab-pane fade active show" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                    <div className='row g-3'>

                                       
                                              


                                        {loadingvideos ? (
                                            <p>Loading Video...</p>
                                      ) : allVideo.length > 0 ? (
                                            allVideo.map((video, index) => (
                                            <div className='col-lg-3'>
                                                    <div className='video-box-single-v'>
                                                        <Card className='shadow-none'>
                                                            <div className='video-box'>
                                                                <span className='duration-time'>11:11:11</span>
                                                                <div onClick={() => viewVideo(video.videoId,video.playlistCategory)}>
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
                                                            <CardContent>
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
                                                            </CardContent>
                                                        </Card>
                                                    </div>
                                                </div> 
                                            ))
                                        ) : (
                                            <p>No videos available.</p>
                                        )}
                                    </div>
           
                                </div>
                                <div className="tab-pane fade" id="nav-videos" role="tabpanel" aria-labelledby="nav-videos-tab">
                                   
                                </div>
                                <div className="tab-pane fade" id="nav-playlist" role="tabpanel" aria-labelledby="nav-playlist-tab">
                                   
                                </div>
                            </div>
                        </div>
                        {/* show when there are no video */}
                        <div className='col-lg-12 text-center'>
                            <div className='border-top my-3'></div>
                            <div className='box  '>
                                <img src={ImgCreateVideo} className='img-fuid w-25' />
                                <h2 className='h5 my-2'>Create content on any device</h2>
                                <p className='w-50 m-auto '>Upload and record at home or on the go. Everything you make public will appear here.</p>
                                <button type='button' className="btn btn-dark rounded-4 px-5 mt-3" data-bs-toggle="modal" data-bs-target="#videoUpload" >Create </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Channel