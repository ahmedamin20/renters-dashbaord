import { useTranslation } from "react-i18next";

export const TranslatedOptions = (option) => {
  const { t } = useTranslation();
  return option?.map((item) => ({ ...item, name: t(item.name) }));
};
