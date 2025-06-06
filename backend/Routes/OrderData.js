const express = require('express');
const router = express.Router();
const Order = require('../models/orders');

router.post('/orderData', async (req, res) => {
    const { order_data, email, order_date } = req.body;

    if (!order_data || !email || !order_date) {
        return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    const data = [...order_data];
    data.unshift({ Order_date: order_date });

    try {
        let existingOrder = await Order.findOne({ email });

        if (!existingOrder) {
            await Order.create({
                email,
                order_data: [data]
            });
            console.log('Order created for:', email);
        } else {
            await Order.findOneAndUpdate(
                { email },
                { $push: { order_data: data } }
            );
            console.log('Order updated for:', email);
        }

        res.json({ success: true });
    } catch (error) {
        console.error('Error saving order:', error.message);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
});
router.get('/myOrders', async (req, res) => {
  const email = req.query.email; 

  if (!email) {
    return res.status(400).json({ success: false, error: 'Email is required' });
  }

  try {
    const userOrders = await Order.findOne({ email });

    if (!userOrders) {
      return res.json({ success: true, orders: [] }); 
    }

    res.json({ success: true, orders: userOrders.order_data });
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

module.exports = router;
