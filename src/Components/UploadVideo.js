import React, { useState, useEffect } from 'react';
import IcoUpload from "../assets/icons/uploadIco.svg";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import video1 from '../assets/videos/video-1.mp4';
import img1 from '../assets/images/thumnail-1.jpg';
import img2 from '../assets/images/thumnail-2.jpg';
import axios from 'axios';
import { https as makeHttps } from "../AuthUser";
import './Loader.css';

function UploadVideo() {

  const navigate = useNavigate();
  const http=makeHttps();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(true);
  const [uploadedfilename, setuploadedfilename] = useState('');
  const [uploadedvideo, setuploadedvideo] = useState('');

  const [selectedFile, setselectedFile] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  const [selectedFile1, setselectedFile1] = useState('');
  const [isPlaying1, setIsPlaying1] = useState(false);
  const [uploadedthumbnail, setuploadedthumbnail] = useState('');
  const [videotype, setvideotype] = useState(1);
  
  

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);
  const [playlistCategory, setPlaylistCategory] = useState('');
  const [madeForKids, setMadeForKids] = useState(true);
  const [restrictToAdults, setRestrictToAdults] = useState(true);
  const [videoCategories, setVideoCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const [showModal, setShowModal] = useState(true);

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






const handleFileChanges = async (event) => {
         
        const selectedFile12 = event.target.files[0];
        
       
         try {
            const FILENAME_TO_UPLOAD = selectedFile12.name;
            const formData = new FormData();
            formData.append('fileToUpload', selectedFile12);
            const response = await axios.post('https://nexaipay.com/video/upload.php', formData, {
            });

            if(response.data.status==1){
                setselectedFile1(selectedFile12);
                const banner='https://nexaipay.com/video/uploads/'+FILENAME_TO_UPLOAD;
                setuploadedthumbnail(banner);
            } else {
                alert(response.data.message);
            }

           

        } catch (error) {
            console.error('Error uploading file:', error.message);
        } 
    }

const handleFileChange = async (event) => {
  const selectedFile = event.target.files[0];
  setselectedFile(selectedFile);


  if (!selectedFile) {
    alert('Please choose a file to upload.');
    return;
  }

  try {
    

    const FILENAME_TO_UPLOAD = selectedFile.name;



    setIsUploading(true);
    // const REGION = ''; // Uppercase region code
    // const BASE_HOSTNAME = 'storage.bunnycdn.com';
    // const HOSTNAME = !REGION ? BASE_HOSTNAME : `${REGION}.${BASE_HOSTNAME}`;
    // const STORAGE_ZONE_NAME = 'kbtubevideos/video';
    
    // const ACCESS_KEY = 'c8a32ad0-5cd7-4c16-892f2e7f13d4-6117-4546';
    // setuploadedfilename(FILENAME_TO_UPLOAD);
    // const url = `https://${HOSTNAME}/${STORAGE_ZONE_NAME}/${FILENAME_TO_UPLOAD}`;

    // const formData = new FormData();
    // formData.append('video', selectedFile);

    // const response = await axios.put(url, formData, {
    //   headers: {
    //     'AccessKey': ACCESS_KEY,
    //     'Content-Type': 'application/octet-stream',
    //   },
    // });

   

    // if (response.data.Message === 'File uploaded.') {
    //   const setuploadedvideos='https://kbtube.b-cdn.net/video/'+FILENAME_TO_UPLOAD;
    //   setuploadedvideo(setuploadedvideos);
    //   setIsPlaying(true);
    //   setUploadSuccess(false);


    // } else {
    //   setUploadSuccess(true);
    // }


     const formData = new FormData();
        formData.append('fileToUpload', selectedFile);
        const response = await axios.post('https://kbtube.com/api/video/video1.php', formData, {});

     
    if (response.data.status === 1) {
      const setuploadedvideos=response.data.url;
      setuploadedvideo(setuploadedvideos);
      setIsPlaying(true);
      setUploadSuccess(false);


    } else {
      setUploadSuccess(true);
    }

  } catch (error) {
    console.error('Error uploading file:', error.message);
  } finally {
    setIsUploading(false);
  }
};





   

  const handleMadeForKidsChange = (event) => {
    setMadeForKids(event.target.value === 'yes');
  };

  const handleRestrictToAdultsChange = (event) => {
    setRestrictToAdults(event.target.value === 'yes');
  };


  const tokens= sessionStorage.getItem("token");
 
  const token =  tokens?tokens.replace(/"/g, ''):'';
 

   
  const handleSubmit = async (event) => {
    
    try {

      const formData={
          "title":title,
          "description":description,
          "url":uploadedvideo,
          "playlistCategory":playlistCategory,
          "restrictToAdults":restrictToAdults,
          "madeForKids":madeForKids,
          "thumbnail":uploadedthumbnail,
          "token":token,
          "type":videotype
      }

    


    const response = await http.post('/user/uploadVideo/', formData);

    console.log('video',response);
    if (response.data.status === 1) {
      //navigate('channel/');
      //videoUpload modal Dissmiss hear
       window.location.href='channel/';
      setShowModal(false);
    } else {
      alert('not success');
    }
  }
  catch (error) {
   alert('error');
  }
  }


  return (

   
    
    <>
   
     <div
        className={`modal fade ${showModal ? 'fade show' : ''}`}
        id="videoUpload"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="videoUploadLabel"
        aria-hidden={!showModal}
        style={{display:'none'}}
      >
              <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
             
                <div className={`overlay ${isUploading ? 'd-flex align-items-center justify-content-center' : 'd-none'}`}>
                  <div className="spinner-container">
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only"></span>
                    </div>
                  </div>
                </div>


             
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="videoUploadLabel">Upload videos</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            {/* remove d-none class after upload */}
            <div  className={`modal-body text-center ${uploadSuccess ? 'd-flex align-items-center justify-content-center' : 'd-none'}`}>
              <div className='row justify-content-center'>
             
                  <div className='col-lg-5'>
                    <div className="video-upload-btn bg-gray">
                      <label className="input-group-text" htmlFor="inputGroupFile012">
                        <img src={IcoUpload} alt="UploadCloudIcon" className="m-auto w-25" />
                        <span>Tap to Upload Video</span>
                      </label>
                      <input type="file" className="form-control" id="inputGroupFile012" name="file" onChange={handleFileChange} />
                    </div>
                  </div>
                  <div className='col-12 mt-3'>
                    <p><small>Your videos will be private until you publish them.</small></p>
                  </div>
                   
                    <div className='mt-5'>
                        <p><small>By submitting your videos to kbtube, you acknowledge that you agree to kbtube's <Link className='text-white' to="/terms">Terms of Service</Link> and <Link className='text-white' to="/terms">Community Guidelines. </Link> 
                           Please be sure not to violate others' copyright or privacy rights. <Link className='text-white' to="/terms"> Learn more</Link></small></p>
                    </div>
              </div>
            </div>

            {/* add d-none and remove d-block class after upload */}
            
            <div className={`modal-body  ${uploadSuccess ? 'd-none':'d-flex align-items-center justify-content-center'}`}>
                <div className="row">
                  <div className="col-lg-8">
                     <h3 className="h5">Details</h3>
                    <div className="form-floating">
                      <textarea
                        className="form-control mb-3"
                        placeholder="Title"
                        id="floatingTextarea2"
                        style={{ height: '80px' }}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      ></textarea>
                      <label htmlFor="floatingTextarea2">Title (Required)</label>
                    </div>
                    <div className="box">
                     
                      <div className="form-floating mb-3">
                        <textarea
                          className="form-control"
                          placeholder="Tell viewers about your video"
                          id="floatingTextarea3"
                          style={{ height: '120px' }}
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                        <label htmlFor="floatingTextarea3">Description (Required) </label>
                      </div>
                    </div>
                    <div className="box">
                      <h4 className="h6">Thumbnail</h4>
                      <p>
                        <small>Select or upload a picture that shows what's in your video. A good thumbnail stands out and draws viewers' attention.</small>
                      </p>
                      <div className="row align-items-start g-3">
                        <div className="col-lg-4 col-12">
                          <div className="video-upload-btn">
                            <label className="input-group-text" htmlFor="inputGroupFile019" style={{ height: '118.58px' }}>
                              <img src={IcoUpload} alt="UploadCloudIcon" className="m-auto" width={20} />
                              <span>Upload Thumbnail</span>
                            </label>
                            <input type="file" className="form-control" id="inputGroupFile019" name="file2" onChange={handleFileChanges} />
                          </div>
                        </div>
                        {selectedFile1 ? (
                        <div className='col-lg-4 col-6'>
                            <input type="radio" class="btn-check" name="Thumbnail" id="Thumbnail1" autocomplete="off" checked />
                            <label class="btn btn-outline-secondary" for="Thumbnail1"><img src={URL.createObjectURL(selectedFile1)} alt="UploadCloudIcon" className="m-auto w-100" /></label>
                        </div>
                        ) : (
                          <div className='col-lg-4 col-6'></div>
                        )
                       
                        }
                      </div>
                    </div>
                    <div className="box mt-3">
                      <h3 className="h5">Select All Fields</h3>
                      
                       <div className="form-floating">
                          {loadingCategories ? (
                            <p>Loading categories...</p>
                          ) : (
                            <select
                              className="form-select"
                              id="floatingSelect"
                              aria-label="Floating label select example"
                              value={playlistCategory}
                              onChange={(e) => setPlaylistCategory(e.target.value)}
                            >
                              <option value="">--Select Category--</option>
                              {videoCategories.map((category) => (
                                <option key={category.categoryId} value={category.categoryId}>
                                  {category.category}
                                </option>
                              ))}
                            </select>
                          )}
                          <label htmlFor="floatingSelect">Selects playlist Category</label>
                        </div>
                    </div>

                    <div className="box mt-3">
                    
                       <div className="form-floating">
                         
                            <select
                              className="form-select"
                              id="floatingSelect"
                              aria-label="Floating label select example"
                              value={videotype}
                              onChange={(e) => setvideotype(e.target.value)}
                            >
                              <option value="1">Long Video</option>
                              <option value="2">Short Video</option>
                             
                            </select>
                       
                          <label htmlFor="floatingSelect">Selects playlist Category</label>
                        </div>
                    </div>


                    <div className="box mt-2">
                      <h3 className="h5">Audience</h3>
                      <p>
                        <strong>Is this video made for kids? (required)</strong>
                      </p>
                      {/* ... */}
                      <div className="form-check">
                        <input
                          className="form-check-input border-dark"
                          type="radio"
                          name="madeForKids"
                          id="madeForKidsYes"
                          value="yes"
                          checked={madeForKids}
                          onChange={handleMadeForKidsChange}
                        />
                        <label className="form-check-label" htmlFor="madeForKidsYes">
                          Yes, it's made for kids.
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input border-dark"
                          type="radio"
                          name="madeForKids"
                          id="madeForKidsNo"
                          value="no"
                          checked={!madeForKids}
                          onChange={handleMadeForKidsChange}
                        />
                        <label className="form-check-label" htmlFor="madeForKidsNo">
                          No, it's not made for kids
                        </label>
                      </div>
                      {/* ... */}
                      <p className="mt-2">
                        <strong>Do you want to restrict your video to an adult audience?</strong>
                      </p>
                      {/* ... */}
                      <div className="form-check">
                        <input
                          className="form-check-input border-dark"
                          type="radio"
                          name="restrictToAdults"
                          id="restrictToAdultsYes"
                          value="yes"
                          checked={restrictToAdults}
                          onChange={handleRestrictToAdultsChange}
                        />
                        <label className="form-check-label" htmlFor="restrictToAdultsYes">
                          Yes, restrict my video to viewers over 18
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input border-dark"
                          type="radio"
                          name="restrictToAdults"
                          id="restrictToAdultsNo"
                          value="no"
                          checked={!restrictToAdults}
                          onChange={handleRestrictToAdultsChange}
                        />
                        <label className="form-check-label" htmlFor="restrictToAdultsNo">
                          No, don't restrict my video to viewers over 18 only
                        </label>
                      </div>
                      {/* ... */}
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="video-box-single-v rounded-0 sticky-lg-top pt-3">
                      <Card className="rounded-0">
                  
                    <div className="video-player">
                      {selectedFile ? (
                        <Card className="rounded-0">
                          <CardMedia
                            component="video"
                            alt="Video Poster"
                            autoPlay={isPlaying}
                            controls
                            className="w-100"
                            muted
                          >
                            <source src={URL.createObjectURL(selectedFile)} type="video/mp4" />
                          </CardMedia>
                        </Card>
                      ) : (
                        <div className="video-upload-btn">
                          <label className="input-group-text" htmlFor="inputGroupFile01" style={{ height: '118.58px' }}>
                            <img src={IcoUpload} alt="UploadCloudIcon" className="m-auto" width={20} />
                            <span>Upload Video</span>
                          </label>
                          <input type="file" className="form-control" id="inputGroupFile01" name="file" accept="video/*" />
                        </div>
                      )}
                    </div>
  


                      </Card>
                      <div className="input-group my-3">
                        <label className="w-100">
                          <small>Video Link</small>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={uploadedvideo}
                          placeholder="https://kbtube.com/dfsdf"
                          readOnly
                        />
                        <span className="input-group-text" id="basic-addon2">
                          Copy
                        </span>
                      </div>
                      <div className="input-group mb-3">
                        <label className="w-100">
                          <small>Filename</small>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={uploadedfilename}
                          placeholder="https://kbtube.com/asfasdfaf"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                </div>
            </div>
            <div className="modal-footer">
              <button type="button" onClick={handleSubmit} className="btn btn-light rounded-5 px-4">Next</button>
            </div>

          
          </div>
        </div>
      </div>
     
    </>
  )
}

export default UploadVideo