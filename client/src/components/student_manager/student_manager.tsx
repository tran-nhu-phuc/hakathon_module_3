import "./student_manager.css";
import React, { useEffect, useState } from "react";
import { Button, Popconfirm, Table, message } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import ModalCreate from "../modal_create/modal_create";
import ModalEdit from "../modal_edit/modal_edit";
import axios from "axios";
interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}
const onChange: TableProps<DataType>["onChange"] = (
  pagination,
  sorter,
  extra
) => {
  console.log("params", pagination, sorter, extra);
};
const StudentManager: React.FC = () => {
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [dataUser, setDataUser] = useState<any>([]);
  const [dataIndexUser, setDataIndexUser] = useState<any>();
  const [status, setStatus] = useState<boolean>(false);
  const changeStatus = () => {
    setStatus(!status);
  };
  console.log(dataIndexUser);
  const handleCreate = () => {
    setOpenCreateModal(false);
  };
  const handleEdit = () => {
    setOpenEditModal(false);
  };
  const handleGetRow = (core: any) => {
    setDataIndexUser(core);
  };
  const confirm = async (e: any) => {
    try {
      await axios.delete(`http://localhost:4000/user/${dataIndexUser.id}`);
    } catch (error) {}
    message.success("Click on Yes");
    changeStatus();
  };
  const cancel = (e: any) => {
    console.log(e);
    message.error("Click on No");
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "",
      dataIndex: "",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "",
      dataIndex: "",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "",
      dataIndex: "",
    },
    {
      title: "Action",
      dataIndex: "Action",
      render() {
        return (
          <div className="action-manager-student">
            <button onClick={() => setOpenEditModal(true)}>Update</button>
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              onConfirm={confirm}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button danger>Delete</Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    const getAllUser = async () => {
      try {
        const getUserApi: any = await axios.get("http://localhost:4000/user");
        setDataUser(getUserApi.data);
      } catch (error) {
        return error;
      }
    };
    getAllUser();
  }, [status]);
  return (
    <div className="table-manager-student">
      <div className="box">
        <button
          className="btn-create-student"
          onClick={() => {
            setOpenCreateModal(true);
          }}
        >
          Create Student
        </button>
        <div className="header-table-student">
          <h2>Student List</h2>
        </div>
        <Table
          columns={columns}
          dataSource={dataUser}
          onChange={onChange}
          className="table"
          onRow={(record) => ({
            onClick: () => handleGetRow(record),
          })}
        />
      </div>
      {openCreateModal ? (
        <ModalCreate handleCreate={handleCreate} changeStatus={changeStatus} />
      ) : null}
      {openEditModal ? <ModalEdit handleEdit={handleEdit} /> : null}
    </div>
  );
};

export default StudentManager;
