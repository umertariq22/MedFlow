import { useEffect, useState } from "react";
const moment = require("moment");

export default function SetAppointment({ timings,id,tokenDetails }) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [timeSlots, setTimeSlots] = useState({
    Sunday: [],
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
  });
  const [nextDates, setNextDates] = useState({
    Sunday: "",
    Monday: "",
    Tuesday: "",
    Wednesday: "",
    Thursday: "",
    Friday: "",
    Saturday: "",
  });
  const [currentSelectedDay, setCurrentSelectedDay] = useState("");
  const [currentSelectedTime, setCurrentSelectedTime] = useState("");

  useEffect(() => {
    days.map((day) => {
      if (day == currentSelectedDay) {
        showTimeSlots(day);
      } else {
        hideTimeSlots(day);
      }
    });
  }, [currentSelectedDay]);

  const bookAppointment = async () => {
    if (currentSelectedDay == "" || currentSelectedTime == "") {
      alert("Please select a day and time");
      return;
    }
    let date = moment(
      `${nextDates[currentSelectedDay]} ${currentSelectedTime}`,
      "DD-MM-YY h:mm A"
    ).format("DD-MM-YY HH:mm");
    const res = await fetch("/api/patient/bookAppointment", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        doctor_id: Number(id),
        patient_id: Number(tokenDetails.id),
        appointment_date: date,
      })
    });
    const result = await res.json();
    alert(result.message);
  };
  useEffect(() => {
    console.log(id,tokenDetails.id)
    timings = timings.sort((a, b) => {
      return days.indexOf(a.timing_day) - days.indexOf(b.timing_day);
    });
    if (timings[0].length != 0) {
      timings.map((timing, index) => {
        if (index == 0) {
          setCurrentSelectedDay(timing.timing_day);
        }
        const nextTargetDay = moment().day(timing.timing_day);
        if (moment().isAfter(nextTargetDay)) {
          nextTargetDay.add(1, "week");
        }
        setNextDates((prev) => ({
          ...prev,
          [timing.timing_day]: nextTargetDay.format("DD-MM-YY"),
        }));
        const startTime = timing.start_time;
        const endTime = timing.end_time;
        const startMoment = moment(startTime, "HH:mm");
        const endMoment = moment(endTime, "HH:mm");
        let temp = [];
        while (startMoment.isBefore(endMoment)) {
          temp.push(startMoment.format("h:mm A"));
          startMoment.add(15, "minutes");
        }
        setTimeSlots((prev) => ({
          ...prev,
          [timing.timing_day]: temp,
        }));
      });
    }
  }, []);
  const showTimeSlots = (id) => {
    const day = id;
    const timeSlotsDiv = document.getElementById(day);
    if (timeSlotsDiv == null) {
      return;
    }
    const timeSlotsButtons = timeSlotsDiv.getElementsByTagName("button");
    for (let i = 0; i < timeSlotsButtons.length; i++) {
      timeSlotsButtons[i].style.display = "inline-block";
    }
  };
  const hideTimeSlots = (id) => {
    const day = id;
    const timeSlotsDiv = document.getElementById(day);
    if (timeSlotsDiv == null) {
      return;
    }
    const timeSlotsButtons = timeSlotsDiv.getElementsByTagName("button");
    for (let i = 0; i < timeSlotsButtons.length; i++) {
      timeSlotsButtons[i].style.display = "none";
    }
  };
  return (
    <>
      {timings.length == 0 ? (
        <h1>Timing Not Found</h1>
      ) : (
        timings.map((timing, index) => {
          return (
            <div key={index}>
              <button onClick={() => setCurrentSelectedDay(timing.timing_day)}>
                {timing.timing_day} - {nextDates[timing.timing_day]}
              </button>
              <div id={timing.timing_day}>
                {timeSlots[timing.timing_day].map((slot, index) => {
                  return (
                    <button
                      onClick={() => setCurrentSelectedTime(slot)}
                      key={index}
                      style={{ display: "none" }}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })
      )}
      <button onClick={bookAppointment}>Book Appointment</button>
    </>
  );
}
