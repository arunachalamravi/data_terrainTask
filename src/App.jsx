/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */

import {
  eachHourOfInterval,
  addDays,
  subDays,
  format,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  subMonths,
  addMonths,
} from "date-fns";
import React, { useEffect, useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import "./App.css";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { WeekCalendar } from "./components/week";
import { MeetingPopup } from "./components/meetingPopup";
import { DayCalendar } from "./components/Day";
import { MonthCalendar } from "./components/month";

function App() {
  const [dates, setDates] = useState([]);
  const [data, setData] = React.useState([]);
  const [detailData, setDetailData] = React.useState({});
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [tabChange, setTabChange] = useState("Week");
  const [weekSchedule, setWeekSchedule] = React.useState({
    startDate: new Date("2024-08-26"),
    endDate: addDays(new Date("2024-08-26"), 6),
  });
  const [weekdates, setWeekdates] = React.useState({
    startDate: new Date("2024-08-26"),
    endDate: addDays(new Date("2024-08-26"), 6),
  });

  const [monthData, setMonthData] = React.useState({
    monthstartDate: startOfWeek("2024-08-29"),
    monthendDate: endOfWeek("2024-08-29"),
    dates: [],
    month: "2024-08-29",
  });

  const monthStart = startOfMonth(monthData?.month);
  const monthEnd = endOfMonth(monthStart);
  const monthstartDate = startOfWeek(monthStart);
  const monthendDate = endOfWeek(monthEnd);

  const hours = eachHourOfInterval({
    start: new Date(2024, 10, 3, 0),
    end: new Date(2024, 10, 3, 23),
  });

  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const getdateRange = (startDate, endDate) => {
    const date = new Date(startDate);
    const dateArray = [];
    while (date <= endDate) {
      dateArray.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    setDates(dateArray);
    return dateArray;
  };

  const weekprev = () => {
    const start = subDays(weekSchedule.startDate, 7);
    const end = subDays(weekSchedule.startDate, 1);
    setWeekSchedule({
      startDate: start,
      endDate: end,
    });
    getdateRange(start, end);
  };

  const weekNext = () => {
    const start = addDays(weekSchedule.endDate, 1);
    const end = addDays(weekSchedule.endDate, 7);
    setWeekSchedule({
      startDate: start,
      endDate: end,
    });
    getdateRange(start, end);
  };

  const groupByStartTime = (data) => {
    const groups = {};
    for (const item of data) {
      const startTime = item.start;
      if (!groups[startTime]) {
        groups[startTime] = [];
      }
      groups[startTime].push(item);
    }
    return groups;
  };

  const groupByDate = (data) => {
    let groupedMonthData = data?.reduce((acc, curr) => {
      const date = format(curr.start, "dd-MM-yyyy");

      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(curr);
      return acc;
    }, {});
    return groupedMonthData;
  };

  const getData = async (type) => {
    try {
      setData([]);

      const response = await fetch("/calendarfromtoenddate.json");

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const res = await response.json();

      let constructedData = [];
      if (type === "Week" || type === "Day") {
        constructedData = groupByStartTime(res);

      } else {
        constructedData = groupByDate(res);
      }

      setData(constructedData);
    } catch (error) {
      console.error("Error fetching the JSON file:", error);
    }
  };

  const HandleMeeting = async () => {
    try {
      const response = await fetch("/calendar_meeting.json");

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setDetailData(data);
      handleOpenModal();
    } catch (error) {
      console.error("Error fetching the JSON file:", error);
    }
  };

  const calenderSelection = [
    {
      title: "Day",
      value: "Day",
    },
    {
      title: "Week",
      value: "Week",
    },
    {
      title: "Month",
      value: "Month",
    },
    {
      title: "Year",
      value: "Year",
    },
  ];

  const onCalenderWiseChange = (value) => {
    setTabChange(value?.title);

    if (value?.title === "Week") {
      const start = new Date("2024-08-26");
      const end = addDays(new Date("2024-08-26"), 6);
      setWeekdates({ startDate: start, endDate: end });
      getdateRange(start, end);
    }
    if (value?.title === "Day") {
      setWeekdates({
        startDate: new Date("2024-08-29"),
        endDate: new Date("2024-08-29"),
      });
    }
    getData(value?.title);
  };

  const onNext = () => {
    if (tabChange === "Week") {
      weekNext();
    } else if (tabChange === "Day") {
      dayNext();
    } else if (tabChange === "Month" || tabChange === "Year") {
      monthNext();
    }
  };

  const onPrev = () => {
    if (tabChange === "Week") {
      weekprev();
    } else if (tabChange === "Day") {
      dayprev();
    } else if (tabChange === "Month" || tabChange === "Year") {
      monthprev();
    }
  };
  const dayNext = () => {
    const start = addDays(weekdates.startDate, 1);
    const end = addDays(weekdates.startDate, 1);
    setWeekdates({
      startDate: start,
      endDate: end,
    });
    getdateRange(start, end);
  };

  const dayprev = () => {
    const start = subDays(weekdates.startDate, 1);
    const end = subDays(weekdates.startDate, 1);
    setWeekdates({
      startDate: start,
      endDate: end,
    });
    getdateRange(start, end);
  };

  const monthNext = () => {
    let tempMonth = addMonths(monthData?.month, 1);
    let monthStart = startOfMonth(tempMonth);
    let monthEnd = endOfMonth(monthStart);
    const monthDays = getdateRange(
      startOfWeek(monthStart),
      endOfWeek(monthEnd)
    );

    setMonthData({
      ...monthData,
      dates: monthDays,
      month: format(new Date(tempMonth), "yyyy-MM-dd"),
    });
  };

  const monthprev = () => {
    let tempMonth = subMonths(monthData?.month, 1);
    let monthStart = startOfMonth(tempMonth);
    let monthEnd = endOfMonth(monthStart);

    const monthDays = getdateRange(
      startOfWeek(monthStart),
      endOfWeek(monthEnd)
    );

    setMonthData({
      ...monthData,
      dates: monthDays,
      month: format(tempMonth, "yyy-MM-dd"),
    });
  };
  const dateRange = (startDate, endDate) => {
    const date = new Date(startDate.getTime());

    const dates = [];

    while (date <= endDate) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  useEffect(() => {
    setTabChange("Week");
    getData("Week");
    getdateRange(weekSchedule.startDate, weekSchedule.endDate);
    let monthdays = dateRange(monthstartDate, monthendDate);
    setMonthData({
      ...monthData,
      dates: monthdays,
    });
  }, []);

  console.log(data, "data");

  return (
    <>
      <div style={{ backgroundColor: "white" }}>
    <Box>
    
        {/* Calender Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "end",
            justifyContent: "space-between",
          }}
        >
          {/* prev & next button */}
          <Box>
            <IconButton
              sx={{
                backgroundColor: "#1170C3",
                borderRadius: "4px",
                "&:hover": {
                  backgroundColor: "#1170C3",
                },
              }}
              onClick={onPrev}
            >
              <KeyboardArrowLeftIcon sx={{ color: "#fff" }} />
            </IconButton>
            <IconButton
              sx={{
                backgroundColor: "#1170C3",
                ml: 1,
                borderRadius: "4px",
                "&:hover": {
                  backgroundColor: "#1170C3",
                },
              }}
              onClick={onNext}
            >
              <KeyboardArrowRightIcon sx={{ color: "#fff" }} />
            </IconButton>

            <IconButton
              sx={{
                backgroundColor: "#1170C3",
                borderRadius: "4px",
                ml: 3,
                "&:hover": {
                  backgroundColor: "#1170C3",
                },
              }}
            >
              
              <Typography sx={{ color: "#fff" }}>
                {format(new Date(), "dd")}
              </Typography>
            </IconButton>
          </Box>
          {/* Calender date */}
          <Box sx={{ ml:2}}>
          <Typography
          sx={{
            fontSize: "24px",
            fontWeight: 700,
            color: "#1170C3",
            textAlign: "center",
            mb: 3,
          }}
        >
          Calender
        </Typography>
            <Typography sx={{ fontSize: "24px", fontWeight: "500" }}>
              {tabChange === "Week" &&
                `${format(weekSchedule?.startDate, "dd MMMM")} to ${format(
                  weekSchedule?.endDate,
                  "dd MMMM"
                )}, ${format(weekSchedule?.startDate, "yyyy")}`}
              {tabChange === "Day" &&
                format(weekdates?.startDate, "dd MMMM yyyy")}
                  {tabChange === "Month" &&
                format(monthStart, "MMMM yyyy")}
                {tabChange === "Year" &&
                format(monthStart, "MMMM yyyy")}
            </Typography>
          </Box>
          {/* Tab*/}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
            }}
          >
            {calenderSelection?.length > 0 &&
              calenderSelection?.map((calender, i) => {
                return (
                  <Box
                    key={i}
                    onClick={() => onCalenderWiseChange(calender)}
                    sx={{ cursor: "pointer" }}
                  >
                    <Typography
                      sx={{
                        ml: 2,
                        fontSize: "16px",
                        color:
                          calender?.title === tabChange ? "#1170C3" : "#000",
                        backgroundColor: "transparent",
                        borderBottom:
                          calender?.title === tabChange
                            ? "3px solid #1170C3"
                            : "transparent",
                        padding: "4px 6px",
                      }}
                    >
                      {calender?.title}
                    </Typography>
                  </Box>
                );
              })}
          </Box>
        </Box>
    </Box>
        {/* Calender Section */}
        <Box sx={{ mt: 3 }}>
          {tabChange === "Week" && (
            <WeekCalendar
              hours={hours}
              dates={dates}
              groupedDataForDate={data}
              detailModalOpen={HandleMeeting}
            />
          )}
          {tabChange === "Day" && (
            <DayCalendar
              hours={hours}
              weekdates={weekdates}
              groupedDataForDate={data}
              detailModalOpen={HandleMeeting}
            />
          )}
          {tabChange === "Month" && (
            <Box sx={{ overflow: "auto" }}>
              <MonthCalendar
                dates={monthData?.dates}
                month={monthData?.month}
                data={data}
                detailModalOpen={HandleMeeting}
              />
            </Box>
          )}
          {tabChange === "Year" && (
            <Box sx={{ overflow: "auto" }}>
              <MonthCalendar
                dates={monthData?.dates}
                month={monthData?.month}
                data={data}
                detailModalOpen={HandleMeeting}
              />
            </Box>
          )}
          
        </Box>
      </div>
      {/* Meeting Popup */}
      {isModalOpen && (
        <MeetingPopup detailData={detailData} onClose={handleCloseModal} />
      )}
    </>
  );
}

export default App;
