// @ts-nocheck
'use client'
import { theme} from '@/theme/index'
import { Box, Typography } from '@mui/material'
import React from 'react'
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

type CardBoardProps ={
    Icon:any
    total:number
    unit:string
}

function Cardboard({Icon,total,unit}:CardBoardProps) {
  return (
    <Box bgcolor={theme.palette.secondary.main} p={3} width='100%' borderRadius={5}>
        <Box display='flex' justifyContent='end'>
        <Icon sx={{ fontSize: 40, color:'#ffffff'}}/>
        
        </Box>
 
        <Box display='flex' alignItems='baseline' gap={1}>
        <Typography variant="h3" color='#ffffff' >{total}</Typography>
    <Typography variant="h6" color='#ffffff' >{unit}</Typography>
        </Box>

    </Box>
  )
}

export default Cardboard