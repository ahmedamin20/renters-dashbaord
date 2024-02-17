import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useSidebarContext } from "../../pages/global/sidebar/sidebarContext";
import CustomTable from "../CustomTable/CustomTable";
import CustomSearch from "../customSearch/customSearch";

const CustomTableBox = (props) => {
  const theme = useTheme();
  const { sidebarRTL } = useSidebarContext();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      m="8px 0 0 0"
      sx={{
        "& .MuiDataGrid-root": {
          border: "none",
        },
        "& .MuiDataGrid-cell": {
          borderBottom: "none",
        },
        "& .name-column--cell": {
          color: colors.greenAccent[300],
          fontWeight: "bold",
        },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: colors.blueAccent[700],
          borderBottom: "none",
          fontWeight: "bold",
          fontSize: "20px",
        },
        "& .MuiDataGrid-virtualScroller": {
          backgroundColor: colors.primary[400],
        },
        "& .MuiDataGrid-footerContainer": {
          borderTop: "none",
          backgroundColor: colors.blueAccent[700],
        },
        "& .MuiCheckbox-root": {
          color: `${colors.greenAccent[200]} !important`,
        },
        "& .MuiChackbox-root": {
          color: `${colors.greenAccent[200]} !important`,
        },
        "& .MuiButtonGroup-root.MuiButtonGroup-outlined.css-iajp3t-MuiButtonGroup-root":
          {
            display: "flex",
            alignItems: "center",
            flexDirection: sidebarRTL ? "row-reverse" : "row",
            gap: sidebarRTL ? "35px" : "0px",
          },
        "& .MuiDataGrid-cell.MuiDataGrid-cell--textLeft": {
          justifyContent: sidebarRTL
            ? "flex-end !important"
            : "flex-start !important",
        },
        "& .MuiDataGrid-columnHeaderDraggableContainer": {
          flexDirection: sidebarRTL
            ? "row-reverse !important"
            : "row !important",
        },
        "& .MuiDataGrid-columnHeaderTitleContainer": {
          justifyContent: sidebarRTL ? "end !important" : "start !important",
          flexDirection: sidebarRTL
            ? "row-reverse !important"
            : "row !important",
        },
        "& .MuiDataGrid-row": {
          // marginLeft:sidebarRTL?"40%":"-40%",
        },
      }}
    >
      {props.action ? (
        <CustomSearch
          id={props.id}
          action={props.action}
          pageSize={props.tableData.pageSize}
        />
      ) : null}
      <CustomTable
        rows={props.tableData.rows}
        rowHeight={props.tableData.rowHeight}
        loading={props.tableData.loading}
        pageSize={props.tableData.pageSize}
        onPageSizeChange={props.tableData.onPageSizeChange}
        columns={props.tableData.columns}
      />
      {props.CustomPagenation}
    </Box>
  );
};
export default CustomTableBox;
