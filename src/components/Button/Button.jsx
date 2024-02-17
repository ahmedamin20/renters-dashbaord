import { Button, useTheme } from '@mui/material';
import { tokens } from '../../theme';
const CustomButton = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Button variant={props.variant||"outlined"} onClick={props.handleClick} endIcon={props.icon} sx={{
            backgroundColor: props.backGround||colors.blueAccent[700],
            color: props.color || colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
        }}
        >
            {props.text}
        </Button>
    )
}

export default CustomButton
