 import React from 'react';
 import { Typography } from '@mui/material';
import {fontWeight, styled} from "@mui/system";


 const RedirectText=styled("span")({
    color:"#5865F2",
    fontWeight:500,
    cursor:"pointer"
 });


  function RedirectInfo({text,redirectText,additionalStyles,redirectHandler }) {
  return (
   <Typography
   sx={{color:"#72767d"}}
   style={additionalStyles?additionalStyles:{}}
   variant='subtitle2'
   >
    {text}
     <RedirectText onClick={redirectHandler} >{redirectText} </RedirectText>
   </Typography>
  );
}

export default RedirectInfo;
