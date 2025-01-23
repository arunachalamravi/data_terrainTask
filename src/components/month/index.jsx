/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Box,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import { format, addHours } from "date-fns";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import React from "react";
// import { MeetingList } from '../meetingList'
import { monthStyle } from "./style";
import { ScheduleMeeting } from "../scheduleMeeting";
import { MeetingPopup } from "../meetingPopup";

export const MonthCalendar = ({
  dates = [],
  month = "",
  data = {},
  detailModalOpen = () => false,
}) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wedsday",
    "Thusday",
    "Friday",
    "Saturday",
  ];
  const [selectedEvent, setSelectedEvent] = React.useState({
    index: "",
    data: [],
  });

  const handleSelectViewEvent = (index, data) => {
    setSelectedEvent({
      index,
      data: data?.length > 1 ? data : [],
    });
  };

  const handleCloseMeeting = () => {
    setSelectedEvent({
      index: "",
      data: [],
    });
  };

  const handleClickMeeting = (meet) => {
    setSelectedEvent({
      ...selectedEvent,
      meeting: meet,
    });
    detailModalOpen();
  };

  return (
    <>
      <Grid container>
        <Grid item sm={12} md={12} lg={12}>
          <Grid container>
            {days.map((e, i) => {
              return (
                <Grid key={i} item xs={1.7} textAlign={"center"} p={1}>
                  <span>{e} </span>
                </Grid>
              );
            })}
          </Grid>
          <Grid container mt={0} sx={{ ...monthStyle.mainDays }}>
            <Grid item sm={12} md={12} lg={12}>
              <Grid container>
                {dates?.map((e, i) => {
                  return (
                    <Grid
                      key={i}
                      item
                      xs={1.7}
                      sx={{
                        width: "100%",
                        color: "#464646",
                        border: `1px solid #dedede`,
                        height: 120,
                      }}
                    >
                      <Stack
                        mt={1}
                        justifyContent={"space-between"}
                        height="100%"
                        pb={2}
                      >
                        <Box
                          sx={{
                            color: "#464646",
                            fontSize: "16px",
                            fontWeight: "600",
                          }}
                        >
                          <span>{format(e, "dd")}</span>
                        </Box>
                        {Object.keys(data)?.map((d, i) => {
                          return (
                            <>
                              {format(e, "dd-MM-yyyy") === d && (
                                <Box
                                  sx={{
                                    position: "absolute",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    zIndex: 1,
                                  }}
                                >
                                  <Box
                                    sx={{
                                      position: "absolute",
                                      left: 0,
                                      zIndex: 9,
                                      marginLeft: "16px",
                                      marginTop: "115px",
                                    }}
                                  >
                                    

                                    <Box
                                      sx={{
                                        backgroundColor: "#fff",
                                        pr: 1,
                                        boxShadow: "0px 0px 5px 2px #d5d5d5",
                                        borderRadius: "4px",
                                        cursor: "pointer",
                                        width:'144px'
                                      }}
                                      onClick={() =>
                                        handleSelectViewEvent(
                                          i,
                                          data?.[d]
                                        )
                                      }
                                    >
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

                                        <Box sx={{textAlign:'start'}}>
                                          <Stack spacing={"4px"}>
                                            <Typography
                                              sx={{
                                                ...monthStyle?.contextText,
                                                fontWeight: 600,
                                              }}
                                            >
                                              {
                                                data?.[d]?.[0]
                                                  ?.job_id?.jobRequest_Title
                                              }
                                            </Typography>
                                            <Typography
                                              sx={{
                                                ...monthStyle?.contextText,
                                                fontWeight: 500,
                                              }}
                                            >
                                              Interviewer:{" "}
                                              {
                                                data?.[d]?.[0]
                                                  ?.user_det?.handled_by
                                                  ?.firstName
                                              }
                                            </Typography>
                                            <Typography
                                              sx={{
                                                ...monthStyle?.contextText,
                                                fontWeight: 500,
                                              }}
                                            >
                                              Time:{" "}
                                              {format(
                                                data?.[d]?.[0]
                                                  ?.start,
                                                "hh a"
                                              )}{" "}
                                              -{" "}
                                              {format(
                                                addHours(
                                                    data?.[d]?.[0]
                                                    ?.end,
                                                  1
                                                ),
                                                "hh a"
                                              )}
                                            </Typography>
                                          </Stack>
                                        </Box>
                                      </Stack>
                                      {data?.[d]?.length > 1 && (
                                      <Box
                                      sx={{
                                        ...monthStyle?.messageBox,
                                      }}
                                    >
                                      <Typography
                                        sx={{ ...monthStyle?.contextText }}
                                      >
                                                                                 {data?.[d]?.length}

                                      </Typography>
                                    </Box>
                                      )}


                                    </Box>
                                  </Box>

                                  {selectedEvent?.index === i &&
                                    selectedEvent?.data?.length > 0 && (
                                      <Box
                                        sx={{
                                          position: "absolute",
                                          left: 0,
                                          zIndex: 9,
                                        
                                        }}
                                      >
                                        {selectedEvent?.index === i && (
                                          <ScheduleMeeting
                                          mainSx={{ top:'-60px', mt:'-67px' , width: '286px',
                                            height: '221px',
                                            overflow: 'scroll',}}
                                            selectedEvent={selectedEvent}
                                            handleCloseMeeting={
                                              handleCloseMeeting
                                            }
                                            handleClickMeeting={
                                              handleClickMeeting
                                            }
                                          />
                                        )}
                                      </Box>
                                    )}
                                </Box>
                              )}
                            </>
                          );
                        })}
                      </Stack>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
