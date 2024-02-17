import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Avatar, Box } from "@mui/material";
import CustomTableBox from "../../../components/customTableBox/CustomTableBox.jsx";
import { useSidebarContext } from "../../../pages/global/sidebar/sidebarContext.js";
import Header from "../../../components/Header.jsx";
import { useTranslation } from "react-i18next";
import CustomPagenation from "../../../components/CustomPagenation/CustomPagenation.jsx";
import CustomDelete from "../../../components/CutsomDelete/CustomDelete.jsx";
import CustomToolTip from "../../../components/CustomToolTip/customToolTip.jsx";
import hasPermission from "../../../utils/haspermission.js";
import {
  deleteTestimonials,
  fetchTestimonialsDataByPage,
  getTestimonialsData,
  searchTestimonials,
} from "../redux/Testimonials.js";
import CustomInfoLinkButton from "../../../components/CustomInfoLinkButton.jsx";

export const Testimonials = () => {
  const data =
    useSelector((state) => state.testimonials.getTestimonialsData.data) || [];
  const loading = useSelector((state) => state.colors.loading);
  const firstPage = useSelector(
    (state) => state.testimonials.TestimonialsLinks.first
  );
  const nextPage = useSelector(
    (state) => state.testimonials.TestimonialsLinks.next
  );
  const lastPage = useSelector(
    (state) => state.testimonials.TestimonialsLinks.last
  );
  const prevPage = useSelector(
    (state) => state.testimonials.TestimonialsLinks.prev
  );
  const currentPage = useSelector((state) => state.testimonials.currentPage);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { sidebarRTL } = useSidebarContext();
  const [pageSize, SetPageSize] = useState(10);

  const dataRef = useRef(true);
  useEffect(() => {
    dispatch(getTestimonialsData({ pageSize: pageSize }));
  }, [dispatch, pageSize, dataRef]);

  const columns = [
    {
      field: "content",
      headerName: t("content"),
      width:252,

      renderCell: (params) => <CustomToolTip text={params.row.content} />,
    },
    {
      field: "image",
      headerName: t('image'),
      width:252,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => <Avatar src={params.row.image} />,
    },
    {
      field: "user_id",
      headerName: t("userName"),
      width:252,
      renderCell: (params) => <p>{params.row.user_id.name}</p>,
    },

    {
      field: "actions",
      headerName: t("Actions"),
      width:252,
      renderCell: (params) =>
      {
       return(

        <Box sx={{
          display:'flex',
          justifyContent:'space-evenly',
          alignItems:'center',
          gap:'10px',
        }}>
        <CustomInfoLinkButton id={params.row.id} text={t("info")} />

        {hasPermission("delete-testimonial") && (
          <CustomDelete
            action={deleteTestimonials}
            rerenderAction={getTestimonialsData}
            id={params.id}
            pageSize={pageSize}
          />
        )}
        </Box>
       )

      }
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
        <Header title={t("Testimonials")} />
      </Box>
      <CustomTableBox
      action={searchTestimonials}
        tableData={tableData}
        CustomPagenation={
          <CustomPagenation
            action={fetchTestimonialsDataByPage}
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
