/* eslint-disable no-unused-vars */
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./product-details.css";

function ProductDetailsPage() {
  const [productDetails, setProductDetails] = useState({
    data: {
      attributes: {
        category: "Electronics",
        title: "Smartphone XYZ",
        description: "Experience the future with Smartphone XYZ, packed with features and a sleek design.",
        rating: 4.8,
        price: 799,
        available: 15,
        image: {
          data: [
            { id: 1, attributes: { url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMzA3fDB8MXxhbGx8fHx8fHx8fHwxNjg2NzA4ODc1&ixlib=rb-1.2.1&q=80&w=400" } },
            { id: 2, attributes: { url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMzA3fDB8MXxhbGx8fHx8fHx8fHwxNjg2NzA4ODc1&ixlib=rb-1.2.1&q=80&w=400" } },
            { id: 3, attributes: { url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMzA3fDB8MXxhbGx8fHx8fHx8fHwxNjg2NzA4ODc1&ixlib=rb-1.2.1&q=80&w=400" } },
          ],
        },
      },
    },
  });

  const { productId } = useParams();

  useEffect(() => {
    // Example of product ID usage
  }, [productId]);

  const attributes = productDetails?.data?.attributes || {};
  const category = attributes?.category || "Unknown";
  const title = attributes?.title || "No Title";
  const description = attributes?.description || "No Description";
  const price = attributes?.price || 0;
  const available = attributes?.available || 0;
  const rating = attributes?.rating || 0;
  const images = attributes?.image?.data || [];
  const mainImage = images[0]?.attributes?.url || "https://via.placeholder.com/400x400?text=Default+Image";

  const productImages = images.map((image) => (
    <img
      key={image.id}
      src={image.attributes.url}
      alt={`Product ${image.id}`}
      style={{
        outline: image.id === images[0]?.id ? "3px solid black" : "none",
        cursor: "pointer",
      }}
      onClick={(e) => {
        e.target
          .closest(".product-details-1")
          .querySelector(".main-img").src = e.target.src;
        e.target
          .closest(".product-imgs")
          .querySelectorAll("img")
          .forEach((img) => (img.style.outline = "none"));
        e.target.style.outline = "3px solid black";
      }}
    />
  ));

  const addToCart = () => {
    const cart = JSON.parse(sessionStorage.getItem("products")) || [];
    const existingProduct = cart.find((item) => item.id === productDetails.data.id);

    if (existingProduct) {
      existingProduct.count += 1;
    } else {
      cart.push({
        id: productDetails.data.id,
        title: title,
        price: price,
        description: description,
        count: 1,
        image: mainImage,
        available: available,
      });
    }

    sessionStorage.setItem("products", JSON.stringify(cart));
    alert("Product added to cart successfully!");
  };

  return (
    <>
      <h2 className="product-ref">
        {`${category.charAt(0).toUpperCase() + category.slice(1)} > ${
          title.charAt(0).toUpperCase() + title.slice(1)
        }`}
      </h2>
      <div className="product-container">
        <div className="product-details-1">
          <img className="main-img" src={mainImage} alt="Main product" />
          <div className="product-imgs">{productImages}</div>
        </div>
        <div className="product-details-2">
          <h2>{title}</h2>
          <p>{description}</p>
          <p className="price">Price: ${price}</p>
          <p className="avail-amount">Available: {available}</p>
          <p className="seller">Seller: Online Store</p>
          <p className="seller-rating">Seller Rating: {Math.round(rating * 20)}%</p>
          <div className="button-group">
            <button className="add-to-cart-btn" onClick={addToCart}>
              Add to Cart
            </button>
            <Link
              to="/checkout"
              className="buy-now-btn"
              onClick={addToCart}
            >
              Buy Now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetailsPage;
