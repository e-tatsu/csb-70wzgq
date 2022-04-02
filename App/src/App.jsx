import "./App.css";
import Calendar from "react-calendar";
import Modal from "./components/Modal";
import DayBar from "./components/DayBar";
// import { MonthBar } from "./components/MonthBar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useState, useContext } from "react";
import moment from "moment";
import "react-calendar/dist/Calendar.css";
import "./styles/calendar.css";
import "./styles/modal.css";
import { DateContext } from "./components/providers/DateProvider";
import { DayDataContext } from "./components/providers/DayDataProvider";

export default function App() {
  const [value, setValue] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setTargetValue } = useContext(DateContext);
  const { dayData, setDayData } = useContext(DayDataContext);
  const onChange = (nextValue) => {
    const work = moment(nextValue).format("YYYY-MM-DD");
    setTargetValue(work);
    setIsModalOpen(true);
    setValue(nextValue);
  };
  return (
    <div className="App">
      <Header />
      <div className="calendar-container">
        <Calendar value={value} onChange={onChange} />
      </div>
      <div className="modal-container">
        <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      </div>
      <DayBar dayData={dayData} setDayData={setDayData} />
      {/*<MonthBar />*/}
      <Footer />
    </div>
  );
}
