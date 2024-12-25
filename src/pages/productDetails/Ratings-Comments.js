// import { useEffect, useState } from "react";
// import axios from "axios";
// import Rating from "../../../components/RatingStars";

// function RatingsComments() {
//   const [comments, setComments] = useState();
//   useEffect(() => {
//     fetch(`http://localhost:1337/api/comments`)
//       .then((res) => res.json())
//       .then((data) => {
//         setComments(data);
//       });
//   }, [setComments]);

//   function add_comment(e) {
//     e.preventDefault();
//     console.log(e.target);
//     axios
//       .post("http://localhost:1337/api/comments", {
//         data: {
//           comment: e.target.firstChild.nextElementSibling.value,
//           rating:
//             e.target.firstChild.nextElementSibling.nextElementSibling.value,
//         },
//       })
//       .catch((error) => {
//         console.error("There was an error submitting the form:", error);
//       });
//     fetch(`http://localhost:1337/api/comments`)
//       .then((res) => res.json())
//       .then((data) => {
//         setComments(data);
//       });
//   }
//   const comments_elements = comments?.data?.map((comment) => {
//     return (
//       <div key={comment.id}>
//         <span>Unknown</span>
//         <Rating rating={comment.attributes.rating} />
//         <p>{comment.attributes.comment}</p>
//       </div>
//     );
//   });

//   return (
//     <>
//       <div className="comments-container">
//         <h2>Comments & Ratings</h2>
//         {comments_elements}
//       </div>
//       <form
//         className="comment-form"
//         onSubmit={(e) => {
//           add_comment(e);
//         }}
//       >
//         <input type="text" placeholder="Your name" />
//         <input type="text" placeholder="Your comment" required />
//         <input type="number" min="1" max="5" placeholder="Rating" required />
//         <button type="submit">Add Your Comment</button>
//       </form>
//     </>
//   );
// }

// export default RatingsComments;
