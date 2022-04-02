import { useEffect, useContext } from "react";
import { db } from "../../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { DateContext } from "../providers/DateProvider";
import Button from "@material-ui/core/Button";
import { DayDataContext } from "../providers/DayDataProvider";
import { PieDayOpenContext } from "../providers/PieDayOpenProvider";
import "../../styles/modal.css";

export default function EditModal(props) {
  const { targetValue } = useContext(DateContext);
  const { dayData, setDayData } = useContext(DayDataContext);
  const { setPieDayOpen } = useContext(PieDayOpenContext);
  const { isEditModalOpen, setIsEditModalOpen, setEditDisabled } = props;
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditDisabled(false);
    setPieDayOpen(true);
  };
  useEffect(() => {
    const usersCollectionRef = collection(db, "users");
    getDocs(usersCollectionRef).then((querySnapshot) => {
      setDayData(
        querySnapshot.docs
          .filter((doc) => doc.data().date === targetValue)
          .map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
  }, [targetValue, setDayData]);
  const deleteAchieve = async (id) => {
    const userDocumentRef = doc(db, "users", id);
    await deleteDoc(userDocumentRef);
    alert("削除しました");
  };
  return (
    <div>
      {isEditModalOpen ? (
        <div>
          <h3>学習一覧</h3>
          <div
            style={{
              margin: "0 auto",
              maxWidth: "100%",
              display: "flex",
              justifyContent: "space-around",
              flexWrap: "wrap"
            }}
          >
            {!Object.keys(dayData).length ? (
              <div>
                <h4>データがありません。</h4>
              </div>
            ) : (
              <></>
            )}
            {dayData.map((achieve) => (
              <div
                key={achieve.id}
                style={{
                  border: "solid",
                  borderColor: "#66bb6a",
                  borderRadius: "15px",
                  padding: "15px",
                  margin: "10px"
                }}
              >
                <ul>
                  <li>{achieve.lang}</li>
                  <li>{achieve.field}</li>
                  <li>{achieve.time}分</li>
                </ul>
                <Button
                  type="button"
                  onClick={() => deleteAchieve(achieve.id)}
                  variant="contained"
                  color="primary"
                  style={{ margin: "10px", backgroundColor: "#66bb6a" }}
                >
                  削除
                </Button>
              </div>
            ))}
          </div>
          <Button
            onClick={closeEditModal}
            variant="contained"
            color="primary"
            style={{
              margin: "10px",
              backgroundColor: "#66bb6a"
            }}
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
