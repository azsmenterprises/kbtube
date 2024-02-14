
import './App.css';
import Header from './Components/Header';

import { Route, Routes } from "react-router-dom";
import Home from './Pages/Home';
import WatchSinglePage from './Pages/WatchSinglePage';
import Login from './Pages/Login';
import LikedVideos from './Pages/LikedVideos';
import HistoryVideos from './Pages/HistoryVideos';
import WatchLaterVideos from './Pages/WatchLaterVideos';
import Profile from './Pages/Profile';
import Channel from './Pages/Channel';
import MyChannel from './Pages/myChannel';
import Footer from './Components/Footer';
import VideoDetails from './Pages/VideoDetails';
import { getToken } from "./AuthUser";
import Signout from './Pages/Signout';
import ShortsVideo from './Pages/ShortsVideo';
import Subscriptions from './Pages/Subscriptions';
import Trending from './Pages/Trending';
import Sidebar from './Components/Sidebar';

function App() {

  
    let token=getToken(); 
    if(token){}
    
      return (
        <>
          <Header />
        
          <main className='main'>
              <Routes>
                  <Route exact path="/" element={<Home />}></Route>
                  <Route exact path="/create-channel" element={<MyChannel />}></Route>
                  <Route exact path="/watch" element={<WatchSinglePage />}></Route>
                  <Route exact path="/trending" element={<Trending />}></Route>
                  <Route exact path="/login" element={<Login />}></Route>
                  <Route exact path="/signout" element={<Signout />}></Route>
                  <Route exact path="/liked-videos" element={<LikedVideos />}></Route>
                  <Route exact path="/history-videos" element={<HistoryVideos />}></Route>
                  <Route exact path="/watch-later-videos" element={<WatchLaterVideos />}></Route>
                  <Route exact path="/profile" element={<Profile />}></Route>
                  <Route exact path="/channel" element={<Channel />}></Route>
                  <Route exact path="/details" element={<VideoDetails />}></Route>
                  <Route exact path="/customization" element={<MyChannel />}></Route>
                  <Route exact path="/shorts" element={<ShortsVideo />}></Route>
                  <Route exact path="/subscriptions" element={<Subscriptions />}></Route>
              </Routes>
          </main>
      <Footer />
        </>
      );
  
}
export default App;
