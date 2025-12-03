// @ts-nocheck
import { Box, Button, Divider, Typography } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { theme } from '@/theme/index';
function RecommendBox({rec,removeItem,id,type}) {
  return (
    <Box>
    <Box p={2} display='flex' justifyContent='space-between'>
       <Typography variant="body1" color="black">{rec}</Typography>
       <Button onClick={()=>{removeItem(id,type)}}>
       <CloseIcon color='error'/>
       </Button>
       
    </Box>
    <Divider/>
            </Box>
  )
}

export default RecommendBox