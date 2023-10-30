import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal, Button, Table, Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/category/create-category", {
        name,
      });
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in the input form");
    }
  };

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting categories");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      const { data } = await axios.delete(`/api/v1/category/delete-category/${categoryId}`);
      if (data.success) {
        toast.success("Category is deleted");
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, category) => (
        <span>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => {
              setVisible(true);
              setUpdatedName(category.name);
              setSelected(category);
            }}
          />
          <Button
            type="link"
            icon={<DeleteOutlined />}
            onClick={() => {
              handleDeleteCategory(category._id);
            }}
          />
        </span>
      ),
    },
  ];

  const cardStyle = {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  };

  return (
    <Layout title={"Dashboard - Create Category"}>
      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="mb-4">Manage Categories</h1>
            <Card style={cardStyle}>
              <CategoryForm handleSubmit={handleFormSubmit} value={name} setValue={setName} />
            </Card>
            <Card style={{ ...cardStyle, marginTop: "20px" }}>
              <Table dataSource={categories} columns={columns} />
            </Card>
            <Modal onCancel={() => setVisible(false)} footer={null} visible={visible}>
              <Card style={cardStyle}>
                <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdateCategory} />
              </Card>
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
