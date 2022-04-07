import EditModal from "./modalComponents/EditModal";
import AddModal from "./modalComponents/AddModal";
import DayBar from "../components/DayBar";
import { DateContext } from "./providers/DateProvider";
import { DayDataContext } from "../components/providers/DayDataProvider";
import { useContext, useState } from "react";
import "../styles/modal.css";

export default function Modal(props) {
  const { isModalOpen, setIsModalOpen } = props;
  const { targetValue } = useContext(DateContext); //押下した日付の状態管理(YYYY-MM-DD)
  const { dayData } = useContext(DayDataContext); //日付に格納されている学習データの状態管理
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); //学習一覧モーダルの表示・非表示の状態管理
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); //学習追加モーダルの表示・非表示の状態管理

  /* 関数：モーダル・ボタン・円グラフの状態変更処理 */
  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditModalOpen(false);
    setIsAddModalOpen(false);
  };
  /* 関数：学習一覧、棒グラフのモーダル表示処理 */
  const openEditModal = () => {
    if (isAddModalOpen) setIsAddModalOpen(false);
    setIsEditModalOpen(true);
  };
  /* 関数：学習追加のモーダル表示処理 */
  const openAddModal = () => {
    if (isEditModalOpen) {
      setIsEditModalOpen(false);
    }
    setIsAddModalOpen(true);
  };
  return (
    <div>
      {/* propsで取得した値(App.jsxにおける日付押下時)によって分岐 */}
      {/* isModalOpenがTrueの場合：表示・追加ボタン画面表示 */}
      {/* isModalOpenがFlaseの場合：なにも表示しない */}
      {isModalOpen ? (
        <div className="modal-overlay">
          <div className="modal-container-open">
            <div>
              <h4>選択した日付：{targetValue}</h4>
              {/* 学習一覧モーダルの表示ボタン */}
              <button
                onClick={openEditModal}
                variant="contained"
                color="primary"
                className="modal-container-open-button"
              >
                表示
              </button>
              {/* 学習追加モーダルの表示ボタン */}
              <button
                onClick={openAddModal}
                variant="contained"
                color="primary"
                className="modal-container-open-button"
              >
                追加
              </button>
              {/* 学習一覧モーダル */}
              <EditModal
                isEditModalOpen={isEditModalOpen}
                setIsEditModalOpen={setIsEditModalOpen}
              />
              {/* 学習追加モーダル */}
              <AddModal
                isAddModalOpen={isAddModalOpen}
                setIsAddModalOpen={setIsAddModalOpen}
              />
            </div>
            <DayBar dayData={dayData} isEditModalOpen={isEditModalOpen} />
            <button
              onClick={closeModal}
              variant="contained"
              color="primary"
              className="modal-container-open-button"
            >
              カレンダーに戻る
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
