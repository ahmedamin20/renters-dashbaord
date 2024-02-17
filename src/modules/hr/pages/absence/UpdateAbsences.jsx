import Header from "../../../../components/Header";
import CustomYearPicker from "../../../../components/customYearPicker/CustomYearPicker";
import { getAbsence, updateAbsences } from "../../redux/absence";
import { Box } from "@mui/material";
import useMainHooks from "../../../../hooks/useMainHooks";

export default function UpdateAbsences() {
    const { t ,dispatch} = useMainHooks();
  const handleYear = (item) => {
    dispatch(updateAbsences(item)).then((res)=>{
        console.log(res)
        if(res.status==200){
            dispatch(getAbsence())
        }
    })
  };
  return (
    <Box>
      <Header title={t("Update Absence")} />
      <CustomYearPicker defaultData={'2024'} onChange={handleYear} />
    </Box>
  );
}
