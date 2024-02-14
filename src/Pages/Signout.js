import React, { useEffect, useState } from "react";



function Signout() {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('user')
    window.location.href='./';
     
        
  

  return (

        
        <>
           
        </>
    )
}

export default Signout