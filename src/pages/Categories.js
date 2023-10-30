import React from "react";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import Layout from "../components/Layout/Layout";

const Categories = () => {
  const categories = useCategory();

  const categoryButtonStyle = {
    backgroundColor: "#3498db", // Button background color
    color: "#fff", // Button text color
    padding: "10px 20px", // Padding for the button
    borderRadius: "5px", // Rounded corners
    textDecoration: "none", // Remove underlines
    margin: "10px", // Spacing between buttons
    display: "inline-block",
  };

  return (
    <Layout title={"All Categories"}>
      <div className="container">
        <h2 className="text-center my-4">Explore Categories</h2>
        <div className="row">
          {categories.map((c) => (
            <div className="col-md-4" key={c._id}>
              <Link to={`/category/${c.slug}`} style={categoryButtonStyle}>
                {c.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
