import { useState } from "react";
import { useTranslation } from "react-i18next";

function useMoneyTypeHook(type) {
  const { t } = useTranslation();
  const [typeIn, setTypeIn] = useState(type || "");
  const handleTypeChange = (e) => {
    if (e.id == "cash") {
      setTypeIn(e.id);
    } else if (e.id == "check") {
      setTypeIn(e.id);
    } else {
      setTypeIn("");
    }
  };
  const typeOptions = [
    {
      id: "cash",
      name: t("cash"),
    },
    {
      id: "check",
      name: t("check"),
    },
  ];
  return {
    handleTypeChange,
    typeIn,
    setTypeIn,
    typeOptions,
  };
}

export default useMoneyTypeHook;
