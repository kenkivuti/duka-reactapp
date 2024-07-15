import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import url from '../config';


interface Sale {
    id: number;
    pid: number;
    quantity: number;
    created_at: string;
}

const Sales: React.FC = () => {
    const [sales, setSales] = useState<Sale[]>([]);

    useEffect(() => {
        const fetchsales = async () => {
        try {
            const apiUrl = `${url}/sales`;
            const Token = localStorage.getItem('Token');
            if (! Token) {
              throw new Error('Token not found');
            }
    
         const response = await axios.get<Sale[]>(apiUrl, {
            headers: {
                'Authorization': `Bearer ${Token}`,
              }
         })
            setSales(response.data);
            console.log(response.data)
        } catch (error) {
            console.error('Error fetching products:', error);
          }
        };

          fetchsales();
        },[]);
        

    return (
        <div>
            <h2>Sales</h2>
            <Table striped>
                <thead>
                <tr>
                  <th>ID</th>
                  <th>Product id</th>
                  <th>Quantity</th>
                  <th>Time</th>
                </tr>
                </thead>
                <tbody>
                {sales.map(sale => (
                        <tr key={sale.id}>
                            <td>{sale.id}</td>
                            <td>{sale.pid}</td>
                            <td>{sale.quantity}</td>
                            <td>{sale.created_at}</td>
                        </tr>
                    ))}
                </tbody>
                </Table>
           
        </div>

        
    );
}

export default Sales;