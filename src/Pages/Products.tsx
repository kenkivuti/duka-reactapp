import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/product.css"; 

interface Product {
  id: number;
  name: string;
  price: number;
  quantity:number;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const apiUrl = 'http://127.0.0.1:8000/products';
        const Token = localStorage.getItem('Token');
        if (! Token) {
          throw new Error('Token not found');
        }

        const response = await axios.get<Product[]>(apiUrl, {
          headers: {
            'Authorization': `Bearer ${Token}`,
          }
        });

        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h3>My Products</h3>
      <div className="table-container"> 
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>quantity</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Products;
