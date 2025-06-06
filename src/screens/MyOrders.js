import React, { useEffect, useState } from 'react';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const userEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userEmail) {
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`http://localhost:5000/api/myOrders?email=${userEmail}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        if (data.success) {
          setOrders(data.orders || []);
        } else {
          setOrders([]);
        }
      } catch (error) {
        console.error("Failed to fetch orders", error);
      }
      setLoading(false);
    };

    fetchOrders();
  }, [userEmail]);

  if (loading) return <div className="container my-3">Loading your orders...</div>;
  if (!userEmail) return <div className="container my-3">Please login to see your orders.</div>;

  return (
    <div className="container my-3">
      <h2>Your Orders</h2>
      {orders.length === 0 && <p>You have no previous orders.</p>}

      {orders.map((order, index) => {
      
        const orderDateObj = order.find(item => item.Order_date);
        const orderDate = orderDateObj ? orderDateObj.Order_date : "Unknown Date";

        return (
          <div key={index} className="mb-4 p-3 border rounded">
            <h5>Order Date: {orderDate}</h5>
            <hr />
            {order.filter(item => !item.Order_date).map((item, idx) => (
              <div key={idx} className="d-flex justify-content-between">
                <div>{item.name} (Size: {item.size}) x {item.qty}</div>
                <div>Rs. {item.price}</div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
