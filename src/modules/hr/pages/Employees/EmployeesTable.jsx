import { useEffect, useState } from "react";
import { Box, Button, ButtonGroup, Container, useTheme } from "@mui/material";
import RoundaboutRightIcon from "@mui/icons-material/RoundaboutRight";
import { tokens } from "../../../../theme.js";
import Header from "../../../../components/Header.jsx";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";
import { useSidebarContext } from "../../../../pages/global/sidebar/sidebarContext.js";
import CustomTableBox from "../../../../components/customTableBox/CustomTableBox.jsx";
import CustomPagenation from "../../../../components/CustomPagenation/CustomPagenation.jsx";
import CustomDelete from "../../../../components/CutsomDelete/CustomDelete.jsx";
import {
  deleteEmployees,
  fetchEmployeesDataByPage,
  getEmployeesData,
  searchEmployees,
} from "../../redux/Employees.js";
import CustomToolTip from "../../../../components/CustomToolTip/customToolTip.jsx";
import hasPermission from "../../../../utils/haspermission.js";
import FiredEmployees from "./FiredEmployees.jsx";
import { Link } from "react-router-dom";
import { resetContractData } from "../../redux/Contract.js";
import EditButton from "../../../../components/editButton.jsx";
import DefaultButton from "../../../../components/defaultBtn.jsx";

const EmployeesTable = () => {
  const dispatch = useDispatch();
  const nextPage = useSelector((state) => state.Employees.EmployeesLinks.next);
  const lastPage = useSelector((state) => state.Employees.EmployeesLinks.last);
  const prevPage = useSelector((state) => state.Employees.EmployeesLinks.prev);
  const currentPage = useSelector((state) => state.Employees.currentPage);
  const firstPage = useSelector(
    (state) => state.Employees.EmployeesLinks.first
  );
  const { sidebarRTL } = useSidebarContext();
  const { t } = useTranslation();
  const [pageSize, setPageSize] = useState(10);
  const loading = useSelector((state) => state.Employees.loading);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const data = useSelector((state) => state.Employees.EmployeesData.data || []);
  let info = { pageSize: pageSize };

  const columns = [
    { field: "id", headerName: t("ID"), width: 150 },
    {
      field: " user name",
      headerName: t("name"),
      width: 250,
      cellClassName: "name-column--cell",
      renderCell: (params) => params.row.user.name,
    },
    {
      field: "job Name",
      headerName: t("job_name"),
      width: 250,
      cellClassName: "name-column--cell",
      renderCell: (params) => <CustomToolTip text={params.row.job.name} />,
    },

    {
      field: "is_fired",
      headerName: t("Is Fired"),
      width: 250,
      cellClassName: "name-column--cell",
      renderCell: (params) => <CustomToolTip text={params.row.is_fired} />,
    },
    {
      field: "birth_date",
      headerName: t("birth_date"),
      width: 250,
      cellClassName: "name-column--cell",
      renderCell: (params) => <CustomToolTip text={params.row.birth_date} />,
    },
    {
      field: "military_service",
      headerName: t("military_service"),
      width: 250,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <CustomToolTip text={params.row.military_service} />
      ),
    },
    {
      field: " working_shift",
      headerName: t("working_shift_name"),
      width: 250,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <CustomToolTip text={params.row.working_shift.name} />
      ),
    },
    {
      field: " user Email",
      headerName: t("email"),
      width: 250,
      cellClassName: "name-column--cell",
      renderCell: (params) => <CustomToolTip text={params.row.user.email} />,
    },

    {
      field: " user phone",
      headerName: t("phone"),
      width: 200,
      cellClassName: "name-column--cell",
      renderCell: (params) => <CustomToolTip text={params.row.user.phone} />,
    },

    {
      field: "cv",
      headerName: t("cv"),
      width: 250,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <a href={params.row.cv} target="_blank" rel="noreferrer">
          <Button
            sx={{
              backgroundColor: colors.greenAccent[200],
              fontSize: "14px",
              fontWeight: "bold",
            }}
            variant="contained"
          >
            {t("cv")}
          </Button>
        </a>
      ),
    },

    {
      field: "actions",
      headerName: t("Actions"),
      width: 600,
      renderCell: (params) => (
        <ButtonGroup
          sx={{
            display: "flex",
            gap: "10px",
            flexDirection: sidebarRTL
              ? "row-reverse !important"
              : "row !important",
            alignItems: "center",
          }}
        >
          {hasPermission("update-car") && (
            <button className="btn btn-primary text-white ms-2">
              <Link to={`${params.id}/contract`}>
                <span className="text-white">{t("contract")}</span>
              </Link>
            </button>
          )}
          <Container>
            <FiredEmployees
              id={params.id}
              icon={<RoundaboutRightIcon />}
              is_fired={params.row.is_fired}
            />
          </Container>

          {hasPermission("update-employees") && (
            <Link to={`/editemployee/${params.id}`}>
              <EditButton   text={"edit"} />
            </Link>
          )}
          {hasPermission("delete-employees") && (
            <CustomDelete
              sx={{
                background: `${colors.redAccent[600]}`,
                margin: `90px`,
              }}
              icon={<DeleteIcon />}
              id={params.id}
              action={deleteEmployees}
              pageSize={pageSize}
              rerenderAction={getEmployeesData}
            />
          )}
        </ButtonGroup>
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
  // const tableRef = useRef(true);
  useEffect(() => {
    dispatch(getEmployeesData(info));
    // store.getState().Employees
    dispatch(resetContractData());
  }, [dispatch, pageSize]);

  return (
    <Box m="20px">
      <Box
        display="flex"
        dir={sidebarRTL ? "rtl" : "ltr"}
        justifyContent="space-between"
        alignItems="center"
      >
        <Header title={t("Employees")} />
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        flexDirection={sidebarRTL ? "row" : "row-reverse"}
      >
        {hasPermission("store-car") && (
          <Link to="/Add_Employee">
            <DefaultButton text={t("Add")} />
          </Link>
        )}
      </Box>
      <CustomTableBox
        tableData={tableData}
        action={searchEmployees}
        CustomPagenation={
          <CustomPagenation
            pageSize={pageSize}
            nextPage={nextPage}
            lastPage={lastPage}
            prevPage={prevPage}
            currentPage={currentPage}
            firstPage={firstPage}
            action={fetchEmployeesDataByPage}
          />
        }
      />
    </Box>
  );
};
export default EmployeesTable;
