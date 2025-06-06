import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Carousel from '../components/Carousel';

export default function Home() {
  const [search, setSearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    response = await response.json();
    setFoodItem(response[0]);
    setFoodCat(response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Navbar />
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner" id="carousel">
          <div className="carousel-caption" style={{ zIndex: "10" }}>
            <div className="d-flex justify-content-center">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
              {}
            </div>
          </div>
          <div className="carousel-item active" data-bs-interval="2000">
            <img src="/pizza.jpg" className="d-block w-100" alt="Pizza" style={{ filter: "brightness(50%)", objectFit: "contain", height: "500px" }} />
          </div>
          <div className="carousel-item" data-bs-interval="3000">
            <img src="/subway.jpg" className="d-block w-100" alt="Subway" style={{ filter: "brightness(50%)", objectFit: "contain", height: "500px" }} />
          </div>
          <div className="carousel-item" data-bs-interval="3000">
            <img src="/frenchfries.jpg" className="d-block w-100" alt="French Fries" style={{ filter: "brightness(50%)", objectFit: "contain", height: "500px" }} />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="container">
        {foodCat.length > 0 ? (
          foodCat.map((category) => (
            <div key={category._id} className="mb-4">
              <div className="fs-3 m-3">{category.CategoryName}</div>
              <hr />
              <div className="row">
  {foodItem.length > 0 ? (
    foodItem
      .filter(item =>
        item.CategoryName === category.CategoryName &&
        item.name.toLowerCase().includes(search.toLowerCase())
      )
      .map((filterItems) => (
        <div key={filterItems._id} className="col-12 col-md-6 col-lg-4">
          <Card foodItem = {filterItems}
            //foodName={filterItems.name}
            options={filterItems.options[0]}
            //imgSrc={filterItems.img}
          />
        </div>
      ))
  ) : (
    <div>No Such Data Found</div>
  )}
</div>

            </div>
          ))
        ) : (
          <></>
        )}
      </div>
      <Footer />
    </div>
  );
}
