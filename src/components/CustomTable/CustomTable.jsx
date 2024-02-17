// import {DataGrid, GridToolbar} from '@mui/x-data-grid';
import { DataGrid } from "@mui/x-data-grid";
import { useSidebarContext } from "../../pages/global/sidebar/sidebarContext";
import { useTranslation } from "react-i18next";
// import CustomToolTip from "../CustomToolTip/customToolTip";

const CustomTable = (props) => {
  const columns = props.columns;
  // ?.map(function (element) {
  //   if (element.field !== "actions") {
  //     element.renderCell = (params) => (
  //       <CustomToolTip text={t(params.row[element.field])} />
  //     );
  //   }

  //   return element;
  // });
  const { sidebarRTL } = useSidebarContext();
  const { t } = useTranslation();
  return (
    <DataGrid
      sx={{
        fontWeight: "bold",
        fontSize: "14px",
      }}
      rows={props.rows}
      autoHeight
      // components={{
      //   Toolbar: GridToolbar,
      // }}
      columns={sidebarRTL ? columns.reverse() : columns}
      loading={props.loading}
      pageSize={props.pageSize}
      onPageSizeChange={props.onPageSizeChange}
      disableSelectionOnClick={true}
      rowHeight={props.rowHeight || 50}
      showCellRightBorder={true}
      rowsPerPageOptions={[5, 10, 15]}
      dir={sidebarRTL ? "rtl" : "ltr"}
      componentsProps={{
        pagination: {
          labelRowsPerPage: t("rowsPerPageText"),
          dir: sidebarRTL ? "rtl" : "ltr",
        },
      }}
    />
  );
};
export default CustomTable;
