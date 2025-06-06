import React, { useState, useEffect, useRef } from 'react';
import { useDispatchCart } from './ContextReducer';

export default function Card(props) {
  const dispatch = useDispatchCart();
  const priceRef = useRef();

  const options = props.options;
  const priceOptions = Object.keys(options);

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  const finalPrice = qty * parseInt(options[size]);

  const handleAddToCart = () => {
    dispatch({
      type: "ADD",
      id: props.foodItem._id,
      name: props.foodItem.name,
      price: finalPrice,
      qty: qty,
      size: size,
      img: props.foodItem.img
    });
  };

  return (
    <div className="card mt-3" style={{ width: "18rem" }}>
      <img
        className="card-img-top"
        src={props.foodItem.img}
        alt={props.foodItem.name}
        style={{ height: "240px", objectFit: "cover" }}
        onError={(e) => { e.target.src = "/fallback.jpeg"; }}
      />
      <div className="card-body">
        <h5 className="card-title">{props.foodItem.name}</h5>
        <div className="container w-100">
          <select className="m-2 h-100 bg-success text-white" onChange={(e) => setQty(parseInt(e.target.value))}>
            {[...Array(6).keys()].map(i => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>

          <select className="m-2 h-100 bg-success text-white" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
            {priceOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>

          <div className="d-inline h-100 fs-5">Rs. {finalPrice}</div>
        </div>
        <hr />
        <button className="btn btn-success justify-center ms-2" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
