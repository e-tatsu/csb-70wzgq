import { useState, useContext } from "react";
import Select from "react-select";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { DateContext } from "../providers/DateProvider";

export default function AddModal(props) {
  const [selectedVal, setSelectedVal] = useState(""); //選択した言語を状態管理
  const [selectedTime, setSelectedTime] = useState(""); //選択した時間を状態管理
  const [selectedBook, setSelectedBook] = useState(""); //選択した教材を状態管理
  const { targetValue } = useContext(DateContext);
  const { isAddModalOpen, setIsAddModalOpen } = props;
  /* 関数:FireBaseに学習データをインサートする処理 */
  const sendAchieve = async (event) => {
    event.preventDefault();
    const { field, unknown } = event.target.elements;
    if (
      selectedVal.value === undefined ||
      selectedTime.value === undefined ||
      field.value === ""
    ) {
      alert("値を入れてください。");
    } else {
      setIsAddModalOpen(false);
      alert("登録しました！");
      const usersCollectionRef = collection(db, "users");
      const documentRef = await addDoc(usersCollectionRef, {
        lang: selectedVal.value, //言語
        book: selectedBook.value, //教材
        field: field.value, //分野
        unknown: unknown.value, //不明点
        time: selectedTime.value, //時間
        date: targetValue
      });
    }
  };
  /* 選択データ */
  const langData = [
    { value: "Java", label: "Java" },
    { value: "React.js", label: "React.js" },
    { value: "firebase", label: "firebase" },
    { value: "Vue.js", label: "Vue.js" },
    { value: "Next.js", label: "Next.js" }
  ];
  const textBookData = [
    { value: "黒本", label: "黒本" },
    { value: "紫本", label: "紫本" },
    { value: "白本", label: "白本" },
    { value: "その他", label: "その他" }
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
  /* 関数:選択した言語を状態管理 */
  const addValue = (Val) => {
    setSelectedVal(Val);
  };
  const addBook = (Val) => {
    setSelectedBook(Val);
  };
  /* 関数:選択した時間を状態管理 */
  const addTime = (Val) => {
    setSelectedTime(Val);
  };
  return (
    <div>
      {/* propsで取得した値(Modal.jsxにおける表示押下時)によって分岐 */}
      {/* isAddModalOpenがTrueの場合：学習一覧表示 */}
      {/* isAddModalOpenがFlaseの場合：なにも表示しない */}
      {isAddModalOpen ? (
        <div className="modal-container-add">
          <h3>学習追加</h3>
          <form onSubmit={sendAchieve}>
            <div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <label style={{ marginTop: "7px" }}>言語：</label>
                <Select options={langData} onChange={addValue} />
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: "12px",
                  justifyContent: "center"
                }}
              >
                <label style={{ marginTop: "7px" }}>教材：</label>
                <Select options={textBookData} onChange={addBook} />
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: "12px",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <label>分野：</label>
                <input
                  type="text"
                  name="field"
                  placeholder="基礎文法"
                  style={{
                    width: "60%",
                    maxWidth: "108px",
                    height: "35px",
                    justifyContent: "center"
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: "12px",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <label>不明点：</label>
                <input
                  type="text"
                  name="unknown"
                  placeholder="継承"
                  style={{
                    width: "60%",
                    maxWidth: "108px",
                    height: "35px",
                    justifyContent: "center"
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  marginTop: "12px",
                  justifyContent: "center"
                }}
              >
                <label style={{ marginTop: "7px" }}>時間：</label>
                <Select options={timeData} onChange={addTime} />
              </div>
            </div>
            <div>
              <button
                type="submit"
                variant="contained"
                color="primary"
                className="modal-container-open-button"
              >
                登録
              </button>
            </div>
          </form>
          {/*<Button
            onClick={closeAddModal}
            variant="contained"
            color="primary"
            className="modal-container-open-buttonReturn"
          >
            戻る
          </Button>*/}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
