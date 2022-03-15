import * as React from 'react';
import ProfileChangeDisplayName from "./ProfileChangeDisplayName";
import ProfileDisplayName from "./ProfileDisplayName";
import Box from "@mui/material/Box";
import ProfileChangeEmail from "./ProfileChangeEmail";
import ProfileChangePassword from "./ProfileChangePassword";


const Profile = ({realUser}) => {

  return (
    <>
      <Box >


        <ProfileDisplayName realUser={realUser}/>

        <ProfileChangeDisplayName realUser={realUser}/>

        <ProfileChangeEmail realUser={realUser}/>

        <ProfileChangePassword realUser={realUser}/>

      </Box>




    </>
  )
}

export default Profile