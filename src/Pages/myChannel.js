import React, { useState, useEffect } from 'react';
import Sidebar from '../Components/Sidebar'
import { Link } from 'react-router-dom'
import UploadVideo from '../Components/UploadVideo'
import profilePic from "../assets/images/profile-pic.jpg";
import { authHttps } from "../AuthUser";
import axios from 'axios';



function Customization() {
    const http=authHttps();


    const [name, setName] = useState('');
    const [handel, setHandel] = useState('');
    const [description, setDescription] = useState('');
    const [contact, setContact] = useState('');
    const [photo, setPhoto] = useState('');
    const [banner, setBanner] = useState('');



    const [selectedFile, setselectedFile] = useState('');
    const [selectedFile1, setselectedFile1] = useState('');

     const fetchChannel = async () => {
        try {
            const response = await http.post('user/myChanel');
            console.log(response);
            if (response.data && response.data.status===1) {

                setName(response.data.data.name);
                setHandel(response.data.data.url);
                setDescription(response.data.data.description);
                setContact(response.data.data.name);
                setPhoto(response.data.data.photo);
                setBanner(response.data.data.banner);
            
            } 
        } catch (error) {
            console.error('Error fetching Channel:', error);
        } 
        };


        useEffect(() => {
        fetchChannel();
        }, []);
   
    const handleFileChange = async (event) => {
        const selectedFile = event.target.files[0];
       

        try {
            const FILENAME_TO_UPLOAD = selectedFile.name;
            const formData = new FormData();
            formData.append('fileToUpload', selectedFile);
            const response = await axios.post('https://nexaipay.com/video/upload.php', formData, {
            });

            if(response.data.status===1){
                setselectedFile(selectedFile);
                const channel='https://nexaipay.com/video/uploads/'+FILENAME_TO_UPLOAD;
                setPhoto(channel);
            } else {
                alert(response.data.message);
            }

           

        } catch (error) {
            console.error('Error uploading file:', error.message);
        } 
    }

    const handleFileChanges1 = async (event) => {
         
        const selectedFile12 = event.target.files[0];
        
       
         try {
            const FILENAME_TO_UPLOAD = selectedFile12.name;
            const formData = new FormData();
            formData.append('fileToUpload', selectedFile12);
            const response = await axios.post('https://nexaipay.com/video/upload.php', formData, {
            });

            if(response.data.status===1){
                setselectedFile1(selectedFile12);
                const banner='https://nexaipay.com/video/uploads/'+FILENAME_TO_UPLOAD;
                setBanner(banner);
            } else {
                alert(response.data.message);
            }

           

        } catch (error) {
            console.error('Error uploading file:', error.message);
        } 
    }




    
    const publishChange = async (event) => {
    try {
            const response = await http.post('user/createChanel',{
                "name":name,
                "contact":contact,
                "description":description,
                "photo":photo,
                "banner":banner,
                "subscriber":0,
                "url":handel
            });

            if (response.data.status===1) {
                window.location.href='./customization';
            } else {
                alert('not success')
            }
        } catch (error) {
            console.error('Error fetching video categories:', error);
        } 
    };



  

  return (
    <>
      <div className='home-sidebar d-none d-lg-block'>
        <Sidebar />
      </div>
      <div className='contain-right-box'>
        <div className='container'>
          <div className='row g-2'>
            <div className='col-lg-7'>
              <h1 className='h5'>Channel Customization</h1>
            </div>
           
          </div>
          <div className='row'>
            <div className='col-lg-12'>
              <div className='profile-box'>

                <div className='row'>
                  <div className='col-12 theme-tabs'>
                    <nav>
                      <div class="nav nav-tabs mb-3" id="nav-tab" role="tablist">
                        <button class="nav-link" id="nav-Basic-tab" data-bs-toggle="tab" data-bs-target="#nav-Basic" type="button" role="tab" aria-controls="nav-Basic" aria-selected="false">Basic info</button>
                        <button class="nav-link" id="nav-Branding-tab" data-bs-toggle="tab" data-bs-target="#nav-Branding" type="button" role="tab" aria-controls="nav-Branding" aria-selected="false">Branding</button>
                        
                      </div>
                    </nav>
                    <div class="tab-content" id="nav-tabContent">
                    
                      <div class="tab-pane fade" id="nav-Branding" role="tabpanel" aria-labelledby="nav-Branding-tab">
                        <div className='row'>
                          <div className='col-lg-9'>
                            <div className='box'>
                              <h3 className='h5'>Picture </h3>
                              <p><small>Your profile picture will appear where your channel is presented on YouTube, like next to your videos and comments</small></p>
                              <div className='row align-items-center'>
                                <div className='col-lg-4'>
                                  <div className='bg-light text-center p-3'>
                                    <div className='profile-pic-box rounded-circle m-auto'>
                                        {selectedFile ? (
                                            <img src={URL.createObjectURL(selectedFile)} className="rounded-circle  img-fluid" />
                                        ) : (
                                            photo ? (
                                                <img src={photo} className="rounded-circle  img-fluid" />
                                            ) : (
                                                 <img src={profilePic} className="rounded-circle  img-fluid" />
                                            )
                                            
                                        )}
                                      
                                    </div>
                                  </div>
                                </div>
                                <div className='col-lg-8'>
                                  <p><small>It’s recommended to use a picture that’s at least 98 x 98 pixels and 4MB or less. Use a PNG or GIF (no animations) file. Make sure your picture follows the YouTube Community Guidelines. </small></p>
                                  <div className="video-upload-btn w-50">
                                    <label className="input-group-text h-auto" for="inputGroupFile011">
                                      <span className='text-primary'>Upload</span></label>
                                    <input type="file" className="form-control" id="inputGroupFile011"  accept=".png, .jpg, .jpeg, .gif" name="file" onChange={handleFileChange}/>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className='box mt-3'>
                              <h3 className='h5'>Banner image </h3>
                              <p><small>This image will appear across the top of your channel</small></p>
                              <div className='row align-items-center'>
                                <div className='col-lg-4'>
                                  <div className='bg-light text-center p-3'>
                                    <div className='profile-pic-box  m-auto'>

                                      {selectedFile1 ? (
                                            <img src={URL.createObjectURL(selectedFile1)} className="img-fluid" />
                                        ) : (
                                            banner ? (
                                                <img src={banner} className="img-fluid" />
                                            ) : (
                                                 <img src={profilePic} className="img-fluid" />
                                            )
                                        )}
                                    </div>
                                  </div>
                                </div>
                                 <div className='col-lg-8'>
                                  <p><small>It’s recommended to use a picture that’s at least 98 x 98 pixels and 4MB or less. Use a PNG or GIF (no animations) file. Make sure your picture follows the YouTube Community Guidelines. </small></p>
                                  <div className="video-upload-btn w-50">
                                    <label className="input-group-text h-auto" for="inputGroupFile013">
                                      <span className='text-primary'>Upload</span></label>
                                    <input type="file" className="form-control" id="inputGroupFile013"  accept=".png, .jpg, .jpeg, .gif" name="file" onChange={handleFileChanges1}/>
                                  </div>
                                </div>



                                  
                              </div>
                               <button type='button' style={{float:'right'}} onClick={publishChange} className='btn btn-success rounded-0 px-3 pull-right' >PUBLISH</button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="tab-pane fade show active" id="nav-Basic" role="tabpanel" aria-labelledby="nav-Basic-tab">
                        <div className='row'>
                          <div className='col-lg-9'>
                            <div className='box mb-3'>
                              <h3 className='h6'>Name</h3>
                              <p><small>Choose a channel name that represents you and your content. Changes made to your name and picture are visible only on YouTube and not other Google services. You can change your name twice in 14 days. </small></p>
                              <div className="form-group">
                                <input 
                                    type="text" 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="form-control" 
                                    id="ChannelName" 
                                    placeholder="Enter your Channel Name *" 
                                />
                              </div>
                            </div>
                            <div className='box mb-3'>
                              <h3 className='h6'>Handle</h3>
                              <p><small>Choose a channel name that represents you and your content. Changes made to your name and picture are visible only on YouTube and not other Google services. You can change your name twice in 14 days.</small></p>
                              <div className="form-group">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    value={handel}
                                    onChange={(e) => setHandel(e.target.value)}
                                    id="uChannelName" 
                                    placeholder="Enter your Channel Name *" 
                                />
                              </div>
                              <p><small>url: https://www.youtube.com/@azsm-dfas4</small></p>
                            </div>
                            <div className='box mb-3'>
                              <h3 className='h6'>Description</h3>
                              <div className="form-group">
                                <textarea 
                                type="text" 
                                className="form-control" 
                                id="uChannelName" 
                                placeholder="Enter your Channel Name *"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                 ></textarea>
                              </div>
                            </div>
                          
                            <div className='box mb-3'>
                              <h3 className='h6'>Contact info</h3>
                              <p><small>Choose a channel name that represents you and your content. Changes made to your name and picture are visible only on YouTube and not other Google services. You can change your name twice in 14 days. </small></p>
                              <div className="form-group">
                                <input type="text" 
                                className="form-control" 
                                id="EMail" 
                                placeholder="Enter your EMail *" 
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                                />
                              </div>
                            </div>

                             <button type='button' style={{float:'right'}} onClick={publishChange} className='btn btn-success rounded-0 px-3 pull-right' >PUBLISH</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
     
      </div>
      <UploadVideo />
    </>
  )
}

export default Customization