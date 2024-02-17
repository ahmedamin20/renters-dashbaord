import  { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {  useSelector } from "react-redux";
import { preparePermissions } from "./prepareRoles.js";

import {
  editRoles,
  getOneRole,
  getPermission,
} from "../redux/responsibility.js";
import Table from "./GridComponent.jsx";
import { Box,DialogActions } from "@mui/material";
import { useNavigate, useParams } from 'react-router-dom';
import useMainHooks from "../../../hooks/useMainHooks.jsx";
import CustomLable from "../../../components/CustomLable.jsx";
import { StatuseCode } from "../../../statuseCodes.js";
import DefaultButton from './../../../components/defaultBtn';

const EditRole = ( ) => {
  const {id}= useParams()
  const [name, setName] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const {dispatch, t,sidebarRTL,hasPermission} = useMainHooks()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(getPermission());
    dispatch(getOneRole({ id }))
    .then(res => {
        setName(res.payload.data.name)
        setSelectedIds(res.payload.data.permissions.filter(item => item.status).map(item => item.id))
    })
  }, []);

  const allRoles =
    useSelector((state) => state.roles.getPermission?.data) || [];
  const oneRoles= useSelector((state) => state.roles?.responsibilityInfo?.data) || [];
  console.log(oneRoles)
  const { uniqueRoles, uniqueOperations, uniquePermissions } =
    preparePermissions(allRoles);

  const handleCheckboxChange = (newCheckedItems) => {
    setSelectedIds(Object.keys(newCheckedItems));
  };
  const handleEdit = async () => {
    await dispatch(editRoles({ name, permissions: selectedIds, id  })).then(
      (res) => res.payload.code === StatuseCode.OK && navigate(-1, {replace: true})
    );
  };
  const loading = useSelector((state) => state.roles.loading);

  return (
    <Box m={'20px'} width={'90%'} dir={sidebarRTL ? "rtl" : "ltr"}>
        <CustomLable text={t("edit")} />
     
          <label style={{ fontSize: "18px", fontWeight: "Bold" }}>
            {t("Name")}
          </label>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            placeholder={t("Name")}
            dir={sidebarRTL ? "rtl" : "ltr"}
            type="text"
            required="true"
            defaultValue={name}
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            variant="outlined"
            inputProps={{
              style: { fontSize: "20px", fontWeight: "bold" }, // Adjust the font size here
            }}
          />
            <Box sx={{
            overflow: 'auto',
            display: 'flex',  
            flexDirection: 'column',
          }}>
          <Table
            uniquePermissions={uniquePermissions}
            uniquePermissionsLength={Object?.keys(uniquePermissions)?.length}
            uniqueOperations={uniqueOperations}
            uniqueRoles={uniqueRoles}
            onCheckboxChange={handleCheckboxChange}
            initialPermissions={oneRoles.permissions}
          />
        </Box>
        {hasPermission('update-role') && (

        <DialogActions m={'20px'}>
        <DefaultButton
          fullWidth={true}

         disabled={loading || !name || !!! selectedIds}
        text= {loading ? t("wait") : t("edit")} handleClick={handleEdit}/>
        <Button
       
        >
         
        </Button>
      </DialogActions>
        )}

      </Box>
  );
};

export default EditRole;
