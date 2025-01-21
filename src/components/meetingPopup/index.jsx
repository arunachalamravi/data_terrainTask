/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Box,
  Stack,
  Typography,
  Divider,
  IconButton,
  Button,
  Modal,
} from "@mui/material";
import { format, addHours } from "date-fns";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import React from "react";
// import { MeetingList } from '../meetingList'
import { modalStyle } from "./style";

export const MeetingPopup = ({
  selectedEvent = {},
  detailData = {},
  onClose = () => false,
  open = false,
}) => {
  return (
    <>
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgcolor="rgba(255, 255, 255, 0.8)"
        zIndex={10}
        onClick={onClose}
      >
        <Box
          sx={{
            ...modalStyle?.styledRootSx,
            width: "100%",
            py: "18px",
            position: "relative",
          }}
        >
          <IconButton
            sx={{
              position: "absolute",
              backgroundColor: "#1170C3",
              top: "-15px",
              right: "-12px",
              "&:hover": {
                backgroundColor: "#1170C3",
              },
            }}
            onClick={onClose}
          >
            <CloseRoundedIcon sx={{ color: "#fff", fontSize: "14px" }} />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              border: "1px solid #dddddd",
              px: 2,
            }}
          >
            <Box
              sx={{
                py: "24px",
                pr: 2,
                borderRight: "1px solid #dddddd",
                mr: 2,
              }}
            >
              <Typography fontWeight={400} sx={{ ...modalStyle?.titleSx }}>
                Interview With:{" "}
                {detailData?.user_det?.candidate?.candidate_firstName ?? "-"}
              </Typography>
              <Typography fontWeight={400} sx={{ ...modalStyle?.titleSx }}>
                Position: {detailData?.job_id?.jobRequest_Title ?? "-"}
              </Typography>
              <Typography fontWeight={400} sx={{ ...modalStyle?.titleSx }}>
                Created By: {detailData?.job_id?.jobRequest_createdBy ?? "-"}
              </Typography>
              <Typography fontWeight={400} sx={{ ...modalStyle?.titleSx }}>
                Interview Date: {format(detailData?.start, "dd MMM yyyy")}
              </Typography>
              <Typography fontWeight={400} sx={{ ...modalStyle?.titleSx }}>
                Interview Time: {format(detailData?.start, "hh")} -{" "}
                {format(detailData?.end, "hh:mm a")}
              </Typography>
              <Typography fontWeight={400} sx={{ ...modalStyle?.titleSx }}>
                Interview Via: Google Meet
              </Typography>

              <Stack spacing={1}>
                <Button variant="outlined">
                  <Typography>Resume.docx</Typography>
                  <Box direction={"row"} alignItems={"center"} ml={2}>
                    <VisibilityIcon />
                    <FileDownloadOutlinedIcon sx={{ ml: 1 }} />
                  </Box>
                </Button>
                <Button variant="outlined">
                  <Typography>Aadharcard</Typography>
                  <Box direction={"row"} alignItems={"center"} ml={2}>
                    <VisibilityIcon />
                    <FileDownloadOutlinedIcon sx={{ ml: 1 }} />
                  </Box>
                </Button>
              </Stack>
            </Box>
            <Box sx={{ width: "33%" }}>
              <Box
                sx={{
                  ...modalStyle?.iconSx,
                }}
              >
                <AccountCircleIcon
                  sx={{ fontSize: "60px", color: "rgb(77 77 77)" }}
                />
              </Box>

              <Button
                sx={{
                  fontSize: "14px",
                  backgroundColor: "#1170C3",
                  mt: 2,
                  color: "#fff",
                }}
              >
                Join
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
