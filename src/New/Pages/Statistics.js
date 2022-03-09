import * as React from 'react';
import ResponsiveAppBarAfterLogin from "../ResponsiveAppBarAfterLogin";

const Statistics = ({realUser, signUserOut}) => {
  return (
    <>
      <ResponsiveAppBarAfterLogin realUser={realUser} signUserOut={signUserOut}/>

    </>
  )
}

export default Statistics