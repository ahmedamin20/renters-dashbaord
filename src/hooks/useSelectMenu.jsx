import { useSelector } from "react-redux";

const useSelectMenu = () => {
  const categoriesMenu =
    useSelector((state) => state.selectMenu.categoriesMenu?.data) || [];
  const attributesMenu =
    useSelector((state) => state.selectMenu.attributeMenu?.data) || [];
  const brandsMenu =
    useSelector((state) => state.selectMenu.brandsMenu?.data) || [];
  const unitsMenu =
    useSelector((state) => state.selectMenu.unitsMenu?.data) || [];

  const rolesMenu =
    useSelector((state) => state.selectMenu.rolesMenu?.data) || [];
  const productsMenu =
    useSelector((state) => state.selectMenu.productsMenu?.data) || [];
  const projectsMenu =
    useSelector((state) => state.selectMenu.projectsMenu?.data) || [];
  const hrEmployeeMenu =
    useSelector((state) => state.selectMenu.MyManagermenu?.data) || [];

  return {
    attributesMenu,
    categoriesMenu,
    brandsMenu,
    projectsMenu,
    unitsMenu,
    hrEmployeeMenu,
    rolesMenu,
    productsMenu,
  };
};

export default useSelectMenu;
