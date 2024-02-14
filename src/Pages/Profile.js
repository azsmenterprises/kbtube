import React, { useEffect, useState } from "react";
import profilePic from "../assets/images/profile-pic.jpg";
import Sidebar from "../Components/Sidebar";
function Profile() {

    return (
        <>
            <div className='home-sidebar d-none d-lg-block'>
                <Sidebar />
            </div>
            <div className='contain-right-box p-0'>
                <div className="content-registration pt-3 bg-dark ">
                    <div className="container">
                        <div className='row g-3' >
                            <div className='col-lg-4 text-center'>
                                <div className="rounded-4 shadow bg-gray p-3 mb-3">
                                    <div className="profile-pic-box rounded-circle  m-auto">
                                        <img src={profilePic} className="rounded-circle  img-fluid" />
                                    </div>
                                    <h1 className="h4 mt-3">User Full  Name </h1>
                                </div>
                                <div className='rounded-4 shadow bg-gray text-start'>
                                    <form className="d-block p-4">
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" id="Fname" placeholder="Enter your First Name *" />
                                            <label for="Fname">First Name</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" id="Lname" placeholder="Enter your Last Name" />
                                            <label for="Lname">Last Name</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input type="email" autocomplete="off" className="form-control" id="EmailId" value="name@example.com" placeholder="E.g., name@example.com *" readOnly />
                                            <label for="EmailId">Email address</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input type="tel" autocomplete="off" className="form-control" id="PhoneNo" value="9876543210" placeholder="E.g., 9876543210 *" />
                                            <label for="EmailId">Phone No.</label>
                                        </div>
                                        <div class="form-group mb-3">
                                            <label><small>Upload/change Profile photo</small></label>
                                            <input type="file" class="form-control" name="phone" id="profilePic" placeholder="Enter Your Mobile Number" required="" />
                                        </div>

                                        <button className="w-100 btn btn-lg btn-primary rounded-5 " type="submit">Update</button>

                                    </form>
                                </div>
                            </div>
                            <div className='col-lg-4'>
                                <div className="content-top  mb-3">
                                    <h2 class="h4 text-center">
                                        <span >Change Password</span>
                                    </h2>
                                </div>
                                <div className='rounded-4 shadow bg-gray login-form-box'>
                                    <form className="d-block p-4">


                                        <div className="form-floating mb-3">
                                            <input type="password" className="form-control" id="Password" value="98766" placeholder="Enter Your Old Password*" />
                                            <label for="Password">Old Password</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input type="password" className="form-control" id="Password" value="98766" placeholder="Enter Your New Password*" />
                                            <label for="Password">New Password</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input type="password" className="form-control" id="Password" value="98766" placeholder="Enter Your Confirm Password*" />
                                            <label for="Password">Confirm Password</label>
                                        </div>


                                        <button className="w-100  btn btn-lg btn-primary rounded-5 " type="submit">Update</button>

                                    </form>
                                </div>
                            </div>
                            <div className='col-lg-4'>
                                <div className="content-top  mb-3">
                                    <h2 class="h4  text-center">
                                        <span>Updated Address</span>
                                    </h2>
                                </div>
                                <div className='rounded-4 shadow bg-gray login-form-box'>
                                    <form className="p-4">
                                        <div class="form-group">
                                            <select class="form-select py-3" name="country" id="country">
                                                <option>--Select Country--</option>
                                                <option>India</option>
                                            </select>
                                        </div>
                                        <div class="form-group mt-3">
                                            <select class="form-select py-3" name="state" id="state">
                                                <option>--Select State--</option>
                                                <option>Karnatka</option>
                                            </select>
                                        </div>
                                        <div class="form-group mt-3">
                                            <select class="form-select py-3" name="city" id="city">
                                                <option>--Select City--</option>
                                                <option>Bengalure</option>
                                            </select>
                                        </div>
                                        <div class="form-group mt-3">
                                            <textarea class="form-control" name="address1" id="address1" placeholder="Default Address" required=""></textarea>
                                        </div>

                                        <button className="w-100  btn btn-lg btn-primary rounded-5 mt-3 " type="submit">Update</button>


                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Profile