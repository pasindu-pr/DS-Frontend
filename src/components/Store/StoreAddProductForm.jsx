import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import swal from "sweetalert";

const StoreAddProductForm = () => {
  const [name, setName] = useState("");
  const [description, setdescription] = useState("");
  const [img, setImg] = useState("");
  const [price, setPrice] = useState("");
  const [stockCount, setStockCount] = useState("");
  const navigate = useNavigate();
  const [errors, setErrors] = useState("");

  const saveProduct = async (e) => {
    e.preventDefault();
    const product = {
      name,
      description,
      image: img,
      price,
      stockCount,
    
    };

    if (
      product.name.length <= 0 ||
      product.description.length <= 0 ||
      product.image.length <= 0 ||
      product.price.length <= 0 ||
      product.stockCount.length <= 0
   
    ) {
      setErrors(true);
      return;
    }
//must check endpoint
    axios
      .post("http://20.241.129.61:5000/api/Products", product)
      .then((response) => {
        swal({
          title: "Product Added Successfully!",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#12af39",
          className: "store-swal-button",
        }).then(() => {
          navigate(`/store/products/product/${response.data._id}`);
        });
      });
  };

  return (
    <div className="store-add-product py-4 d-flex align-items-center flex-column justify-content-center">
      <div className=" store-form-outer-layer">
        <h2 className="display-6"> Add Product to Store </h2>
        <small id="emailHelp" className="form-text text-muted">
          Enter the details of the new product
        </small>

        {errors && (
          <div className="text-danger mt-4 text-center">
            All the fields are required! Please fillout all the fields to add
            product to the store
          </div>
        )}

        <div className="store-add-product-form-inner  py-4">
          <form>
            <div id="store-form-group" className="form-group mt-2">
              <label className="my-1">Name</label>
              <input
                type="email"
                class={`form-control ${errors.nameError && "is-invalid"}`}
                aria-describedby="emailHelp"
                placeholder="Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div id="store-form-group" className="form-group mt-2">
              <label className="my-1">Description</label>
              <input
                type="text"
                class={`form-control ${errors.nameError && "is-invalid"}`}
                aria-describedby="emailHelp"
                placeholder="Desiption"
                value={description}
                onChange={(e) => {
                  setdescription(e.target.value);
                }}
              />
            </div>

             <div className="form-group my-4">
              <label className="my-1">Image</label>
              <input
                type="text"
                className="form-control"
                placeholder="Image"
                value={img}
                onChange={(e) => {
                  setImg(e.target.value);
                }}
              />
            </div>

            <div className="form-group my-4">
              <label className="my-1">Unit Price</label>
              <input
                type="number"
                className="form-control"
                placeholder="Unit Price"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </div>

           

            <div className="form-group my-4">
              <label className="my-1">Stock Quantity</label>
              <input
                type="number"
                className="form-control"
                placeholder="Unit Price"
                value={stockCount}
                onChange={(e) => {
                  setStockCount(e.target.value);
                }}
              />
            </div>


            
            <button
              type="submit"
              id="product-details-buy-now"
              className="btn product-details-buy-now w-100"
              onClick={saveProduct}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StoreAddProductForm;