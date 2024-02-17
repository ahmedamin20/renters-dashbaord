import * as React from "react";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 30,
  height: 30,
  border: `2px solid ${theme.palette.background.paper}`,
}));

export default function BadgeAvatars({ avatarSrc, onClick }) {
  return (
    <Stack
      direction="row"
      sx={{ cursor: "pointer" }}
      // onClick={onClick}
      spacing={2}
    >
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        badgeContent={<SmallAvatar alt="photo" src="/assets/camera.gif" />}
      >
        <Avatar
          alt="photo"
          // onClick={onClick}
          src={avatarSrc}
          sx={{ width: 100, height: 100 }}
        />
      </Badge>
    </Stack>
  );
}
