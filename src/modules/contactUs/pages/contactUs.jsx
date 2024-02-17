import { Box } from "@mui/material";
// import { Box, useTheme } from '@mui/material';
import { useEffect } from "react";
import Header from "../../../components/Header.jsx";
import CustomTableBox from "../../../components/customTableBox/CustomTableBox.jsx";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  deleteContactUs,
  fetchContactUsDataByPage,
  getContactUs,
} from "../redux/contact_us.js";
import CustomPagenation from "../../../components/CustomPagenation/CustomPagenation.jsx";
import ScrollDialog from "../../../components/info_component/info.jsx";
import hasPermission from "../../../utils/haspermission.js";
import CustomDelete from "./../../../components/CutsomDelete/CustomDelete";
import CustomInfoLinkButton from "../../../components/CustomInfoLinkButton.jsx";
import useMainHooks from "./../../../hooks/useMainHooks";
const ContactUs = () => {
  const { t, dispatch } = useMainHooks();
  const contact = useSelector((state) => state.contactUs.contactUs.data) || [];
  const currentPage = useSelector((state) => state.contactUs.currentPage);
  const next = useSelector((state) => state.contactUs.contactLinks.next);
  const first = useSelector((state) => state.contactUs.contactLinks.first);
  const prev = useSelector((state) => state.contactUs.contactLinks.prev);
  const last = useSelector((state) => state.contactUs.contactLinks.last);
  const loading = useSelector((state) => state.contactUs.loading);
  const [pageSize, setPageSize] = useState(10);

  const columns = [
    { field: "id", headerName: t("id"), width:150 },
    {
      field: "name",
      headerName: t("Name"),
      width:220,
      //   cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: t("email"),
      width:250,
      cellClassName: "name-column--cell",
    },
    {
      field: "phone",
      headerName: t("phone"),
      width:220,
      headerAlign: "center",
      cellClassName: "super-app-theme--header",
    },
    {
      field: "Message",
      headerAlign: "center",
      headerName: t("Message"),
      width:300,
      renderCell: (params) => {
        hasPermission("all-contact_us") && (
          <ScrollDialog
            id={params.id}
            message={params.row.message}
            name={params.row.name}
            phone={params.row.phone}
          />
        );
      },
    },
    {
      field: "actions",
      headerName: t("Actions"),
      width: 200,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            gap: "10px",
            width: "100%",
          }}
        >
          {/* <Link to={`info/${params.row.id}`}>
            <CustomButton color={'white'} backGround={'blue'}  text={t('info')}/>
          </Link> */}
          <CustomInfoLinkButton id={params.row.id} text={t("info")} />
          <CustomDelete
            action={deleteContactUs}
            rerenderAction={getContactUs}
            id={params.id}
            pageSize={pageSize}
          />
        </Box>
      ),
    },
  ];

  const tableData = {
    pageSize: pageSize,
    rows: contact,
    loading: loading,
    columns: columns,
    onPageSizeChange: (newPageSize) => setPageSize(newPageSize),
  };

  useEffect(() => {
    dispatch(getContactUs(pageSize));
  }, [dispatch, pageSize]);

  return (
    <Box m={2}>
      <Header title={t("contact-us")} />
      <CustomTableBox
        tableData={tableData}
        CustomPagenation={
          <CustomPagenation
            nextPage={next}
            firstPage={first}
            prevPage={prev}
            lastPage={last}
            currentPage={currentPage}
            pageSize={pageSize}
            action={fetchContactUsDataByPage}
          />
        }
      />
    </Box>
  );
};

export default ContactUs;
