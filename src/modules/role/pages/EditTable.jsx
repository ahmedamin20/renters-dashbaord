import React, { useState } from "react";
import "./table.css";
import { Box, Typography, Checkbox } from "@mui/material";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSidebarContext } from "../../../pages/global/sidebar/sidebarContext.js";

const EditTable = ({
  data,
  initialPermissions,
  allRoles,
  seteditPermission,
}) => {
  const { t } = useTranslation();
  const [checkedItems, setCheckedItems] = useState(initialPermissions);
  const [selectAll, setSelectAll] = useState(false);
  const { sidebarRTL } = useSidebarContext();

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    if (checked) {
      const matchingRole = allRoles.find((role) => role.name === name);
      if (matchingRole) {
        setCheckedItems((prevItems) => [...prevItems, matchingRole]);
      }
    } else {
      setCheckedItems((prevItems) =>
        prevItems.filter((item) => item.name !== name)
      );
    }
  };

  const handleSelectAllChange = (event) => {
    const { checked } = event.target;
    setSelectAll(checked);

    if (checked) {
      setCheckedItems(allRoles);
    } else {
      setCheckedItems([]);
    }
  };

  useEffect(() => {
    const permissionIDs = checkedItems.map((item) => item.id);
    seteditPermission(permissionIDs);
  }, [checkedItems, seteditPermission]);

  return (
    <>
      <Box
        display="flex"
        flexDirection={sidebarRTL ? "row-reverse" : "row"}
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h6">{t("Administrator Role")}</Typography>
        <Box display="flex" flexDirection="row" alignItems="center">
          <Checkbox checked={selectAll} onChange={handleSelectAllChange} />
          <Typography variant="h6">{t("Select All")}</Typography>
        </Box>
      </Box>
      <table className="custom-table" dir={sidebarRTL ? "rtl" : "ltr"}>
        <thead>
          <tr>
            <th className="first" style={{ width: "100px" }}>
              {t("Category")}
            </th>
            <th style={{ width: "100px" }}>{t("All")}</th>
            <th style={{ width: "100px" }}>{t("Delete")}</th>
            <th style={{ width: "100px" }}>{t("Show")}</th>
            <th style={{ width: "100px" }}>{t("Store")}</th>
            <th style={{ width: "100px" }}>{t("Update")}</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td
                className="first"
                style={{ fontSize: "16px", fontWeight: "bold" }}
              >
                {t(`${item.category}`)}
              </td>
              <td>
                <Checkbox
                  name={item.all}
                  disabled={item.all === "all-settings"}
                  checked={checkedItems.some(
                    (check) => check.name === item.all
                  )}
                  onChange={handleCheckboxChange}
                />
              </td>
              <td>
                <Checkbox
                  name={item.delete}
                  disabled={item.delete === "delete-settings"}
                  checked={checkedItems.some(
                    (check) => check.name === item.delete
                  )}
                  onChange={handleCheckboxChange}
                />
              </td>
              <td>
                <Checkbox
                  name={item.show}
                  checked={checkedItems.some(
                    (check) => check.name === item.show
                  )}
                  onChange={handleCheckboxChange}
                />
              </td>
              <td>
                <Checkbox
                  name={item.store}
                  disabled={item.store === "store-settings"}
                  checked={checkedItems.some(
                    (check) => check.name === item.store
                  )}
                  onChange={handleCheckboxChange}
                />
              </td>
              <td>
                <Checkbox
                  name={item.update}
                  checked={checkedItems.some(
                    (check) => check.name === item.update
                  )}
                  onChange={handleCheckboxChange}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default EditTable;
