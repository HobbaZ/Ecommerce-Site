import React, { useState, useEffect } from "react";
import { Container, Button, Form } from "react-bootstrap";
import Auth from "../utils/auth";
import { useParams } from "react-router-dom";
import CategoryOptions from "../components/CategoryOptions";

const ProductEdit = () => {
  const [stores, setStoreData] = useState([]);

  // state for messages
  const [error, setError] = useState("");

  const { id } = useParams();

  // state for messages
  const [infoMessage, setInfoMessage] = useState("");

  const [product, setProduct] = useState({
    product: {},
  });

  //loading state
  const [loading, setLoading] = useState(false);

  const [formInput, setFormInput] = useState({
    name: product.product.name,
    description: product.product.description,
    brand: product.product.brand,
    category: product.product.category,
    price: product.product.price,
    limit: product.product.limit,
    numberinStock: product.product.numberinStock,
    store: product.product.store,
    image: product.product.image,
  });

  document.title = "Edit product";

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/products/${id}`);

        if (!response.ok) {
          setLoading(false);
          throw new Error(
            "something went wrong getting product data!",
            response
          );
        }

        const productData = await response.json();
        setProduct(productData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        console.error(err);
      }
    };
    getData();
  }, [id]);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = Auth.loggedIn()
          ? Auth.getToken()
          : window.location.replace("/login");

        if (!token) {
          console.log("Need to be logged in to do this");
          window.location.replace("/login");
          return false;
        }

        const response = await fetch(`/api/users/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          setError("something went wrong getting user data!");
          throw new Error("something went wrong getting user data!");
        }

        const user = await response.json();

        const storeData = await Promise.all(
          user.stores.map(async (storeId) => {
            const storeResponse = await fetch(`/api/stores/${storeId}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
                authorization: `Bearer ${token}`,
              },
            });
            if (!storeResponse.ok) {
              throw new Error(`Failed to fetch store ${storeId}`);
            }
            return storeResponse.json();
          })
        );

        console.log(storeData);
        setStoreData(storeData);
      } catch (err) {
        console.error(err);
      }
    };
    getUserData();
  }, []);

  function cancelAction() {
    setFormInput("");
    window.location.replace("/myproducts");
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formInput) {
      return false;
    }

    //Send data to update product endpoint
    try {
      const token = Auth.loggedIn()
        ? Auth.getToken()
        : window.location.replace("/login");

      if (!token) {
        console.log("Need to be logged in to do this");
        window.location.replace("/login");
        return false;
      }

      const response = await fetch(`/api/products/${id}`, {
        method: "PUT",
        body: JSON.stringify({ ...formInput }),
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("something went wrong updating the product!", response);
      }

      console.log(response);
      window.location.replace("/myproducts");
      setFormInput("");
    } catch (err) {
      console.error("Error updating the product", err);
    }
  };

  //Delete product if logged in
  const deleteProduct = async () => {
    try {
      const token = Auth.loggedIn()
        ? Auth.getToken()
        : window.location.replace("/login");

      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(
          "something went wrong with deleting product!",
          response
        );
      }

      //Delete product
      setInfoMessage("product deleted!");
      console.log("product deleted");
      window.location.replace("/myproducts");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = async (event) => {
    const { name, value } = event.target;
    if (name === "store") {
      const selectedStore = stores.find(
        (store) => store.store.storeName === value
      );
      // Set the store field to the selected store's ID
      setFormInput({ ...formInput, [name]: selectedStore.store._id });
      console.log(formInput.store);
    } else {
      setFormInput({ ...formInput, [name]: value });
    }
  };

  return (
    <>
      {Auth.loggedIn() && Auth.getProfile().data.isAdmin ? (
        <Container fluid>
          {console.log(id)};
          <div className="col-sm-8 col-md-4 mt-5 mx-auto">
            <div>
              <h1 className="text-center">Editing {product.product.name}</h1>

              <Form onSubmit={handleSubmit} className={`mx-auto`}>
                <Form.Group className="mb-3">
                  <label>Edit Product Name</label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formInput.name || product.product.name}
                    placeholder="Your product Name"
                    onChange={handleChange}
                    minLength={2}
                  />
                </Form.Group>

                {formInput.name !== "" && formInput.name?.length < 2 && (
                  <p className="text-center text-danger" role="alert">
                    Product name needs to be at least 2 characters
                  </p>
                )}

                <Form.Group className="mb-3">
                  <label>Edit Product Description</label>
                  <textarea
                    type="text"
                    rows={5}
                    className="w-100"
                    name="description"
                    value={formInput.description || product.product.description}
                    placeholder={`${formInput.name} sells a variety of products...`}
                    onChange={handleChange}
                    minLength={5}
                  />
                </Form.Group>

                {formInput.description !== "" &&
                  formInput.description?.length < 5 && (
                    <p className="text-center text-danger" role="alert">
                      Product description needs to be at least 5 characters
                    </p>
                  )}

                <Form.Group className="mb-3">
                  <label>Which Store Will This Product Belong To</label>
                  <Form.Select
                    name="store"
                    onChange={handleChange}
                    tabIndex="0"
                  >
                    {stores.length > 0 &&
                      stores.map((store) => (
                        <option key={store.id} value={store.id}>
                          {store.store.storeName}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <label>Edit Product Brand</label>
                  <Form.Control
                    type="text"
                    name="brand"
                    value={formInput.brand || product.product.brand}
                    placeholder="What is the product's brand or manufacturer?"
                    onChange={handleChange}
                    minLength={2}
                  />
                </Form.Group>

                {formInput.brand !== "" && formInput.brand?.length < 5 && (
                  <p className="text-center text-danger" role="alert">
                    Product brand needs to be at least 2 characters
                  </p>
                )}

                <Form.Group className="mb-3">
                  <label>Edit Product Price</label>
                  <Form.Control
                    type="currency"
                    name="price"
                    value={formInput.price || product.product.price}
                    placeholder="Product price"
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <label>Edit Amount of Product in Stock</label>
                  <Form.Control
                    type="number"
                    name="numberinStock"
                    value={
                      formInput.numberinStock || product.product.numberinStock
                    }
                    placeholder="How much product do you have to sell?"
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <label>Edit Product Purchase Limit</label>
                  <Form.Control
                    type="number"
                    name="limit"
                    value={formInput.limit || product.product.limit}
                    placeholder="Product limit"
                    onChange={handleChange}
                  />
                </Form.Group>

                {formInput.limit === "" && (
                  <p className="text-center text-danger" role="status">
                    Leave default value if there is no purchase limit
                  </p>
                )}

                <Form.Group className="mb-3">
                  <label>
                    Edit Product Category (currently {product.product.category})
                  </label>
                  <Form.Select
                    name="category"
                    onChange={handleChange}
                    tabIndex="0"
                  >
                    <CategoryOptions />
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <label>Edit Product Images</label>
                  <Form.Control
                    type="file"
                    multiple="multiple"
                    accept="image/png, image/jpeg"
                    name="productImage"
                    value={formInput.productImage}
                    onChange={handleChange}
                  />
                </Form.Group>

                {formInput.productImage !== "" && (
                  <p className="text-center text-danger" role="alert">
                    Product images increase sales
                  </p>
                )}

                <div className="text-center">
                  <Button variant="primary" type="submit" className="my-2 w-50">
                    Update Product
                  </Button>
                </div>

                <div className="text-center">
                  <Button
                    type="button"
                    onClick={cancelAction}
                    className="my-2 w-50 bg-danger"
                  >
                    Cancel
                  </Button>
                </div>

                <hr />

                <div className="text-center">
                  <Button
                    variant="danger"
                    type="button"
                    className="my-2 w-50"
                    onClick={deleteProduct}
                  >
                    Delete Product <i className="fas fa-trash-alt"></i>
                  </Button>
                  <p className="text-center text-danger">
                    Warning: Deleting your product is permanent and can't be
                    undone.
                  </p>
                </div>
              </Form>
            </div>
          </div>
        </Container>
      ) : (
        window.location.replace("/login")
      )}
    </>
  );
};

export default ProductEdit;
