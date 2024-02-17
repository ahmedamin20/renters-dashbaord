import { Box } from '@mui/material'
import React from 'react'

const Card = ({Children}) => {
return (
    <Box sx={{borderRadius:".5rem", border:"2px solid grey",padding:"1rem"}}>
        {Children}
    </Box>
    )
}

export default Card