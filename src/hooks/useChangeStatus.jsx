import { useDispatch, useSelector } from "react-redux";
import { changeStatus } from "../redux/changeStatusSlice";
import { StatuseCode } from "../statuseCodes";

const useChangeStatus = () => {
  const changeStatusResponse = useSelector((state) => state.changeStatus);
  const dispatch = useDispatch();

  const changeStatusEndpoint = (type, id, newStatus, callback) => {
    //console.log('sdaasdasd',type, id, newStatus, callback)
    dispatch(changeStatus({ type, id, newStatus }))
      .unwrap()
      .then((res) => {
        //console.log('iam here', res);

        if (res.code === StatuseCode.OK && callback) {
          callback();
        }
      });
  };

  return {
    changeStatusResponse,
    changeStatusEndpoint,
  };
};

export default useChangeStatus;
