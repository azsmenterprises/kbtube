import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import WatchSinglePage from './Pages/WatchSinglePage';
import Login from './Pages/Login';
import LikedVideos from './Pages/LikedVideos';
import HistoryVideos from './Pages/HistoryVideos';
import WatchLaterVideos from './Pages/WatchLaterVideos';
import Profile from './Pages/Profile';
import Channel from './Pages/Channel';
import VideoDetails from './Pages/VideoDetails';
import Customization from './Pages/Customization';
import Home from "./Pages/Home";



const AllRoute = ({ userData }) => {
  // let basename = "/";

  return (
      <Routes>
        <Route
          element={<Layout userData={userData} />} // Use Layout as the main layout
        >
          <Route index path="/" element={<Home userData={userData} />} />
          <Route exact path="/watch" element={<WatchSinglePage userData={userData} />}></Route>
          <Route exact path="/login" element={<Login userData={userData} />}></Route>
          <Route exact path="/liked-videos" element={<LikedVideos userData={userData} />}></Route>
          <Route exact path="/history-videos" element={<HistoryVideos userData={userData} />}></Route>
          <Route exact path="/watch-later-videos" element={<WatchLaterVideos userData={userData} />}></Route>
          <Route exact path="/profile" element={<Profile userData={userData} />}></Route>
          <Route exact path="/channel" element={<Channel userData={userData} />}></Route>
          <Route exact path="/details" element={<VideoDetails userData={userData} />}></Route>
          <Route exact path="/customization" element={<Customization userData={userData} />}></Route>
       </Route>
      </Routes>
  );
};

export default AllRoute;