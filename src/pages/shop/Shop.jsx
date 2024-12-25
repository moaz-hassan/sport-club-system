import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import "./shop.css";
import { useState } from "react";
import Filter from "./Filter";

function Shop() {
  const [openFilter, setOpenFilter] = useState(false);
  const fakeData = [
    {
      id: 1,
      title: "Smartphone X100",
      desc: "The latest smartphone with a 6.7-inch OLED display, 128GB storage, and 5G connectivity.",
      price: 799.99,
    },
    {
      id: 2,
      title: "Wireless Bluetooth Headphones",
      desc: "Noise-cancelling over-ear headphones with 20 hours of battery life and deep bass.",
      price: 129.99,
    },
    {
      id: 3,
      title: "4K Ultra HD Smart TV",
      desc: "55-inch 4K LED TV with HDR, Alexa compatibility, and built-in streaming apps.",
      price: 599.99,
    },
    {
      id: 4,
      title: "Laptop Pro 15",
      desc: "15-inch laptop with Intel i7, 16GB RAM, and 512GB SSD, perfect for productivity and entertainment.",
      price: 1199.99,
    },
    {
      id: 5,
      title: "Fitness Tracker Pro",
      desc: "Track your steps, heart rate, and sleep patterns with this water-resistant fitness tracker.",
      price: 89.99,
    },
    {
      id: 6,
      title: "Electric Coffee Maker",
      desc: "Brews up to 12 cups of coffee in minutes with a built-in grinder and adjustable brew strength.",
      price: 45.99,
    },
    {
      id: 7,
      title: "Gaming Mouse Elite",
      desc: "Ergonomic gaming mouse with customizable RGB lighting and 12 programmable buttons.",
      price: 59.99,
    },
    {
      id: 8,
      title: "Smart Home Security Camera",
      desc: "Wireless security camera with night vision, motion detection, and cloud storage.",
      price: 149.99,
    },
    {
      id: 9,
      title: "Electric Toothbrush 5000",
      desc: "Advanced electric toothbrush with multiple brushing modes and a 2-minute timer.",
      price: 79.99,
    },
    {
      id: 10,
      title: "Portable Power Bank 20,000mAh",
      desc: "High-capacity portable charger for smartphones, tablets, and laptops with fast charging technology.",
      price: 39.99,
    },
  ];

  return (
    <>
      <Filter openFilter={openFilter} setOpenFilter={setOpenFilter} />
      <Navbar />
      <div className="shop">
        <div className="shop-container">
        <button className="filter-btn" onClick={()=>{setOpenFilter(true)}}>Filter</button>
          {fakeData.map((ele, i) => {
            return (
              <Link key={i} to={`${ele.id}`}>
                <div className="shop-card">
                  <img
                    src="/_0023605b-ba8a-4dca-bfba-d8f0c2be9017.jpeg"
                    alt="photo"
                  />
                  <h2>{ele.title}</h2>
                  <p>{ele.desc}</p>
                  <span>Price: ${ele.price}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Shop;
