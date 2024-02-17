import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import React from "react";

const SkeletonBox = () => {
    return (
        <Box sx={{ overflow: "hidden" }}>
            {/* <Skeleton variant="rectangular" width={210} height={118} />( */}
            <Box className="w-full  p-[20px]">
                <Skeleton />
                <Skeleton width="60%" />
            </Box>
        </Box>
    );
}
export default  SkeletonBox