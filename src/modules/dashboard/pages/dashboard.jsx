import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import { getStatistics } from "../redux/statistics";
import { useRef } from "react";
import { Box } from "@mui/material";
import CustomCard from "../../../components/CustomCard";
const Dashboard = () => {
  const dispatch = useDispatch();
  const [lastArray, setLastArray] = useState([]);
  let statisticsData = useSelector(
    (state) => state.statistics.statisticsData?.data
  );
  let loading = useSelector((state) => state.statistics.loading);
  const dataRef = useRef();
  const checkUserType = useSelector(
    (state) => state.profile.userInfo?.data?.type
  );
  useEffect(() => {
    if (checkUserType) {
      // dispatch(getStatistics({ checkUserType: checkUserType }));
    }
  }, [dataRef, dispatch, checkUserType]);

  useEffect(() => {
    if (statisticsData && loading === false) {
      setLastArray(
        Object.keys(statisticsData).map((key) => ({
          ["key"]: key,
          ["data"]: statisticsData[key],
        }))
      );
    }
  }, [statisticsData, loading]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
        width: "100%",
        flexWrap: "wrap",
      }}
    >
      {lastArray?.map((item, index) => (
        <CustomCard key={index} name={item.key} value={item.data} />
      ))}
    </Box>
  );
};

export default Dashboard;

