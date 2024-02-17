import { useState, useEffect } from "react";
import { Avatar, Box } from "@mui/material";
import Header from "../../../components/Header.jsx";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector } from "react-redux";
import {
  deleteBrand,
  fetchBrandsDataByPage,
  getBrands,
  searchBrand,
} from "../redux/brands.js";
import CustomDelete from "../../../components/CutsomDelete/CustomDelete.jsx";
import AddBrand from "./addBrand.jsx";
import EditBrand from "./EditBrand.jsx";
import CustomTableBox from "../../../components/customTableBox/CustomTableBox.jsx";
import CustomPagenation from "../../../components/CustomPagenation/CustomPagenation.jsx";
import hasPermission from "../../../utils/haspermission.js";
import useMainHooks from "../../../hooks/useMainHooks.jsx";

const BrandsTable = () => {
  const firstPage = useSelector((state) => state.brands.brandsLinks.first);
  const nextPage = useSelector((state) => state.brands.brandsLinks.next);
  const lastPage = useSelector((state) => state.brands.brandsLinks.last);
  const prevPage = useSelector((state) => state.brands.brandsLinks.prev);
  const currentPage = useSelector((state) => state.brands.currentPage);
  const { t, sidebarRTL, colors, dispatch } = useMainHooks();
  const [pageSize, setPageSize] = useState(10);
  const data = useSelector((state) => state.brands.brandsData.data) || [];
  useEffect(() => {
    dispatch(getBrands({ pageSize: pageSize }));
  }, [dispatch, pageSize]);

  
  const columns = [
    { field: "id", headerName: t("ID"), width:150 },
    {
      field: "name",
      headerName: t("Name"),
      width:300,
      cellClassName: "name-column--cell",
    },
    {
      field: "image",
      headerName: t("image"),
      width:200,
      height: 200,
      renderCell: (params) => <Avatar alt={t("logo")} src={params.row.image} />,
    },
    {
      field: "actions",
      headerName: t("Actions"),
      width:580,
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
          {hasPermission("update-brand") && (
            <EditBrand
              sx={{
                background: `${colors.primary[600]}`,
                m: 4,
              }}
              id={params.row.id}
              pageSize={pageSize}
              name={params.row.name}
              img={params.row.image}
              icon={<EditIcon />}
            />
          )}
          {hasPermission("delete-brand") && (
            <CustomDelete
              sx={{
                background: `${colors.redAccent[600]}`,
              }}
              id={params.row.id}
              action={deleteBrand}
              rerenderAction={getBrands}
              pageSize={pageSize}
              icon={<DeleteForeverIcon />}
            />
          )}
        </Box>
      ),
    },
  ];

  const tableData = {
    rows: data,
    loading: !data,
    pageSize: pageSize,
    onPageSizeChange: (newPageSize) => setPageSize(newPageSize),
    columns: columns,
  };

  return (
    <Box m="20px">
      <Box
        display="flex"
        flexDirection={sidebarRTL ? "row-reverse" : "row"}
        justifyContent="space-between"
        alignItems="center"
      >
        <Header title={t("brands")} />
        {hasPermission("store-brand") && <AddBrand pageSize={pageSize} />}
      </Box>
      <CustomTableBox
        tableData={tableData}
        action={searchBrand}
        CustomPagenation={
          <CustomPagenation
            action={fetchBrandsDataByPage}
            currentPage={currentPage}
            prevPage={prevPage}
            nextPage={nextPage}
            lastPage={lastPage}
            firstPage={firstPage}
          />
        }
      />
    </Box>
  );
};
export default BrandsTable;
