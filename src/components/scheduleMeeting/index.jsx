/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Box, Stack, Typography, Divider, IconButton } from "@mui/material";
import { format, addHours } from "date-fns";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import React from "react";
// import { MeetingList } from '../meetingList'
import { weekStyle } from "./style";

export const ScheduleMeeting = ({
  selectedEvent = {},
  handleCloseMeeting = () => false,
  handleClickMeeting = () => false,
  mainSx,
}) => {
  console.log(selectedEvent, "selectedEvent");
  return (
    <>
      <Box
        sx={{
          position: "absolute",
          right: 0,
          zIndex: 9,
          marginRight: "16px",
          border: "1px solid #cecece",

          boxShadow: "0px 0px 5px 2px #d5d5d5",
          borderRadius: "8px",
          pb: "6px",
          cursor: "pointer",
          ...mainSx
        }}
      >
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          py={"8px"}
          px={"6px"}
          sx={{
           ...weekStyle.overallMeeting
          }}
        >
          <Typography sx={{ ...weekStyle?.contextText,fontWeight:600 }}>Meetings</Typography>
          <IconButton
            sx={{
              backgroundColor: "#1170C3",
              p: "4px",
              "&:hover": {
                backgroundColor: "#1170C3",
              },
            }}
            onClick={() => handleCloseMeeting()}
          >
            <CloseRoundedIcon
              sx={{
                color: "#fff",
                fontSize: "12px",
              }}
            />
          </IconButton>
        </Stack>
        {selectedEvent?.data?.map((e, i, len) => {
          return (
            <>
              <Box>
                <Box>
                  <Stack
                    onClick={() => handleClickMeeting(e)}
                    sx={{
                      backgroundColor:
                        selectedEvent?.meeting?.id === e?.id
                          ? "#c8e0f5"
                          : "#fff",

                      pb: 1,
                    }}
                  >
                    <Box sx={{ pr: 1, py: 1 }}>
                    <Stack
                                          direction={"row"}
                                          alignItems={"center"}
                                          justifyContent={"space-between"}
                                        >
                                          <Box
                                            sx={{
                                              backgroundColor: "#1170C3",
                                              width: "12px",
                                              height: "93px",
                                              mr: 1,
                                            }}
                                          ></Box>
                     
               
                      <Box>
                      <Stack
                        direction={"row"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                        mb={1}
                      >
                        <Typography sx={{ ...weekStyle?.contextText ,fontWeight:600 }}>
                          {e?.job_id?.jobRequest_Title}
                        </Typography>
                        <Stack
                          direction={"row"}
                          alignItems={"center"}
                          spacing={"4px"}
                        >
                          <BorderColorOutlinedIcon
                            sx={{ fontSize: "18px", color: "#000" }}
                          />
                          <DeleteOutlineRoundedIcon
                            sx={{ fontSize: "18px", color: "red" }}
                          />
                        </Stack>
                      </Stack>
                      <Stack
                        direction="row"
                        divider={<Divider orientation="vertical" flexItem />}
                        spacing={2}
                        mb={1}

                      >
                        <Typography sx={{ ...weekStyle?.contextText,fontWeight:500 }}>
                          {e?.desc}
                        </Typography>
                        <Typography sx={{ ...weekStyle?.contextText,fontWeight:500 }}>
                          Interviewer: {e?.user_det?.handled_by?.firstName}
                        </Typography>
                      </Stack>
                      <Stack
                        direction="row"
                        divider={<Divider orientation="vertical" flexItem />}
                        spacing={2}
                      >
                        <Typography sx={{ ...weekStyle?.contextText,fontWeight:500 }}>
                          Date: {format(e?.start, "dd MMM yyyy")}
                        </Typography>
                        <Typography sx={{ ...weekStyle?.contextText ,fontWeight:500}}>
                          Time: {format(e?.start, "hh a")} -{" "}
                          {format(addHours(e?.end, 1), "hh a")}
                        </Typography>
                      </Stack>
                      </Box>
                      </Stack>

                    </Box>
                  </Stack>
                </Box>
              </Box>
              {len?.length - 1 !== i && <Divider></Divider>}
            </>
          );
        })}
      </Box>
    </>
  );
};
