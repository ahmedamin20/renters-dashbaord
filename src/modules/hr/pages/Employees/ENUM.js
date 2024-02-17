import useMainHooks from "../../../../hooks/useMainHooks";

export const MilitaryServiceStatusType = () => {
  const { t } = useMainHooks();
  return [
    { id: "completed", name: t("completed") },
    { id: "exempt", name: t("exempt") },
    { id: "postponed", name: t("postponed") },
    { id: "ongoing", name: t("ongoing") },
  ];
};

export const SocialStatusType = () => {
  const { t } = useMainHooks();
  return [
    { id: "married", name: t("married") },
    { id: "single", name: t("single") },
   
  ];
};
