import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useSidebarContext } from "../../../pages/global/sidebar/sidebarContext.js";
import { addGagrage, getEmployeeMenu, getGarages } from "../redux/garages.js";
import CustomMultiSelectMenu from "../../../components/CustomMultiSelectMenu/CustomMultiSelectMenu.jsx";
import CustomTextFeild from "../../../components/CustomTextFeild/CustomTextFeild.jsx";
import CustomSelectMenu from "../../../components/CustomSelect/CustomSelect.jsx";
import { StatuseCode } from "../../../statuseCodes.js";
import { Box } from "@mui/material";
import DefaultButton from "../../../components/defaultBtn.jsx";
import { useNavigate } from "react-router-dom";

const AddGarage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState(null);
  const { sidebarRTL } = useSidebarContext();
  const [SelectedManager, setSelectedManager] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEmployeeMenu({ managerId: "" }));
  }, [dispatch]);

  const employeedata =
    useSelector((state) => state.garages.employeeMenu.data) || [];
  const info = {
    name: name,
    employees: selectedIds,
    manager_id: SelectedManager ? parseInt(SelectedManager.id) : null,
    address: address,
    phone: phone ? parseInt(phone) : null,
    pageSize: 10,
  };

  const handleAdd = async () => {
    setLoading(true);
    await dispatch(addGagrage(info)).then((res) => {
      if (res.payload.code === StatuseCode.CREATED) {
        dispatch(getGarages(info));
        navigate(-1, { replace: true });
      }
    });
    setLoading(false);
  };
  const handleSelectManager = (selectedOptions) => {
    setSelectedManager(selectedOptions);
  };
  const handleSelect = (selectedOptions) => {
    const selectedIds = selectedOptions.map((option) => option.id);
    setSelectedIds(selectedIds);
  };

  const textFieldTest = [
    { title: "name", method: setName, autoFocus: true, value: name },
    { title: "phone", method: setPhone, autoFocus: false, value: phone },
    { title: "address", method: setAddress, autoFocus: false, value: address },
  ];
  return (
    <div style={{ margin: "20px" }}>
      <Box dir={sidebarRTL ? "rtl" : "ltr"}>
        {textFieldTest.map((item, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <label style={{ fontSize: "18px", fontWeight: "Bold" }}>
              {t(item.title)}
            </label>
            <CustomTextFeild
              autoFocus={item.autoFocus}
              placeholder={t(item.title)}
              fullWidth={true}
              value={item.value}
              onChange={(e) => item.method(e.target.value)}
            />
          </div>
        ))}

        <CustomSelectMenu
          lable="select_manager"
          options={employeedata}
          // placeholder={t("Select Manager")}
          onChange={handleSelectManager}
        />
        <CustomMultiSelectMenu
          lable="select_employee"
          options={employeedata.length > 0 && employeedata}
          // placeholder={t("Select Employees")}
          onChange={handleSelect}
        />
      </Box>
      <DefaultButton
        disabled={loading}
        fullWidth={true}
        handleClick={handleAdd}
        text={loading ? "loading" : "Add"}
      />
    </div>
  );
};

export default AddGarage;
