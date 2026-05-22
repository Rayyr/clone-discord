 import React from 'react';
 import Button from "@mui/material/Button";



  function CustomPrimaryButton({label,AdditionalStyle,disabled,onClick}) {
  return (
    <Button  
    variant="contained"
    sx={{
        bgcolor:"#5865f2",
        color:"white",
        textTransform:"none",
        fontSize:"16px",
        width:"100%",
        height:"40px",
          "&.Mui-disabled": {
    backgroundColor: "#B9BBBE",
    color: "black"
  }
    }}
    style ={AdditionalStyle?AdditionalStyle:{}}
  disabled={disabled}
  onClick={onClick}
  >
        {label}
        </Button>
  );
}

export default CustomPrimaryButton;
