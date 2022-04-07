import { useEffect, useContext } from "react";
import { DateContext } from "../providers/DateProvider";
import { DayDataContext } from "../providers/DayDataProvider";
import { db } from "../../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import "../../styles/modal.css";

export default function EditModal(props) {
  const { targetValue } = useContext(DateContext);
  const { dayData, setDayData } = useContext(DayDataContext);
  const { isEditModalOpen } = props;
  // /* データ取得:FireBaseで管理しているデータを取得　*/
  /* 条件:選択した日付のデータ(targetValue)と同じ日付のデータ */
  useEffect(() => {
    const usersCollectionRef = collection(db, "users");
    getDocs(usersCollectionRef).then((querySnapshot) => {
      /* 学習データオブジェクトをdayDataに格納 */
      setDayData(
        querySnapshot.docs
          .filter((doc) => doc.data().date === targetValue)
          .map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
  }, [targetValue, setDayData]);
  /* 関数：学習データの削除処理 */
  const deleteAchieve = async (id) => {
    const userDocumentRef = doc(db, "users", id);
    await deleteDoc(userDocumentRef);
    alert("削除しました");
  };
  return (
    <div>
      {/* propsで取得した値(Modal.jsxにおける表示押下時)によって分岐 */}
      {/* isEditModalOpenがTrueの場合：学習一覧表示 */}
      {/* isEditModalOpenがFlaseの場合：なにも表示しない */}
      {isEditModalOpen ? (
        <div>
          <h3>学習一覧</h3>
          <div className="modal-container-edit">
            {/* データ取得時、データが存在しない場合に表示 */}
            {!Object.keys(dayData).length ? (
              <div>
                <h4>データがありません。</h4>
              </div>
            ) : (
              <></>
            )}
            {dayData.map((achieve) => (
              <div key={achieve.id} className="modal-container-edit-elements">
                <ul>
                  <li>言語　：　{achieve.lang}</li>
                  <li>教材　：　{achieve.book}</li>
                  <li>分野　：　{achieve.field}</li>
                  <li>不明点：　{achieve.unknown}</li>
                  <li>時間　：　{achieve.time}分</li>
                </ul>
                <button
                  type="button"
                  onClick={() => deleteAchieve(achieve.id)}
                  variant="contained"
                  color="primary"
                  className="modal-container-open-button"
                >
                  削除
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
