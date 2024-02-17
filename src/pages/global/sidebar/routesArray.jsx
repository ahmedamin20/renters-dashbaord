import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import { USER_TYPES_ENUM } from "../../../enums/userTypeEnum";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import TireRepairIcon from "@mui/icons-material/TireRepair";
import RvHookupIcon from "@mui/icons-material/RvHookup";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import PreviewIcon from "@mui/icons-material/Preview";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import GarageIcon from "@mui/icons-material/Garage";
import Groups2Icon from "@mui/icons-material/Groups2";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import EngineeringIcon from "@mui/icons-material/Engineering";
import BrandingWatermarkIcon from "@mui/icons-material/BrandingWatermark";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import TourIcon from "@mui/icons-material/Tour";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import CarRepairIcon from "@mui/icons-material/CarRepair";
import BalanceIcon from "@mui/icons-material/Balance";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import CancelIcon from "@mui/icons-material/Cancel";
import InventoryIcon from "@mui/icons-material/Inventory";
import ExpandIcon from "@mui/icons-material/Expand";
import AddTaskIcon from "@mui/icons-material/AddTask";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import ChatIcon from "@mui/icons-material/Chat";
import FeedIcon from "@mui/icons-material/Feed";
import StoreIcon from "@mui/icons-material/Store";
import SettingsIcon from "@mui/icons-material/Settings";
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import PunchClockIcon from "@mui/icons-material/PunchClock";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import GroupsIcon from "@mui/icons-material/Groups";
import BackHandIcon from "@mui/icons-material/BackHand";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import WalletIcon from "@mui/icons-material/Wallet";
import CoffeeIcon from "@mui/icons-material/Coffee";
import Man4Icon from "@mui/icons-material/Man4";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import InfoIcon from "@mui/icons-material/Info";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";

// ...

const RoutesArray = () => {
  return [
    
    {
      lable: "Website",
      icon: <PreviewIcon />,
      routes: [
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
          title: "ads",
          to: "ads",
          icon: <BorderColorIcon />,
          permission: "all-ad",
          type: Object.values(USER_TYPES_ENUM),
        },
        
        {
          title: "ourTeam",
          to: "ourteam",
          icon: <Groups2Icon />,
          permission: "all-blog",
          type: Object.values(USER_TYPES_ENUM),
        },
      ],
    },
  ];
};

export default RoutesArray;
