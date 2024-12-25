// import React, { useEffect, useState } from "react";
// // Import Swiper React components
// import { Swiper, SwiperSlide } from "swiper/react";

// // Import Swiper styles
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// // import "./styles.css";

// // import required modules
// import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
// import { Link } from "react-router-dom";
// import Rating from "../../../components/RatingStars";
// import recent_viewed from "../../../components/setRecentProducts";

// function RelatedProducts(props) {
//   const [relatedProducts, setRelatedProducts] = useState();
//   const [swiperRef, setSwiperRef] = useState(null);
//   const [windowWidth, setWindowWidth] = useState(window.innerWidth);

//   useEffect(() => {
//     // Function to update the width
//     const handleResize = () => {
//       setWindowWidth(window.innerWidth);
//     };

//     // Add event listener to track window resize
//     window.addEventListener("resize", handleResize);

//     // Cleanup function to remove the event listener
//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       const response = await fetch(
//         `https://ecommerce-backend-nkc0.onrender.com/api/products?populate=*&pagination[limit]=10000`
//       );
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       const result = await response.json();
//       const relatedProducts = result.data.filter(
//         (product) => product.attributes.category === props.category
//       );
//       setRelatedProducts(relatedProducts);
//     };

//     fetchProducts();
//   }, [props.category]);

//   const RelatedProductsElements = relatedProducts?.map((product) => {
//     // console.log(product);
//     return (
//       <SwiperSlide key={product.id}>
//         <div className="product-card">
//           <img
//             src={
//               product.attributes.image.data
//                 ? product.attributes.image.data[0].attributes.url
//                 : ""
//             }
//             alt={product.attributes.title}
//           />
//           <h3>{product.attributes.title}</h3>
//           <p>Price: {product.attributes.price} $</p>
//           <p style={{ marginTop: "-10px" }}>
//             Rating: <Rating rating={product.attributes.rating} />
//           </p>
//           <Link
//             to={`/all-products/${product.id}`}
//             onClick={() => {
//               recent_viewed(product);
//             }}
//           >
//             See Details
//           </Link>
//         </div>
//       </SwiperSlide>
//     );
//   });

//   return (
//     <div className="mySwiper related-products">
//       <h2>Related Products</h2>
//       <Swiper
//         className="products-slider"
//         onSwiper={setSwiperRef}
//         slidesPerView={
//           windowWidth >= 700
//             ? 4
//             : windowWidth < 700 && windowWidth > 630
//             ? 3
//             : 2
//         }
//         centeredSlides={false}
//         spaceBetween={30}
//         pagination={{
//           type: "custom",
//         }}
//         navigation={true}
//         modules={[Pagination, Navigation]}
//       >
//         {RelatedProductsElements}
//       </Swiper>
//     </div>
//   );
// }

// export default RelatedProducts;
