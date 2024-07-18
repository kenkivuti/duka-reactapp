import React, { useState, useEffect } from 'react';
import { Table, Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import url from '../config';

interface Sale {
  id: number;
  pid: number;
  stock_quantity: number;
  created_at: string;
}

const Sales: React.FC = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSale, setNewSale] = useState({
    pid: 0,
    stock_quantity: 0,
    created_at: new Date(),
  });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const fetchSales = async () => {
    try {
      const apiUrl = `${url}/sales`;
      const Token = localStorage.getItem('Token');
      if (!Token) {
        throw new Error('Token not found');
      }

      const response = await axios.get<Sale[]>(apiUrl, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      });
      setSales(response.data);
    } catch (error) {
      console.error('Error fetching sales:', error);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewSale({
      ...newSale,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const apiUrl = `${url}/sales`;
      const Token = localStorage.getItem('Token');
      if (!Token) {
        throw new Error('Token not found');
      }

      console.log('Sending data:', newSale); // Log the data being sent

      const response = await axios.post<Sale>(apiUrl, newSale, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      });
      setSales([...sales, response.data]);
      setNewSale({
        pid: 0,
        stock_quantity: 0,
        created_at: new Date(),
      });
      setIsModalOpen(false);
      await fetchSales();
    } catch (error) {
      console.error('Error adding sale:', error); // Log the error response
      if (axios.isAxiosError(error) && error.response) {
        console.error('Server response:', error.response.data); // Log server response
      }
    }
  };

  return (
    <div>
      <h2>Sales</h2>
      <Button variant="primary" onClick={toggleModal}>
        Add Sale
      </Button>
      <Table striped>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product ID</th>
            <th>Stock Quantity</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale.id}>
              <td>{sale.id}</td>
              <td>{sale.pid}</td>
              <td>{sale.stock_quantity}</td>
              <td>{sale.created_at}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={isModalOpen} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Sale</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Product ID</Form.Label>
              <Form.Control
                type="number"
                name="pid"
                value={newSale.pid}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                name="stock_quantity"
                value={newSale.stock_quantity}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add Sale
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Sales;
