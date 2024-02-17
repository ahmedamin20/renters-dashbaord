import { BarChart } from "@mui/x-charts/BarChart";
import { t } from "i18next";
import CustomLoader from "../CustomLoader/CustomLoader";

export default function BarsChartComponent({ array }) {
  console.log("innerArray", array);

  return array ? (
    <BarChart
      dataset={array}
      xAxis={[{ scaleType: "band", dataKey: t("key"), fill: "#ff7205" }]}
      series={[{ dataKey: "data", fill: "#ff7205" }]}
      height={500}
      sx={{ width: "100%" }}
    />
  ) : (
    <CustomLoader />
  );
}
