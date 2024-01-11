import { useState } from "react";
import "./modal_edit.css";
interface Props {
  handleEdit: Function;
}
const ModalEdit: React.FC<Props> = (props: Props) => {
  const [valueInput, setValueInput] = useState<any>();
  return (
    <div className="box-modal-edit">
      <div className="table-edit-student">
        <p className="header-table-modal-edit-student">Edit student</p>
        <div className="edit-name-student">
          <strong>Name</strong>
          <input
            type="text"
            placeholder="Name"
            onChange={(e: any) => setValueInput(e.target.value)}
          />
        </div>
        <div className="edit-description-student">
          <strong>Description</strong>
          <textarea placeholder="." />
        </div>
        <div className="btn-edit-student">
          <button>Save</button>
        </div>
        <button
          className="btn-close-modal-edit"
          onClick={() => {
            props.handleEdit();
          }}
        >
          x
        </button>
      </div>
    </div>
  );
};
export default ModalEdit;
