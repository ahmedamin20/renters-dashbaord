import BorderColorIcon from "@mui/icons-material/BorderColor";
import ChatIcon from "@mui/icons-material/Chat";
import FeedIcon from "@mui/icons-material/Feed";
import Groups2Icon from "@mui/icons-material/Groups2";
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";
import PreviewIcon from "@mui/icons-material/Preview";
import SettingsIcon from "@mui/icons-material/Settings";
import { USER_TYPES_ENUM } from "../../../enums/userTypeEnum";

// ...

const RoutesArray = () => {
  return [
    
    {
      lable: "Website",
      icon: <PreviewIcon />,
      routes: [
        {
          title: "Categories",
          to: "Categories",
          icon: <ChatIcon />,
          permission: "all-contact_us",
          type: Object.values(USER_TYPES_ENUM),
        },
        {
          title: "contact-us",
          to: "contact-us",
          icon: <ChatIcon />,
          permission: "all-contact_us",
          type: Object.values(USER_TYPES_ENUM),
        },
        {
          title: "about-us",
          to: "about-us",
          icon: <FeedIcon />,
          permission: "all-about_us",
          type: Object.values(USER_TYPES_ENUM),
        },
        {
          title: "settings",
          to: "settings",
          icon: <SettingsIcon />,
          permission: "show-settings",
          type: Object.values(USER_TYPES_ENUM),
        },
        {
          title: "terms-and-conditions",
          to: "terms-and-conditions",
          icon: <LocalPoliceIcon />,
          permission: "show-terms_and_conditions",
          type: Object.values(USER_TYPES_ENUM),
        },
        {
          title: "Banner",
          to: "ads",
          icon: <BorderColorIcon />,
          permission: "all-ad",
          type: Object.values(USER_TYPES_ENUM),
        },
        {
          title: "Users",
          to: "users",
          icon: <BorderColorIcon />,
          permission: "all-ad",
          type: Object.values(USER_TYPES_ENUM),
        },
        
        
      ],
    },
  ];
};

export default RoutesArray;
