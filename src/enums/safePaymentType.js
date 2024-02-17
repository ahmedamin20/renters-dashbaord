import useMainHooks from "../hooks/useMainHooks";

const SafePaymentType = () => {
  const { t } = useMainHooks();
  return [
    { id: "general_expense", name: t("general_expense") },
    { id: "project_expense", name: t("project_expense") },
    { id: "project_payment", name: t("project_payment") },
    { id: "employee_payment", name: t("employee_payment") },
  ];
};
export default SafePaymentType;
