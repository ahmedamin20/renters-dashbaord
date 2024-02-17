import { Link } from "react-router-dom";
import { Button } from '@mui/material';



export default function CustomInfoLinkButton(props){

    return(
        <Link to={`info/${props.id}`}>
            <Button variant="contained" sx={{
                background:'blue',
                color:'white',
            }}>
                {props.text}
            </Button>
      </Link>
    )
}