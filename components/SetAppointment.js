import { useEffect, useState } from "react";
import Loader from "./Loader";
const moment = require("moment");

export default function SetAppointment({ timings, id, tokenDetails }) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [loading, setLoading] = useState(true);
  const [timeSlots, setTimeSlots] = useState({
    Sunday: [],
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
  });
  const [bookedSlots, setBookedSlots] = useState({
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
    ).format("YYYY-MM-DD HH:mm");
    const res = await fetch("/api/patient/bookAppointment", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        doctor_id: Number(id),
        patient_id: Number(tokenDetails.id),
        appointment_date: date,
      }),
    });
    const result = await res.json();
    alert(result.message);
  };

  const getBookedSlots = async (in_date) => {
    let date_text = in_date.format("YYYY-MM-DD");
    const res = await fetch("/api/getDoctorAvailable", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        doctor_id: Number(id),
        date: date_text,
      }),
    });
    const result = await res.json();
    if (result[0].length != 0) {
      setBookedSlots((prev) => ({
        ...prev,
        [in_date.format("dddd")]: result[0].map((item) => item.Time),
      }));
    }
    return result[0];
  };

  useEffect(() => {
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

        getBookedSlots(nextTargetDay).then((result) => {});

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
    setLoading(false);
  }, []);
  const showTimeSlots = (id) => {
    const day = id;
    const timeSlotsDiv = document.getElementById(day);
    let booked = [];
    bookedSlots[day].map((slot) => {
      console.log(slot);
      booked.push(moment(slot.Time, "HH:mm").format("h:mm A"));
    });
    if (timeSlotsDiv == null) {
      return;
    }
    const timeSlotsButtons = timeSlotsDiv.getElementsByTagName("button");
    for (let i = 0; i < timeSlotsButtons.length; i++) {
      timeSlotsButtons[i].style.display = "inline-block";
      if (booked.includes(timeSlotsButtons[i].innerHTML)) {
        timeSlotsButtons[i].disabled = true;
        timeSlotsButtons[i].style.backgroundColor = "red";
      }
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

  useEffect(() => {
    let buttons = document.getElementById(currentSelectedDay)?.children;
    if(buttons){
      for(let button of buttons){
        bookedSlots[currentSelectedDay].map((slot) => {
        let inner = moment(slot, "HH:mm ").format("HH:mm A");
        if(inner.includes(button.innerHTML)){
          button.disabled = true;
          button.style.backgroundColor = "red";
        }
      }
  )}
    }
  
  },[bookedSlots])
  return (
    <>
      {loading && <Loader />}
      {timings.length == 0 && !loading ? (
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
