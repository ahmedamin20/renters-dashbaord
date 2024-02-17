import { useState } from "react";
import DialogActions from "@mui/material/DialogActions";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { addRole, getPermission } from "../redux/responsibility.js";
import Table from "./GridComponent.jsx";
import { useSidebarContext } from "../../../pages/global/sidebar/sidebarContext.js";
import { preparePermissions } from "./prepareRoles.js";
import CustomTextFeild from "./../../../components/CustomTextFeild/CustomTextFeild";
import CustomLable from "../../../components/CustomLable.jsx";
import useMainHooks from "../../../hooks/useMainHooks.jsx";
import DefaultButton from "./../../../components/DefaultButton";

const AddRoles = () => {
  const { dispatch, t, navigate } = useMainHooks();
  const [name, setName] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const loading = useSelector((state) => state.roles.loading);

  useEffect(() => {
    dispatch(getPermission());
  }, [dispatch]);

  const allRoles =
    useSelector((state) => state.roles.getPermission?.data) || [];
  const { uniqueRoles, uniqueOperations, uniquePermissions } =
    preparePermissions(allRoles);

  const handleCheckboxChange = (newCheckedItems) => {
    setSelectedIds(Object.keys(newCheckedItems));
  };

  const handleAdd = async () => {
    await dispatch(addRole({ name, permissions: selectedIds }))
      .unwrap()
      .then(() => navigate(-1, { replace: true }));
  };

  const { sidebarRTL } = useSidebarContext();

  return (
    <Box m={"20px"} width={"90%"} dir={sidebarRTL ? "rtl" : "ltr"}>
      <CustomLable text={t("Add")} />
      <CustomLable title={"Name"} />
      <CustomTextFeild
        autoFocus
        margin="dense"
        placeholder={t("Name")}
        dir={sidebarRTL ? "rtl" : "ltr"}
        type="text"
        fullWidth
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Box
        sx={{
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Table
          uniquePermissions={uniquePermissions}
          uniquePermissionsLength={Object?.keys(uniquePermissions)?.length}
          uniqueOperations={uniqueOperations}
          uniqueRoles={uniqueRoles}
          onCheckboxChange={handleCheckboxChange}
        />
      </Box>

      <DialogActions m={"20px"}>
        <DefaultButton
          text={loading ? t("wait") : t("Add")}
          fullWidth={true}
          handleClick={handleAdd}
          disabled={!name}
        />
      </DialogActions>
    </Box>
  );
};

export default AddRoles;
