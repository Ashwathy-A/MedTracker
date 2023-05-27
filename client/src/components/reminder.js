// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import DateTimePicker from "react-datetime-picker";
// import '../styles/reminder.css';

// function Reminder() {
//   const [reminderMsg, setReminderMsg] = useState("");
//   const [reminderAt, setReminderAt] = useState(null);
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [reminderList, setReminderList] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:3002/getAllReminder").then(res => setReminderList(res.data));
//   }, []);

//   const handleDateTimeChange = (date) => {
//     setReminderAt(date);
//     setShowDatePicker(false);
//   };

//   const addReminder = () => {
//     axios.post("http://localhost:3002/addReminder", { reminderMsg, reminderAt })
//       .then(res => setReminderList(res.data));
//     setReminderMsg("");
//     setReminderAt(null);
//     if (!reminderMsg || !reminderAt) {
//         return;
//     }
//   };

//   const deleteReminder = (id) => {
//     axios.post("http://localhost:3002/deleteReminder", { id })
//       .then(res => setReminderList(res.data));
//       const updatedReminderList = [...reminderList];
//       updatedReminderList.splice(id, 1);
//       setReminderList(updatedReminderList);
//   };

//   const newReminder = {
//     reminderMsg,
//     reminderAt,
//   };

//   setReminderList(prevList => [...prevList, newReminder]);
//     setReminderMsg("");
//     setReminderAt("");

//   return (
//     <div className="homepage">
//       <div className="homepage_header">
//         <h1>Remind Me 🙋‍♂️</h1>
//         <input type="text" placeholder="Reminder notes here..." value={reminderMsg} onChange={e => setReminderMsg(e.target.value)} />
//         <div className="datetime_container">
//           <input type="text" value={reminderAt ? reminderAt.toLocaleString() : ""} onFocus={() => setShowDatePicker(true)} readOnly />
//           {showDatePicker && (
//             <DateTimePicker
//               value={reminderAt}
//               onChange={handleDateTimeChange}
//               minDate={new Date()}
//               disableClock
//             />
//           )}
//         </div>
//         <div className="button" onClick={addReminder}>Add Reminder</div>
//       </div>

//       <div className="homepage_body">
//         {reminderList.map(reminder => (
//           <div className="reminder_card" key={reminder._id}>
//             <h2>{reminder.reminderMsg}</h2>
//             <h3>Remind Me at:</h3>
//             <p>{String(new Date(reminder.reminderAt.toLocaleString(undefined, { timezone: "Asia/Kolkata" })))}</p>
//             <div className="button" onClick={() => deleteReminder(reminder._id)}>Delete</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Reminder;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify/dist/react-toastify.esm.js";
import "react-toastify/dist/ReactToastify.css";


import '../styles/reminder.css';

function Reminder() {
  const [reminderMsg, setReminderMsg] = useState("");
  const [remindAt, setRemindAt] = useState("");
  const [reminderList, setReminderList] = useState([]);
  

  useEffect(() => {
    // axios.get("http://localhost:3002/").then(res => setReminderList(res.data));
  }, []);

  const addReminder = () => {
    if (!reminderMsg || !remindAt) {
      return;
    }

    const newReminder = {
      reminderMsg,
      remindAt,
    };

    setReminderList(prevList => [...prevList, newReminder]);
    setReminderMsg("");
    setRemindAt("");
    scheduleReminder(newReminder);
  };

  const deleteReminder = (index) => {
    const updatedReminderList = [...reminderList];
    updatedReminderList.splice(index, 1);
    setReminderList(updatedReminderList);
  };

  const scheduleReminder = (reminder) => {
    const currentTime = new Date().getTime();
    const reminderTime = new Date(reminder.remindAt).getTime();
    const delay = reminderTime - currentTime;

    if (delay <= 0) {
      // Time has already passed
      console.log("Time has already passed for the reminder:", reminder.reminderMsg);
      return;
    }

    setTimeout(() => {
      console.log("Time is up! Send a message for the reminder:", reminder.reminderMsg);
      
      showNotification(reminder.reminderMsg+',take your  medicine');
    }, delay);
  };

//   const reminderTimeout = reminderDateTime.getTime() - currentDateTime.getTime();
//   setTimeout(() => {
//     toast.info("Take your medicine!"); // Show the reminder message
//   }, reminderTimeout);

  const showNotification = (message) => {
    toast.info(message, {
      position: toast.POSITION.TOP_RIGHT
    });
  };

  return (
    <div className="homepage">
      <div className="homepage_header">
        <h1>Remind Me 🙋‍♂️</h1>
        <input type="text" placeholder="Reminder notes here..." value={reminderMsg} onChange={e => setReminderMsg(e.target.value)} />
        <input type="time" value={remindAt} onChange={e => setRemindAt(e.target.value)} />
        <div className="button" onClick={addReminder}>Add Reminder</div>
      </div>

      <div className="homepage_body">
        {reminderList.map((reminder, index) => (
          <div className="reminder_card" key={index}>
            <h2>{reminder.reminderMsg}</h2>
            <h3>Remind Me at:</h3>
            <p>{reminder.remindAt}</p>
            <div className="button" onClick={() => deleteReminder(index)}>Delete</div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
}

export default Reminder;