import React from "react";
import LineChart from "../../components/LineChart";
import { Box } from "@mui/material";
import Header from "../../components/Header";
const Bar = () => {
  return (
    <Box m="20px" height="75vh" p="2px">
      <Header title="Line CHART" subtitle="simple line chart" />
      <LineChart />
    </Box>
  );
};

export default Bar;
