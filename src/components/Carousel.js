import React from 'react'

export default function Home() {
  return (
    <div>
       <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
  <div className="carousel-inner" id='carousel'>
    <div className ="carousel-caption" style={{zIndex:"10"}}>
      <form className="d-flex">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
      <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>
    </form>
    </div>
    <div className="carousel-item active" data-bs-interval="2000">
      <img src="/pizza.jpg" className="d-block w-100" alt="Pizza" style={{ filter: "brightness(50%)", objectFit:"contain", height:"500px"}}/>
    </div>
    <div className="carousel-item" data-bs-interval="3000">
      <img src="/subway.jpg" className="d-block w-100" alt="Subway" style={{ filter: "brightness(50%)", objectFit:"contain", height:"500px"}}/>
    </div>
    <div className="carousel-item" data-bs-interval="3000">
      <img src="/frenchfries.jpg" className="d-block w-100" alt="French Fries" style={{ filter: "brightness(50%)", objectFit:"contain", height:"500px"}}/>
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
    </div>
  )
}