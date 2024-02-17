import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Header from "../../../components/Header.jsx";
import { useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditCar from "./EditCar.jsx";
import CustomTableBox from "../../../components/customTableBox/CustomTableBox.jsx";
import CustomPagenation from "../../../components/CustomPagenation/CustomPagenation.jsx";
import CustomDelete from "../../../components/CutsomDelete/CustomDelete.jsx";
import AddCar from "./AddCar.jsx";
import {
  SearchCars,
  deleteCars,
  fetchCarsDataByPage,
  getCarsData,
} from "../../car/redux/cars.js";
import CustomToolTip from "../../../components/CustomToolTip/customToolTip.jsx";
import hasPermission from "../../../utils/haspermission.js";
import useMainHooks from "../../../hooks/useMainHooks.jsx";

const CarsTable = () => {
  const nextPage = useSelector((state) => state.cars.carsLinks.next);
  const lastPage = useSelector((state) => state.cars.carsLinks.last);
  const prevPage = useSelector((state) => state.cars.carsLinks.prev);
  const currentPage = useSelector((state) => state.cars.currentPage);
  const firstPage = useSelector((state) => state.cars.carsLinks.first);
  const [pageSize, setPageSize] = useState(10);
  const { t, sidebarRTL, dispatch, colors } = useMainHooks();
  const loading = useSelector((state) => state.cars.loading);
  const data = useSelector((state) => state.cars.carsData.data || []);
  const [examId, setExamId] = useState();
  let info = { pageSize: pageSize };

  const columns = [
    { field: "id", headerName: t("ID"), width: 200 },
    {
      field: "name",
      headerName: t("Name"),
      width: 200,
      cellClassName: "name-column--cell",
    },
    {
      field: "brand",
      headerName: t("brand"),
      width: 200,
      cellClassName: "name-column--cell",
      renderCell: (params) => <CustomToolTip text={params.row.brand.name} />,
    },

    {
      field: "actions",
      headerName: t("Actions"),
      width: 200,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            flexDirection: sidebarRTL
              ? "row-reverse !important"
              : "row !important",
            alignItems: "center",
          }}
        >
          {hasPermission("update-car") && (
            <EditCar
              sx={{
                backGround: `${colors.grey[600]}`,
              }}
              id={params.id}
              icon={<EditIcon />}
              name={params.row.name}
              brand_id={params.row.brand.id}
            />
          )}
          {hasPermission("delete-car") && (
            <CustomDelete
              sx={{
                background: `${colors.redAccent[600]}`,
              }}
              icon={<DeleteIcon />}
              id={params.id}
              action={deleteCars}
              pageSize={pageSize}
              rerenderAction={getCarsData}
            />
          )}
        </Box>
      ),
    },
  ];
  const tableData = {
    rows: data.length > 0 && data,
    columns: columns,
    loading: loading,
    pageSize: pageSize,
    onPageSizeChange: (newPageSize) => setPageSize(newPageSize),
  };
  useEffect(() => {
    dispatch(getCarsData(info));
  }, [dispatch, pageSize]);
  return (
    <Box m="20px">
      <Box
        display="flex"
        dir={sidebarRTL ? "rtl" : "ltr"}
        justifyContent="space-between"
        alignItems="center"
      >
        <Header title={t("cars")} />
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        flexDirection={sidebarRTL ? "row" : "row-reverse"}
      >
        {hasPermission("store-car") && (
          <AddCar exam_id={examId} pageSize={pageSize} />
        )}
      </Box>
      <CustomTableBox
        tableData={tableData}
        action={SearchCars}
        CustomPagenation={
          <CustomPagenation
            pageSize={pageSize}
            nextPage={nextPage}
            lastPage={lastPage}
            prevPage={prevPage}
            currentPage={currentPage}
            firstPage={firstPage}
            action={fetchCarsDataByPage}
          />
        }
      />
    </Box>
  );
};
export default CarsTable;
