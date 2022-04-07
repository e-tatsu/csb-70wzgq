import Calendar from "react-calendar";
import moment from "moment";
import Modal from "./components/Modal";
import Header from "./components/Header";
import { DateContext } from "./components/providers/DateProvider";
import "react-calendar/dist/Calendar.css";
import "./styles/calendar_example.css";
import "./styles/modal.css";
import "./styles/App.css";
import { useState, useContext } from "react";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false); //モーダルの表示・非表示の状態管理
  const { setTargetValue } = useContext(DateContext); //押下した日付の状態管理(YYYY-MM-DD)
  /* 関数:日付押下時に実行する処理 */
  const onChange = (nextValue) => {
    const changeDate = moment(nextValue).format("YYYY-MM-DD");
    setTargetValue(changeDate);
    setIsModalOpen(true); //モーダルオープン
  };
  return (
    <div className="App">
      <div>
        <Header />
      </div>
      <div className="calendar-container">
        <Calendar onChange={onChange} />
      </div>
      <div className="modal-container">
        <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      </div>
    </div>
  );
}
