import React from 'react'
import CustomLable from '../../../components/CustomLable.jsx'
import { Box } from '@mui/material'

const SmallBox = (props) => {
    return (
        <Box>
            <CustomLable title={props.title} />
            <span style={{background:props.background,fontWeight:"bold",fontSize:"16px",border:"1px solid grey",borderRadius:".2rem",padding:".5rem",margin:".5rem"}}>{props.data}</span>
        </Box>
    )
}

export default SmallBox