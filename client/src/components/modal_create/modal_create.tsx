import { useEffect, useState } from "react";
import "./modal_create.css";
import axios from "axios";
interface Props {
  handleCreate: Function;
  changeStatus: Function;
}
const ModalCreate: React.FC<Props> = (props: Props) => {
  const [inputName, setInputName] = useState<HTMLInputElement>();
  const [content, setContent] = useState<HTMLInputElement>();
  const handleSubmit = async () => {
    try {
      const postUser = {
        name: inputName,
        description: content,
      };
      await axios.post("http://localhost:4000/user", postUser);
      console.log("ok");
    } catch (error) {}
    props.changeStatus();
    props.handleCreate();
  };
  return (
    <div className="box-modal-create">
      <div className="table-create-student">
        <p className="header-table-modal-create-student">
          Create a new student
        </p>
        <div className="create-name-student">
          <strong>Name</strong>
          <input
            type="text"
            placeholder="Name"
            onChange={(e: any) => setInputName(e.target.value)}
          />
        </div>
        <div className="create-description-student">
          <strong>Description</strong>
          <textarea
            placeholder="."
            onChange={(e: any) => setContent(e.target.value)}
          />
        </div>
        <div className="btn-create-student">
          <button onClick={handleSubmit}>Create</button>
        </div>
        <button
          className="btn-close-modal-create"
          onClick={() => props.handleCreate()}
        >
          x
        </button>
      </div>
    </div>
  );
};
export default ModalCreate;
