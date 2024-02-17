import React from "react";

const SubMenu = ({ children, icon, label }) => (
  <SubMenu className="customFont" icon={icon} label={label}>
    {children}
  </SubMenu>
);

export default SubMenu;
