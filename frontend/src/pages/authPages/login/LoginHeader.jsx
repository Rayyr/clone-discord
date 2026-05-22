import React from "react";
import { Typography } from "@mui/material";

function LoginHeader() {
  return (
    <>
      <Typography variant="h5" sx={{color:"white"}}>
       Wellcome Back
      </Typography>

         <Typography variant="h6" sx={{color:"#b9bbbe"}}>
       We are happy that you are with us ! 
      </Typography>
    </>
  );
}

export default LoginHeader;
