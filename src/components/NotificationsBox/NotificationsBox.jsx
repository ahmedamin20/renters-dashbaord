import {
  Clear,
  Notifications,
  SpeakerNotesOff,
  Visibility,
} from "@mui/icons-material";
import { Badge, Zoom } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  DeleteAllNotifications,
  DeleteOneNotificationsThunk,
  OneReadNtfThunk,
  ReadAllNotifications,
  UnReadNtfThunk,
  getAllNotifications,
  handlePushNtf,
} from "../../redux/notification";
import LightTooltip from "./lightToolTip";
import "./NotificationsBox.css";
import SkeletonBox from "../CustomSkeletonBox/SkeletonBox";
import { getPusherInstance } from "../../pusherconfig";
import Sound from "./sound.mp3";
import { StatuseCode } from "../../statuseCodes";
import Pusher from "pusher-js";
import { useRef } from "react";

let handleSound = () => {
  const audio = new Audio(Sound);
  audio.play();
};

let NotificationsBox = () => {
  let dispatch = useDispatch();
  const navigate = useNavigate();
  let { t, i18n } = useTranslation();
  const ntfData = [
    ...(useSelector((state) => state.notifications.allNotifications) || []),
  ];
  const currentPage = useSelector((state) => state.notifications.currentPage);
  const unRead = useSelector((state) => state.notifications.unRead?.data);
  const lastPage = useSelector((state) => state.notifications.lastPage);
  const [userID, setUserID] = useState(
    localStorage.getItem("user_id") !== null
      ? `private-notifications.users.${localStorage.getItem("user_id")}`
      : null
  );
  const [tokenUser, settokenUser] = useState(localStorage.getItem("token"));

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // ========Notifications========
  const getNtfData = React.useRef(true);
  React.useEffect(() => {
    if (getNtfData.current) {
      dispatch(getAllNotifications({ page: 1 }));
      dispatch(UnReadNtfThunk());
      // getNtfData.current = false;
    }
  }, [dispatch]);
  //    ==========one=============
  const handleReadOne = useCallback(
    (id, orderID, type) => {
      if (type == false) {
        // console.log(type);
        dispatch(OneReadNtfThunk({ id: id }))
          .unwrap()
          .then((data) => {
            // console.log(data);
            handleClose();
            // dispatch(FirstNotifications({ page: 1 }));
            dispatch(UnReadNtfThunk());
            // navigate(`/tasks/${id}/show/${orderID}`);
          })
          .catch((error) => {
            // console.log(error);
            //    setCode(error.code);
          });
      }
    },
    // [Navigate, dispatch, currentPage]
    [navigate, dispatch]
  );
  const handleDeleteOne = useCallback(
    (id) => {
      dispatch(DeleteOneNotificationsThunk({ id: id }))
        .unwrap()
        .then((res) => {
          res.code === StatuseCode.OK && handleClose();
          dispatch(getAllNotifications({ page: 1 }));
          dispatch(UnReadNtfThunk());

          // Navigate(`/admin/order/view/${orderID}`);
        })
        .catch((error) => {
          // console.log(error);
          //    setCode(error.code);
        });
    },
    // [dispatch, currentPage]
    [dispatch]
  );
  //    ==========all=============
  const handleReadAll = useCallback(() => {
    dispatch(ReadAllNotifications({ page: 10 }))
      .unwrap()
      .then((res) => {
        res.code === StatuseCode.OK &&
          dispatch(getAllNotifications({ page: 1 }));
        // dispatch(UnReadNtfThunk());
        handleClose();
      })
      .catch((error) => {
        // console.log(error);
        //    setCode(error.code);
      });
  }, [dispatch]);
  // }, [dispatch, currentPage]);
  const handleDeleteAll = useCallback(() => {
    dispatch(DeleteAllNotifications({ page: 10 }))
      .unwrap()
      .then((res) => {
        res.code === StatuseCode.OK && handleClose();
        dispatch(getAllNotifications({ page: 1 }));
        dispatch(UnReadNtfThunk());
      });
  }, [dispatch]);
  // =============realTime====================

  const getDataRef = useRef(true);

  useEffect(() => {
    if (getDataRef.current & (tokenUser !== null) & (userID !== null)) {
      let pusher = new Pusher(import.meta.env.VITE_PUBLIC_KEY, {
        cluster: import.meta.env.VITE_CLUSTER,
        channelAuthorization: {
          withCredentials: true,
          endpoint: import.meta.env.VITE_AUTH_ENDPOINT,
          headers: {
            Authorization: `Bearer ${tokenUser}`,
          },
        },
      });
      let channel = pusher.subscribe(userID);
      channel.bind(
        "Illuminate\\Notifications\\Events\\BroadcastNotificationCreated",
        function (data) {
          // console.log(data);
          dispatch(handlePushNtf(data));
          dispatch(UnReadNtfThunk());
          handleSound();
        }
      );
      getDataRef.current = false;
    }
  }, [dispatch, tokenUser, userID]);
  let handleNextData = () => {
    if (currentPage < lastPage) {
      // console.log(currentPage);
      dispatch(getAllNotifications({ page: currentPage + 1 }));
    } else {
      console.log(currentPage);
    }
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Badge
          badgeContent={unRead?.unreadNotificationsCount || 0}
          color="primary"
          // className=" !mx-[8px]"
        >
          <IconButton
            onClick={handleClick}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            className=" !p-0   relative"
          >
            <Notifications sx={{ width: 30, height: 30 }} />
          </IconButton>
        </Badge>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        // onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            // background:"red",
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {ntfData?.length ? (
          <>
            <div className="flex justify-between items-center gap-[15px] p-[12px] ">
              <h2 className=" text-[22px] font-[600]">
                {t("pages.NotificationsBox.Notifications")}
              </h2>
              <div className="info flex justify-center items-center gap-[5px]">
                <LightTooltip
                  title="Delete All Notifications"
                  placement="top"
                  TransitionComponent={Zoom}
                  TransitionProps={{ timeout: 200 }}
                >
                  <IconButton
                    className=" !text-inherit"
                    onClick={handleDeleteAll}
                  >
                    <Clear />
                  </IconButton>
                </LightTooltip>

                <LightTooltip
                  title="Mark All Notifications As Read"
                  placement="top"
                  TransitionComponent={Zoom}
                  TransitionProps={{ timeout: 200 }}
                >
                  <IconButton
                    className=" !text-inherit"
                    onClick={handleReadAll}
                  >
                    <Visibility />
                  </IconButton>
                </LightTooltip>
              </div>
            </div>
            <div className="  h-[500px]  max-h-[500px]  overflow-y-auto">
              <InfiniteScroll
                dataLength={ntfData?.length} //This is important field to render the next data
                next={handleNextData}
                hasMore={currentPage < lastPage ? true : false}
                height="500px"
                loader={<SkeletonBox />}
              >
                {ntfData?.map((el) => {
                  return (
                    <div
                      key={el.id}
                      className="box cursor-pointer  flex justify-center items-center gap-[15px]  ease-out duration-300 border-t border-b p-[12px] hover:text-primaryNt"
                      // onClick={() => {
                      //     handleReadOne(
                      //         el.id,
                      //         el?.body.modelId,
                      //         el.seen
                      //     );
                      // }}
                    >
                      <div className="notification_Box">
                        <h4 className=" text-[18px] font-[600]">
                          {el?.body.notificationType}
                        </h4>

                        <h6>{el?.body.message}</h6>
                        <h6 className="text-[15px] font-[400]">
                          {el?.createdAt}
                        </h6>
                      </div>

                      <div className="info flex flex-col-reverse justify-center items-center gap-[10px]  ">
                        <IconButton
                          className=" !text-inherit"
                          onClick={() => {
                            handleDeleteOne(el.id);
                          }}
                        >
                          <Clear />
                        </IconButton>
                        <div
                          className={`w-[10px] h-[10px] rounded-full ${
                            el.seen ? "bg-gray-600" : " bg-green-600"
                          }`}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </InfiniteScroll>
            </div>
          </>
        ) : (
          <>
            <div className=" w-[400px] h-[400px]  flex justify-center items-center flex-col gap-[30px]">
              <SpeakerNotesOff className="!text-[80px]   !text-gray-600" />
            </div>
          </>
        )}
      </Menu>
    </>
  );
};
export default React.memo(NotificationsBox);
