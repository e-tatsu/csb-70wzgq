import { useContext, useState } from "react";
import EditModal from "./modalComponents/EditModal";
import AddModal from "./modalComponents/AddModal";
import { DateContext } from "./providers/DateProvider";
import { PieDayOpenContext } from "./providers/PieDayOpenProvider";
import Button from "@material-ui/core/Button";

export default function Modal(props) {
  const { isModalOpen, setIsModalOpen } = props;
  const { targetValue } = useContext(DateContext);
  const { setPieDayOpen } = useContext(PieDayOpenContext);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addDisabled, setAddDisabled] = useState(false);
  const [editDisabled, setEditDisabled] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditModalOpen(false);
    setIsAddModalOpen(false);
    setAddDisabled(false);
    setEditDisabled(false);
    setPieDayOpen(true);
  };
  const openEditModal = () => {
    setIsEditModalOpen(true);
    setEditDisabled(true);
  };
  const openAddModal = () => {
    setIsAddModalOpen(true);
    setAddDisabled(true);
  };
  return (
    <div>
      {isModalOpen ? (
        <div
          style={{
            border: "solid",
            borderColor: "#66bb6a",
            borderRadius: "15px",
            margin: "25px"
          }}
        >
          <h3>選択した日付：{targetValue}</h3>
          <div>
            <Button
              onClick={openEditModal}
              variant="contained"
              color="primary"
              disabled={addDisabled}
              style={{ backgroundColor: "#66bb6a", marginRight: "8px" }}
            >
              表示
            </Button>
            <Button
              onClick={openAddModal}
              variant="contained"
              color="primary"
              disabled={editDisabled}
              style={{ backgroundColor: "#66bb6a" }}
            >
              追加
            </Button>
            <EditModal
              isEditModalOpen={isEditModalOpen}
              setIsEditModalOpen={setIsEditModalOpen}
              setEditDisabled={setEditDisabled}
            />
            <AddModal
              isAddModalOpen={isAddModalOpen}
              setIsAddModalOpen={setIsAddModalOpen}
              setAddDisabled={setAddDisabled}
            />
          </div>
          <Button
            onClick={closeModal}
            variant="contained"
            color="primary"
            style={{ margin: "10px", backgroundColor: "#66bb6a" }}
          >
            最初の画面に戻る
          </Button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
