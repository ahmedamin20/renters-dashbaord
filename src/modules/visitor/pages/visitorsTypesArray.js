import { useTranslation } from "react-i18next";

export const VisitorsTypes = () => {
  const { t } = useTranslation();
  return [
    { id: "random", name: t("Random") },
    { id: "client", name: t("Client") },
  ];
};
