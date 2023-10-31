import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart();

  // Initial details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  // Get product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  // Get similar products
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  const productImageStyle = {
    maxWidth: "100%",
    height: "auto",
  };

  const productInfoStyle = {
    backgroundColor: "#f5f5f5",
    padding: "20px",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  };

  const productButtonStyle = {
    margin: "5px",
    backgroundColor: "#3498db",
    color: "#fff",
    borderRadius: "5px",
    border: "none",
    padding: "10px 20px",
    cursor: "pointer",
  };

  const similarProductCardStyle = {
    width: "18rem",
    margin: "10px",
    borderRadius: "10px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  };

  return (
    <Layout>
      <div className="container mt-2">
        <div className="row">
          <div className="col-md-6">
            <img
              src={`/api/v1/product/product-photo/${product._id}`}
              alt={product.name}
              style={productImageStyle}
            />
          </div>
          <div className="col-md-6" style={productInfoStyle}>
            <h1 className="text-center">Product Details</h1>
            <h4>Name: {product.name}</h4>
            <p>Description: {product.description}</p>
            <h4>Price: ${product.price}</h4>
            <h4>Category: {product?.category?.name}</h4>
            <button
              style={productButtonStyle}
              onClick={() => {
                setCart((prev) => [...prev, product]);
                localStorage.setItem(
                  "cart",
                  JSON.stringify([...cart, product])
                );
              }}
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
      <hr />
      <div className="container">
        <h2 className="text-center my-4">Similar Products</h2>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div className="card" style={similarProductCardStyle} key={p._id}>
              <img
                src={`/api/v1/product/product-photo/${p?._id}`}
                alt={p.name}
                style={{ maxWidth: "100%", height: "auto" }}
              />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.description.substring(0, 60)}...</p>
                <p className="card-text">$ {p.price}</p>
                <button
                  style={productButtonStyle}
                  onClick={() => navigate(`/product/${p.slug}`)}
                >
                  More Details
                </button>
                <button style={productButtonStyle}
                onClick={() => {
                  setCart((prev) => [...prev, p]);
                  localStorage.setItem(
                    "cart",
                    JSON.stringify([...cart, p])
                  );
                }}
                
                >ADD TO CART</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
