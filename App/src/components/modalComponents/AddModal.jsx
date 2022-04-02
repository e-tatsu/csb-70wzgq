import { useState, useContext } from "react";
import Select from "react-select";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { DateContext } from "../providers/DateProvider";
import Button from "@material-ui/core/Button";

export default function AddModal(props) {
  const [selectedVal, setSelectedVal] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const { targetValue } = useContext(DateContext);
  const { isAddModalOpen, setIsAddModalOpen, setAddDisabled } = props;
  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setAddDisabled(false);
  };
  const sendAchieve = async (event) => {
    event.preventDefault();
    const { field } = event.target.elements;
    if (selectedVal.value === undefined || selectedTime.value === undefined) {
      alert("値を入れてください。");
    } else {
      setIsAddModalOpen(false);
      setAddDisabled(false);
      alert("登録しました！");
      const usersCollectionRef = collection(db, "users");
      const documentRef = await addDoc(usersCollectionRef, {
        lang: selectedVal.value,
        field: field.value,
        time: selectedTime.value,
        date: targetValue
      });
    }
  };
  const langData = [
    { value: "Java", label: "Java" },
    { value: "React.js", label: "React.js" },
    { value: "firebase", label: "firebase" },
    { value: "Vue.js", label: "Vue.js" },
    { value: "Next.js", label: "Next.js" }
  ];
  const timeData = [
    { value: 30, label: "30分" },
    { value: 60, label: "60分" },
    { value: 90, label: "1時間30分" },
    { value: 120, label: "2時間" },
    { value: 180, label: "3時間" },
    { value: 240, label: "4時間" },
    { value: 300, label: "5時間" },
    { value: 360, label: "6時間" }
  ];
  const addValue = (Val) => {
    setSelectedVal(Val);
  };
  const addTime = (Val) => {
    setSelectedTime(Val);
  };
  return (
    <div>
      {isAddModalOpen ? (
        <div
          style={{
            border: "solid",
            borderColor: "#66bb6a",
            borderRadius: "15px",
            margin: "10px"
          }}
        >
          <h3>学習記録</h3>
          <h4>選択した日付：{targetValue}</h4>
          <div
            style={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex"
            }}
          >
            <form onSubmit={sendAchieve}>
              <div style={{ display: "flex" }}>
                <label style={{ marginTop: "7px" }}>言語：</label>
                <Select options={langData} onChange={addValue} />
              </div>
              <div style={{ display: "flex", marginTop: "12px" }}>
                <label>分野：</label>
                <input type="text" name="field" placeholder="基礎文法" />
              </div>
              <div style={{ display: "flex", marginTop: "12px" }}>
                <label style={{ marginTop: "7px" }}>時間：</label>
                <Select options={timeData} onChange={addTime} />
              </div>
              <div>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ margin: "10px", backgroundColor: "#66bb6a" }}
                >
                  登録
                </Button>
              </div>
            </form>
          </div>
          <Button
            onClick={closeAddModal}
            variant="contained"
            color="primary"
            style={{ margin: "10px", backgroundColor: "#66bb6a" }}
          >
            ひとつ前に戻る
          </Button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
