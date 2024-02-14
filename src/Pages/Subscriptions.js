import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import img3 from '../assets/images/thumnail-3.jpg';
import profilePic from "../assets/images/profile-pic.jpg";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import video1 from '../assets/videos/video-1.mp4';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { https as makeHttps } from "../AuthUser";
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';
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

function Subscriptions() {
   const http = makeHttps();

   const [allVideo, setallVideo] = useState([]);
   const [loadingvideos, setloadingvideos] = useState(true);
   const navigate = useNavigate();
   const [photo, setPhoto] = useState('');
   const viewVideo = async (videoId, catid) => {
      localStorage.setItem('videoId', videoId);
      localStorage.setItem('catid', catid);
      await http.post('user/addView', { 'videoId': videoId });
      navigate('../watch');
   };

   const getVideo = async (categoryId) => {
      try {
         const response = await http.post('user/categoryWiseVideo', { 'categoryId': categoryId });
         if (response.data && response.data.data) {
            setallVideo(response.data.data);
            setPhoto(response.data.data.photo);
         } else {
            console.error('Invalid data structure received from the API:', response.data);
         }
      } catch (error) {
         console.error('Error fetching video categories:', error);
      } finally {
         setloadingvideos(false);
      }
   };

   const fetchVideo = async () => {
      try {
         setloadingvideos(true); // Set loading to true when starting the fetch

         const searchkey = localStorage.getItem('searchkey');
         const endpoint = searchkey ? 'user/searchVideo' : 'user/subscriptions';
         const requestData = searchkey ? searchkey : '';

         const response = await http.post(endpoint, { 'searchkey': requestData });

         if (response.data && response.data.data) {
            setallVideo(response.data.data);
            localStorage.removeItem('searchkey');
         } else {
            console.error('Invalid data structure received from the API:', response.data);
         }
      } catch (error) {
         console.error('Error fetching video categories:', error);
      } finally {
         setloadingvideos(false); // Set loading to false regardless of success or error
      }
   };

   useEffect(() => {
      fetchVideo();
   }, []); // Run the effect only once on component mount



   const [videoCategories, setVideoCategories] = useState([]);
   const [loadingCategories, setLoadingCategories] = useState(true);

   useEffect(() => {
      // Fetch video categories
      const fetchVideoCategories = async () => {
         try {
            const response = await http.post('user/videoCategory');

            if (response.data) {
               // Make sure response.data is an array before setting it to state
               setVideoCategories(response.data.data);
            } else {
               console.error('Invalid data structure received from the API:', response.data);
            }
         } catch (error) {
            console.error('Error fetching video categories:', error);
         } finally {
            setLoadingCategories(false);
         }
      };

      fetchVideoCategories();
   }, []);

   return (
      <>
         <div className='home-sidebar d-none d-lg-block'>
            <Sidebar />
         </div>
         <div className='contain-right-box pt-3'>
            <div className='d-flex justify-content-between align-items-center px-1'>
                <h2 className='h3'>Latest</h2>
                <Link href="#" className='text-decoration-none'><strong>Manage</strong></Link>
            </div>
            <div className='row g-3'>

               {loadingvideos ? (
                  <p>Loading Video...</p>
               ) : allVideo.length > 0 ? (
                  allVideo.map((video, index) => (
                     <div className='col-lg-4'>
                        <div className='video-box-single-v with-action'>
                           <Card className='shadow-none'>
                              <div className='video-box cursor-pointer'>
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
                              <CardContent>

                                 <div className='content-box'>
                                    <div className='row align-items-start g-0'>
                                       <div class="col-2">
                                          <div className='channel-thumbnail'>

                                             {
                                                photo ? (
                                                   <img src={photo} className="rounded-circle  img-fluid" />
                                                ) : (
                                                   <img src={profilePic} className="rounded-circle  img-fluid" />
                                                )}
                                          </div>
                                       </div>
                                       <div className='col-9'>
                                          <Typography variant="h5" component="div" className='v-tiltle'>
                                             <Link href='#' onClick={() => viewVideo(video.videoId, video.playlistCategory)}>{video.title} </Link>
                                          </Typography>
                                          <Typography variant="body2" color="text.secondary">
                                             <Link href='/channel' className='channel-name mt-2'>My Channel</Link>
                                             <Link href='/watch' className='views-time'>{formatViewsCount(video.view)} views <span>.</span> {<TimeAgo date={video.createdAt} />}</Link>
                                          </Typography>
                                       </div>
                                       <div className='col-1'>
                                          <div className="dropdown text-end">
                                             <a href="#" className="d-block caret-none  text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                <i class="bi bi-three-dots-vertical"></i>
                                             </a>
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
            <h2 className='h4 mt-3'><i class="bi bi-file-play text-primary"></i> Shorts</h2>
            <div className='row g-3'>

               {loadingvideos ? (
                  <p>Loading Video...</p>
               ) : allVideo.length > 0 ? (
                  allVideo.map((video, index) => (
                     <div className='col-lg-3'>
                        <div className='video-box-single-v with-action'>
                           <Card className='shorts-card shadow-none'>
                              <div className='video-box cursor-pointer'>
                                 <span className='duration-time'>11:11:11</span>
                                 <div onClick={() => viewVideo(video.videoId, video.playlistCategory)}>
                                    <CardMedia
                                       component="video"
                                       alt="Video Poster"
                                       // poster={video.thumbnail}
                                       className='w-100'
                                       muted
                                       controls
                                    >
                                       <source src={video.url} className='w-100' type="video/mp4" />
                                    </CardMedia>
                                 </div>
                              </div>
                              <CardContent>

                                 <div className='content-box'>
                                    <div className='row align-items-start g-0'>

                                       <div className='col-11'>
                                          <Typography variant="h5" component="div" className='v-tiltle'>
                                             {/* <Link href='/watch'>{video.title}</Link> */}

                                             <Link href='/watch'>{video.title} </Link>
                                          </Typography>
                                          <Typography variant="body2" color="text.secondary">
                                             <Link href='/watch' className='views-time mt-2'>{formatViewsCount(video.view)} views </Link>
                                          </Typography>
                                       </div>
                                       <div className='col-1'>
                                          <div className="dropdown text-end">
                                             <a href="#" className="d-block caret-none  text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                                   <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                                                </svg>
                                             </a>
                                             <ul className="dropdown-menu">
                                                <li><Link className="dropdown-item" href="/login"><i className="me-3 bi bi-share"></i> Share</Link></li>
                                                <li><Link className="dropdown-item" href="/login"><i class="bi bi-send me-3"></i> Feedback</Link></li>

                                             </ul>
                                          </div>
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

      </>
   )
}
export default Subscriptions
