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
import { weekStyle } from "./style";
import { ScheduleMeeting } from "../scheduleMeeting";
import { MeetingPopup } from "../meetingPopup";

export const DayCalendar = ({
  weekdates,
  groupedDataForDate,
  hours,
  detailData,
  detailModalOpen = () => false,
}) => {
  const [selectedEvent, setSelectedEvent] = React.useState({
    index: "",
    data: [],
    meeting: {},
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

  console.log(weekdates, "weekdates");

  console.log(groupedDataForDate, "groupedDataForDate");

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ ...weekStyle?.mainTableSx, maxHeight: `calc(100vh - 186px)` }}
      >
        <Table stickyHeader>
          <TableBody sx={{ border: "1px solid #F1F3F3" }}>
            {hours?.map((hour, i) => {
              return (
                <TableRow
                  key={i}
                  sx={{ position: "relative", border: "1px solid #F1F3F3" }}
                >
                  <TableCell
                    sx={{
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      height: "100px",
                      border: `1px solid #F1F3F3`,
                    }}
                    colSpan={2}
                  >
                    <center>
                      <Typography sx={{ color: "#000" }}>
                        {format(hour, "h a").replace(/AM|PM/, (match) =>
                          match.split("").join(".")
                        )}
                      </Typography>
                    </center>
                  </TableCell>
                  <TableCell
                    key={i}
                    sx={{ border: "1px solid #F1F3F3", width: "90%" }}
                    colSpan={10}
                    style={{ width: "500px" }}
                  >
                    {Object.keys(groupedDataForDate)?.map((e, i) => {
                      return (
                        <>
                          {format(hour, "HH") === format(e, "HH") &&
                            format(weekdates?.startDate, "dd-MM-yyyy") ===
                              format(e, "dd-MM-yyyy") && (
                              <Box
                                sx={{
                                  position: "absolute",
                                  maxHeight: "400px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  width: "530px",
                                  zIndex: 1,
                                }}
                              >
                                <Box
                                  sx={{
                                    position: "absolute",
                                    left: 0,
                                    zIndex: 9,
                                    marginLeft: "16px",
                                  }}
                                >
                                  <Box
                                    sx={{
                                      backgroundColor: "#fff",
                                      padding: 1,
                                      boxShadow: "0px 0px 5px 2px #d5d5d5",
                                      borderRadius: "4px",
                                      cursor: "pointer",
                                    }}
                                    onClick={() =>
                                      handleSelectViewEvent(
                                        i,
                                        groupedDataForDate?.[e]
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
                                          width: "21px",
                                          height: "93px",
                                          mr: 1,
                                        }}
                                      ></Box>

                                      <Box>
                                        <Stack spacing={"4px"}>
                                          <Typography
                                            sx={{
                                              ...weekStyle?.contextText,
                                            }}
                                          >
                                            {
                                              groupedDataForDate?.[e]?.[0]
                                                ?.job_id?.jobRequest_Title
                                            }
                                          </Typography>
                                          <Typography
                                            sx={{
                                              ...weekStyle?.contextText,
                                            }}
                                          >
                                            Interviewer:{" "}
                                            {
                                              groupedDataForDate?.[e]?.[0]
                                                ?.user_det?.handled_by
                                                ?.firstName
                                            }
                                          </Typography>
                                          <Typography
                                            sx={{
                                              ...weekStyle?.contextText,
                                            }}
                                          >
                                            Time:{" "}
                                            {format(
                                              groupedDataForDate?.[e]?.[0]
                                                ?.start,
                                              "hh a"
                                            )}{" "}
                                            -{" "}
                                            {format(
                                              addHours(
                                                groupedDataForDate?.[e]?.[0]
                                                  ?.end,
                                                1
                                              ),
                                              "hh a"
                                            )}
                                          </Typography>
                                        </Stack>
                                      </Box>
                                    </Stack>
                                    {groupedDataForDate?.[e]?.length > 1 && (
                                      <Box
                                        sx={{
                                          ...weekStyle?.messageBox,
                                        }}
                                      >
                                        <Typography
                                          sx={{ ...weekStyle?.contextText }}
                                        >
                                          {groupedDataForDate?.[e]?.length}
                                        </Typography>
                                      </Box>
                                    )}
                                  </Box>
                                </Box>

                                {selectedEvent?.index === i && (
                                  <ScheduleMeeting
                                    selectedEvent={selectedEvent}
                                    handleCloseMeeting={handleCloseMeeting}
                                    handleClickMeeting={handleClickMeeting}
                                  />
                                )}
                              </Box>
                            )}
                        </>
                      );
                    })}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
