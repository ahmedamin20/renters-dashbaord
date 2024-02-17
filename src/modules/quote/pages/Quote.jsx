import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, useTheme } from "@mui/material";
import CustomTableBox from "../../../components/customTableBox/CustomTableBox.jsx";
import { useSidebarContext } from "../../../pages/global/sidebar/sidebarContext.js";
import Header from "../../../components/Header.jsx";
import { useTranslation } from "react-i18next";
import CustomPagenation from "../../../components/CustomPagenation/CustomPagenation.jsx";
import CustomDelete from "../../../components/CutsomDelete/CustomDelete.jsx";
import { tokens } from "../../../theme.js";
import CustomToolTip from "../../../components/CustomToolTip/customToolTip.jsx";
import {
  QuoteData,
  deleteQuote,
  fetchQuotesDataByPage,
  searchQuote,
} from "../redux/Quote.js";
import hasPermission from "../../../utils/haspermission.js";
import CustomInfoLinkButton from "../../../components/CustomInfoLinkButton.jsx";

export const Quote = () => {
  const data = useSelector((state) => state.Quote.getQuoteData.data) || [];
  const loading = useSelector((state) => state.colors.loading);
  const firstPage = useSelector((state) => state.Quote.QuoteLinks.first);
  const nextPage = useSelector((state) => state.Quote.QuoteLinks.next);
  const lastPage = useSelector((state) => state.Quote.QuoteLinks.last);
  const prevPage = useSelector((state) => state.Quote.QuoteLinks.prev);
  const currentPage = useSelector((state) => state.Quote.currentPage);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { sidebarRTL } = useSidebarContext();
  const [pageSize, SetPageSize] = useState(10);
  useEffect(() => {
    dispatch(QuoteData({ pageSize: pageSize }));
  }, [dispatch, data == []]);

  const columns = [
    {
      field: "id",
      headerName: t("id"),
      width: 120,

      renderCell: (params) => <CustomToolTip text={params.row.id} />,
    },
    {
      field: "name",
      headerName: t("name"),
      width: 200,

      renderCell: (params) => <CustomToolTip text={params.row.name} />,
    },
    {
      field: "email",
      headerName: t("email"),
      width: 200,

      renderCell: (params) => <CustomToolTip text={params.row.email} />,
    },
    {
      field: "message",
      headerName: t("message"),
      width: 300,

      renderCell: (params) => <CustomToolTip text={params.row.message} />,
    },
    {
      field: "mobile",
      headerName: t("mobile"),
      width: 300,
      align: "center",
      renderCell: (params) => <CustomToolTip text={params.row.mobile} />,
    },
    {
      field: "actions",
      headerName: t("Actions"),
      width: 200,
      renderCell: (params) =>(
        <Box sx={{
          display:'flex',
          justifyContent:'space-evenly',
          alignItems:'center',
          gap:'10px',
        }}>
          <CustomInfoLinkButton id={params.row.id} text={t("info")} />
       { hasPermission("delete-quote") && (
          <CustomDelete
            sx={{
              background: `${colors.redAccent[600]}`,
            }}
            action={deleteQuote}
            rerenderAction={QuoteData}
            id={params.id}
            pageSize={pageSize}
          />
          )}
        </Box>
          )

    },
  ];

  const tableData = {
    rows: data.length > 0 && data,
    pageSize: pageSize,
    columns: columns,
    loading: loading,
    onPageSizeChange: (newPageSize) => SetPageSize(newPageSize),
  };
  return (
    <Box m={2}>
      <Box
        flexDirection={sidebarRTL ? "row-reverse" : "row"}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Header title={t("Quotes")} />
      </Box>
      <CustomTableBox
        tableData={tableData}
        action={searchQuote}
        CustomPagenation={
          <CustomPagenation
            action={fetchQuotesDataByPage}
            firstPage={firstPage}
            nextPage={nextPage}
            lastPage={lastPage}
            prevPage={prevPage}
            currentPage={currentPage}
            pageSize={pageSize}
          />
        }
      />
    </Box>
  );
};