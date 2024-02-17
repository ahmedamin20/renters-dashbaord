import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAccountingStatistics } from "../../../../redux/accountingStatistics-slice";
import { useSidebarContext } from "../../../../pages/global/sidebar/sidebarContext";
import { Box } from "@mui/material";
import Header from "../../../../components/Header";
import CustomDate from "../../../../components/CustomDate/CustomDate";
import { t } from "i18next";
import CustomCard from "../../../../components/CustomCard";
export default function AccountingStatistics() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const { sidebarRTL } = useSidebarContext();

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getAccountingStatistics({ from: fromDate, to: toDate }));
  }, [dispatch, fromDate, toDate]);
  const accountingStatisticsData = useSelector(
    (state) => state.accountingStatisticsReducer
  );
  console.log("accountingStatisticsData", accountingStatisticsData);
  const handelFromDate = (date) => {
    setFromDate(date.format("YYYY-MM-DD"));
  };
  const handelToDate = (date) => {
    setToDate(date.format("YYYY-MM-DD"));
  };
  return (
    <Box
      dir={sidebarRTL ? "rtl" : "ltr"}
     
    >
      <Box
        sx={{
          width: "65%",
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
      <Header title={t("accountingStatistics")} />

        <CustomDate onChange={handelFromDate} value={fromDate} title="from" />
        <CustomDate onChange={handelToDate} value={toDate} title="to" />
    
      </Box>
      <Box display='flex' mt={2}>

    {accountingStatisticsData?.data && Object.entries(accountingStatisticsData.data).map(([key, value], index) => {
        return (
          
                <CustomCard name={key} key={index} value={value} />
        );
    })}
    </Box>
    </Box>
  );
}
