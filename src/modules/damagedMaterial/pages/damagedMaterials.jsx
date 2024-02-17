import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import CustomTableBox from "../../../components/customTableBox/CustomTableBox.jsx";
import { useSidebarContext } from "../../../pages/global/sidebar/sidebarContext.js";
import Header from "../../../components/Header.jsx";
import { useTranslation } from "react-i18next";
import CustomPagenation from "../../../components/CustomPagenation/CustomPagenation.jsx";
import CustomToolTip from "../../../components/CustomToolTip/customToolTip.jsx";
import {
  fetchDamagedMaterialsDataByPage,
  getDamagedMaterials,
  searchDamagedMaterials,
} from "../redux/DamagedMaterials.js";
import AddDamagedMaterials from "./addDamagedMaterials.jsx";
import CustomDate from "../../../components/CustomDate/CustomDate.jsx";

const DamagedMaterials = () => {
  const [dateFilter, setDateFilter] = useState("");
  const data =
    useSelector((state) => state.damagedMaterials.damagedMaterialsData?.data) ||
    [];
  const loading = useSelector((state) => state.storeHouse.loading);
  const firstPage = useSelector(
    (state) => state.damagedMaterials.damagedMaterialsLinks.first
  );
  const nextPage = useSelector(
    (state) => state.damagedMaterials.damagedMaterialsLinks.next
  );
  const lastPage = useSelector(
    (state) => state.damagedMaterials.damagedMaterialsLinks.last
  );
  const prevPage = useSelector(
    (state) => state.damagedMaterials.damagedMaterialsLinks.prev
  );
  const currentPage = useSelector(
    (state) => state.damagedMaterials.currentPage
  );
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { sidebarRTL } = useSidebarContext();
  const [pageSize, SetPageSize] = useState(10);
  useEffect(() => {
    dispatch(
      getDamagedMaterials({ pageSize: pageSize, dateFilter: dateFilter })
    );
  }, [dispatch, pageSize, dateFilter]);

  const columns = [
    {
      field: "product",
      headerName: t("product"),
      width: 400,
      cellClassName: "name-column--cell",
      renderCell: (params) => <CustomToolTip text={params.row.product.name} />,
    },
    {
      field: "storehouse",
      headerName: t("storehouse"),
      cellClassName: "name-column--cell",
      width: 400,
      renderCell: (params) => (
        <CustomToolTip text={params.row.storehouse.name} />
      ),
    },
    {
      field: "quantity",
      headerName: t("quantity"),
      width: 300,
      renderCell: (params) => <CustomToolTip text={params.row.quantity} />,
    },
    {
      field: "created_at",
      headerName: t("created_at"),
      width: 300,
      renderCell: (params) => <CustomToolTip text={params.row.created_at} />,
    },
  ];

  const tableData = {
    rows: data && data,
    pageSize: pageSize,
    columns: columns,
    loading: loading,
    onPageSizeChange: (newPageSize) => SetPageSize(newPageSize),
  };
  const handleDateFilter = (value) => {
    setDateFilter(value.format("YYYY-MM-DD"));
  };
  return (
    <Box m={2}>
      <Box
        flexDirection={sidebarRTL ? "row-reverse" : "row"}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Header title={t("damaged-materials")} />
        <CustomDate onChange={handleDateFilter} />
        <AddDamagedMaterials paseSize={pageSize} />
      </Box>
      <CustomTableBox
        tableData={tableData}
        action={searchDamagedMaterials}
        CustomPagenation={
          <CustomPagenation
            action={fetchDamagedMaterialsDataByPage}
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
export default DamagedMaterials;
