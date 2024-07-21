import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/product.css";
import url from "../config";

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  product_image: string;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    quantity: 0,
    product_image: null as File | null
  });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const fetchProducts = async () => {
    try {
      const apiUrl = `${url}/products`;
      const Token = localStorage.getItem('Token');
      if (!Token) {
        throw new Error('Token not found');
      }

      const response = await axios.get<Product[]>(apiUrl, {
        headers: {
          'Authorization': `Bearer ${Token}`,
        }
      });
      console.log("Products fetched:", response.data);

      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: type === "file" ? files ? files[0] : null : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const apiUrl = `${url}/products`;
      const Token = localStorage.getItem('Token');
      if (!Token) {
        throw new Error('Token not found');
      }

      const formData = new FormData();
      formData.append('name', newProduct.name);
      formData.append('price', String(newProduct.price));
      formData.append('quantity', String(newProduct.quantity));
      if (newProduct.product_image) {
        formData.append('product_image', newProduct.product_image);
      }

      const response = await axios.post<Product>(apiUrl, formData, {
        headers: {
          'Authorization': `Bearer ${Token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      setProducts([...products, response.data]);
      setNewProduct({
        name: "",
        price: 0,
        quantity: 0,
        product_image: null
      });
      setIsModalOpen(false);
      await fetchProducts();
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div>
      <h1>Products</h1>
      <div className="table-container">
        <button
          className="btn btn-primary"
          onClick={toggleModal}
        >
          Input Product
        </button>

        <br />

        {/* modal component */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
            <div className="bg-white rounded-lg p-8 max-w-sm w-full relative">
              <h2 className="text-2xl font-bold mb-4">Add Product</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={newProduct.name}
                    onChange={handleInputChange}
                    required
                    className="form-input p-2 border border-gray-300 rounded w-full"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={newProduct.price}
                    onChange={handleInputChange}
                    required
                    className="form-input p-2 border border-gray-300 rounded w-full"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    value={newProduct.quantity}
                    onChange={handleInputChange}
                    required
                    className="form-input p-2 border border-gray-300 rounded w-full"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="file"
                    name="product_image"
                    onChange={handleInputChange}
                    className="form-input p-2 border border-gray-300 rounded w-full"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    style={{
                      backgroundColor: "#007bff",
                      color: "white",
                      padding: "10px 20px",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer"
                    }}
                  >
                    Add Product
                  </button>
                </div>
              </form>
              <button
                className="absolute top-0 right-0 mt-4 mr-4 text-gray-500 hover:text-gray-600"
                onClick={toggleModal}
              >
                Exit
              </button>
            </div>
          </div>
        )}

        <br />
        <br />

        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>
                  {product.product_image && (
                    <img
                      src={product.product_image}
                      alt={product.name}
                      style={{ width: "100px", height: "100px" }}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
