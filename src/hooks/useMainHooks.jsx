import { useSidebarContext } from "../pages/global/sidebar/sidebarContext";
import { useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import hasPermission from "./../utils/haspermission";
import { tokens } from "../theme";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useMainHooks() {
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const { sidebarRTL } = useSidebarContext();
  const getPermissionID = (permission) => {
    return permission;
  };
  const [printing, setPrinting] = useState(false);

  const handlePrintClick = () => {
    setPrinting(true);
    setTimeout(() => {
      window.print();
      setPrinting(false);
    }, 100);
  };

  const colors = tokens(theme.palette.mode);
  const navigateBack = () => {
    navigate(-1, { replace: true });
  };
  return {
    sidebarRTL,
    navigate,
    navigateBack,isLoading, setIsLoading,
    t,
    printing,
    handlePrintClick,
    getPermissionID,
    colors,
    dispatch,
    theme,
    hasPermission,
  };
}
