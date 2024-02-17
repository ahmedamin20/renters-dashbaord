
import { Box, useTheme } from '@mui/material';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { tokens } from '../../../theme.js';
import { useTranslation } from 'react-i18next';
import Fab from '@mui/material/Fab';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import LastPageIcon from '@mui/icons-material/LastPage';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import { fetchRolesDataByPage } from '../redux/responsibility.js';
const Pagenation = (props) => {
    const { t } = useTranslation()
    const nextPage = useSelector(state => state.roles.RolesLinks.next)
    const lastPage = useSelector(state => state.roles.RolesLinks.last)
    const prevPage = useSelector(state => state.roles.RolesLinks.prev)
    const currentPage = useSelector(state => state.roles.currentPage)
    const firstPage = useSelector(state => state.roles.RolesLinks.first)
    const dispatch = useDispatch()
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const handleNextPage = () => {
        const info = {
            state: nextPage,
            pageSize: props.pageSize,
        }
        dispatch(fetchRolesDataByPage(info)); // This action will update the currentPage and fetch the data
    };
    const handlePrevPage = () => {
        const info = {
            state: prevPage,
            pageSize: props.pageSize,
        }
        dispatch(fetchRolesDataByPage(info)); // This action will update the currentPage and fetch the data
    };
    const handleLastPage = () => {
        const info = {
            state: lastPage,
            pageSize: props.pageSize,
        }
        dispatch(fetchRolesDataByPage(info)); // This action will update the currentPage and fetch the data
    };
    const handleFirstPage = () => {
        const info = {
            state: firstPage,
            pageSize: props.pageSize,
        }
        dispatch(fetchRolesDataByPage(info)); // This action will update the currentPage and fetch the data
    };


    return (
        <Box margin="1rem">
            <Fab variant="extended" button="true" Button disabled={currentPage === 1 ? true : false} sx={{ backgroundColor: `${colors.blueAccent[600]}`,  fontSize:"20px",color: "white", margin: ".2rem" }} onClick={handleFirstPage} color="primary" aria-label="add">
                <FirstPageIcon sx={{ mr: 1 }} />
                {t("First")}
            </Fab>
            <Fab variant="extended" button="true" disabled={prevPage === null ? true : false} sx={{ backgroundColor: `${colors.blueAccent[600]}`,  fontSize:"20px",color: "white", margin: ".2rem" }} onClick={handlePrevPage} color="primary" aria-label="add">
                <NavigateBeforeIcon sx={{ mr: 1 }} />
                {t("Previous")}
            </Fab>
            <span style={{ margin: ".5rem" }}>{currentPage}</span>
            <Fab variant="extended" button="true" disabled={nextPage === null ? true : false} sx={{ backgroundColor: `${colors.blueAccent[600]}`,  fontSize:"20px",color: "white", margin: ".2rem" }} onClick={handleNextPage} color="primary" aria-label="add">
                {t("Next")}
                <NavigateNextIcon sx={{ mr: 1 }} />
            </Fab>
            <Fab variant="extended" button="true" disabled={nextPage === null ? true : false} sx={{ backgroundColor: `${colors.blueAccent[600]}`,  fontSize:"20px",color: "white", margin: ".2rem" }} onClick={handleLastPage} color="primary" aria-label="add">
                {t("Last")}
                <LastPageIcon sx={{ mr: 1 }} />
            </Fab>
        </Box>
    )
}

export default Pagenation

