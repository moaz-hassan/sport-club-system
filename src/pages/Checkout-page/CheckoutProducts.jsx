import { useEffect, useState } from "react";
import CheckoutForm from "./CheckoutForm";
// import CheckoutForm from "./CheckoutForm";

function CheckoutProducts() {
  const [checkoutProducts, setCheckoutProducts] = useState([]);
  const [showProducts, setShowProducts] = useState(true);
  console.log(checkoutProducts);

  useEffect(() => {
    setCheckoutProducts(JSON.parse(sessionStorage.getItem("products")) || []);
  }, []);

  const handleDeleteProduct = (id) => {
    const updatedCart = checkoutProducts.filter((product) => product.id !== id);
    sessionStorage.setItem("products", JSON.stringify(updatedCart));
    setCheckoutProducts(updatedCart);
  };

  const updateProductCount = (productId, action) => {
    const updatedCart = checkoutProducts.map((product) => {
      if (product.id === productId) {
        if (action === "increase" && product.count < product.available) {
          product.count += 1;
        } else if (action === "decrease" && product.count > 1) {
          product.count -= 1;
        }
      }
      return product;
    });
    sessionStorage.setItem("products", JSON.stringify(updatedCart));
    setCheckoutProducts(updatedCart);
  };

  const checkout_products = checkoutProducts?.map((product) => (
    <div key={product.description} className="checkoutProduct-container">
      <img src={product.image} alt={product.title} />
      <div className="product-info">
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <h3>Price: {product.price}$</h3>
        <h3>Available: {product.available}</h3>
        <div className="product-count">
          <button
            className="count-btn"
            onClick={() => updateProductCount(product.id, "decrease")}
          >
            -
          </button>
          <span>{product.count}</span>
          <button
            className="count-btn"
            onClick={() => updateProductCount(product.id, "increase")}
          >
            +
          </button>
        </div>

        <h3>Total Price: {product.count * product.price}$</h3>
      </div>
      <button
        className="cart-delete-btn"
        onClick={() => handleDeleteProduct(product.id)}
      >
        Remove
      </button>
    </div>
  ));

  return (
    <div className="checkout">
      <h1 style={{ textAlign: "center", margin: "20px" }}>Checkout</h1>
      {checkoutProducts.length === 0 ? (
        <h2 className="empty-page">There are no products in your cart.</h2>
      ) : (
        <div className="checkout-products">
          <div
            className="products-arrow-title"
            onClick={() => setShowProducts(!showProducts)}
          >
            <h2>Products</h2>
            <i
              className={`fa-solid fa-chevron-${showProducts ? "down" : "up"} arrow-i`}
            />
          </div>

          {showProducts && (
            <div className="products-list">
              {checkout_products}
            </div>
          )}
        </div>
      )}

      {checkoutProducts.length > 0 && <CheckoutForm checkout_products={checkoutProducts} />}
    </div>
  );
}

export default CheckoutProducts;
