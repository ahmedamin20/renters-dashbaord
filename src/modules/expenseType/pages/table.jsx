import React, { useState, useEffect } from "react";
import { Box, ButtonGroup, useTheme } from "@mui/material";
import { tokens } from "../../../theme.js";
import AddIcon from "@mui/icons-material/Add";
import Header from "../../../components/Header.jsx";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useSidebarContext } from "../../../pages/global/sidebar/sidebarContext.js";
import CustomTableBox from "../../../components/customTableBox/CustomTableBox.jsx";
import CustomPagenation from "../../../components/CustomPagenation/CustomPagenation.jsx";
import {
  deleteTypeExpensess,
  fetchTypeExpensessByPage,
  getSearchTypeExpensess,
  getTypeExpensess,
} from "../redux/TypeExpensess.js";
import AddTypeExpensess from "./addTypeExpensess.jsx";
import CustomDelete from "../../../components/CutsomDelete/CustomDelete.jsx";
import EditTypeExpensess from "./EditTypeExpensess.jsx";
import hasPermission from "../../../utils/haspermission.js";

const TypeExpensessTable = () => {
  const nextPage = useSelector(
    (state) => state.typeExpensess.typeExpensesLinks.next
  );
  const lastPage = useSelector(
    (state) => state.typeExpensess.typeExpensesLinks.last
  );
  const prevPage = useSelector(
    (state) => state.typeExpensess.typeExpensesLinks.prev
  );
  const firstPage = useSelector(
    (state) => state.typeExpensess.typeExpensesLinks.first
  );
  const currentPage = useSelector((state) => state.typeExpensess.currentPage);

  // const permission =
  //   useSelector((state) => state.user.userInfo.data.permissions) || [];
  const { t } = useTranslation();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [pageSize, setPageSize] = useState(10);
  const dispatch = useDispatch();

  const { sidebarRTL } = useSidebarContext();

  useEffect(() => {
    dispatch(getTypeExpensess({ pageSize }));
  }, [dispatch, pageSize]);

  const data =
    useSelector((state) => state.typeExpensess.typeExpensessData.data) || [];
  const loading = useSelector((state) => state?.typeExpensess?.loading);

  const columns = [
    { field: "id", headerName: t("ID"), width: 200 },
    {
      field: "name",
      headerName: t("Name"),
      width:400,
      cellClassName: "name-column--cell",
    },

    {
      field: "actions",
      headerName: t("Actions"),
      width:400,
      renderCell: (params) => (
        <ButtonGroup
          sx={{
            display: "flex",
            flexDirection: sidebarRTL
              ? "row-reverse !important"
              : "row !important",
            alignItems: "center",
          }}
        >
          {hasPermission("update-expense_type") && (
            <EditTypeExpensess
              sx={{
                background: `${colors.primary[600]}`,
                m: 4,
              }}
              id={params.id}
              icon={<EditIcon />}
              pageSize={pageSize}
            />
          )}
          {hasPermission("delete-expense_type") && (
            <CustomDelete
              id={params.id}
              pageSize={pageSize}
              action={deleteTypeExpensess}
              rerenderAction={getTypeExpensess}
            />
          )}
        </ButtonGroup>
      ),
    },
  ];
  const tableData = {
    rows: data.length > 0 && data,
    columns: columns,
    loading: loading === true,
    pageSize: pageSize,
    onPageSizeChange: (newPageSize) => setPageSize(newPageSize),
  };
  return (
    <Box m="20px">
      <Box
        flexDirection={sidebarRTL ? "row-reverse" : "row"}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Header title={t("TypeExpensess")} />
        {hasPermission("store-expense_type") && (
          <AddTypeExpensess pageSize={pageSize} icon={<AddIcon />} />
        )}
      </Box>
      <CustomTableBox
        tableData={tableData}
        action={getSearchTypeExpensess}
        CustomPagenation={
          <CustomPagenation
            pageSize={pageSize}
            nextPage={nextPage}
            lastPage={lastPage}
            prevPage={prevPage}
            firstPage={firstPage}
            currentPage={currentPage}
            action={fetchTypeExpensessByPage}
          />
        }
      />
    </Box>
  );
};
export default TypeExpensessTable;
