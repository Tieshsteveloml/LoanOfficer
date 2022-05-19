import React, { useEffect, useState } from "react";
import Ratings from "./Ratings";

import moment from "moment";

import icon_edit from "../images/icon_edit.png";
import loading_img from "../images/loading-gif.gif";

function ReviewItem(props) {
   const [sender, setSender] = useState({});
   const { editable, id, title, time, reviewNumber, reviewText, reviewStatus, setReviewData, updateReviews } = props;
   const [editReview, seteditReview] = useState(false);
   const [changedReviewStatus, setchangedReviewStatus] = useState(reviewStatus);

   const [changeableReviewText, setchangeableReviewText] = useState(reviewText);

   useEffect(() => {
      getUserData(title);
   }, []);
   const getUserData = async (id) => {
      let api_url = "";
      if (process.env.NODE_ENV === "development") {
         api_url = `/user/${id}`;
      } else {
         api_url = `${process.env.REACT_APP_API_ROOT}/user/${id}`;
      }

      let result = await fetch(api_url, {
         method: "GET",
         headers: {
            Accept: "*/*",
         },
      });
      result = await result.json();
      console.log(result);
      setSender(result);
   };

   let d = new Date(time);

   const handleSave = async (n) => {
      let api_url = "";
      if (process.env.NODE_ENV === "development") {
         api_url = `/nps/${id}/`;
      } else {
         api_url = `${process.env.REACT_APP_API_ROOT}/nps/${id}/`;
      }

      let formData = new FormData();

      formData.append("published", n === 0 ? false : true);

      let result = await fetch(api_url, {
         method: "PUT",
         headers: {
            Accept: "*/*",
         },
         body: formData,
      });
      result = await result.json();
      window.location.reload();
      console.log(result);
      seteditReview(false);
   };

   const handleSaveDesciption = async () => {
      let api_url = "";
      if (process.env.NODE_ENV === "development") {
         api_url = `/nps/${id}/`;
      } else {
         api_url = `${process.env.REACT_APP_API_ROOT}/nps/${id}/`;
      }

      let formData = new FormData();

      formData.append("description", changeableReviewText);

      let result = await fetch(api_url, {
         method: "PUT",
         headers: {
            Accept: "*/*",
         },
         body: formData,
      });
      result = await result.json();
      console.log("result from review", result);
      updateReviews();
      seteditReview(false);
   };

   const handleChangeReview = (e) => {
      setchangeableReviewText(e.target.value);
   };

   const handleClickOption = (n) => {
      setchangedReviewStatus(n);
      handleSave(n);
   };

   const getNumberClass = (number) => {
      if (number <= 6) {
         return "orange";
      } else if (number > 6 && number <= 8) {
         return "gray";
      } else {
         return "green";
      }
   };

   const cancelEditFn = () => {
      seteditReview(false);
      setchangeableReviewText(reviewText);
   };

   return (
      <div className="reviewItem">
         <div className="reviewItemHeader dflx">
            <div className="reviewMEta">
               {Object.keys(sender).length > 0 ? (
                  <h3>
                     {" "}
                     <span className={`ratingNumb  ${getNumberClass(reviewNumber)}`}>{reviewNumber}</span>{" "}
                     {sender.first_name + " " + sender.last_name} . <span>{moment(d).fromNow()}</span>
                  </h3>
               ) : (
                  <img width="30" src={loading_img} alt="loading..." />
               )}

               {/* <Ratings editable={editable} rating={reviewNumber}/> */}
            </div>

            {editable && reviewNumber > 8 && (
               <div className="reviewActions dflx">
                  {!editReview && (
                     <button className="icon_btn editBtn" onClick={() => seteditReview(true)}>
                        <img src={icon_edit} alt="icon_edit" /> Edit{" "}
                     </button>
                  )}
                  {editReview && (
                     <>
                        <button onClick={cancelEditFn} className="icon_btn cancelbtn btnset">
                           Cancel{" "}
                        </button>
                        <button className="icon_btn savebtn btnset" onClick={handleSaveDesciption}>
                           Save{" "}
                        </button>
                     </>
                  )}
                  <div className="radios dflx">
                     {reviewStatus === 1 ? (
                        <>
                           <div className="customRadio">
                              <label>
                                 <input
                                    type="radio"
                                    defaultChecked
                                    name={`${id}_status`}
                                    value="publish"
                                    onClick={() => handleClickOption(1)}
                                 />
                                 <span></span> Publish
                              </label>
                           </div>
                           <div className="customRadio">
                              <label>
                                 <input
                                    type="radio"
                                    name={`${id}_status`}
                                    value="unpublish"
                                    onClick={() => handleClickOption(0)}
                                 />
                                 <span></span> Unpublish
                              </label>
                           </div>
                        </>
                     ) : (
                        <>
                           <div className="customRadio">
                              <label>
                                 <input
                                    type="radio"
                                    name={`${id}_status`}
                                    value="publish"
                                    onClick={() => handleClickOption(1)}
                                 />
                                 <span></span> Publish
                              </label>
                           </div>
                           <div className="customRadio">
                              <label>
                                 <input
                                    type="radio"
                                    defaultChecked
                                    name={`${id}_status`}
                                    value="unpublish"
                                    onClick={() => handleClickOption(0)}
                                 />
                                 <span></span> Unpublish
                              </label>
                           </div>
                        </>
                     )}
                  </div>
               </div>
            )}
         </div>
         <div className="reviewContent">
            {!editReview && <p>{changeableReviewText}</p>}
            {editReview && (
               <div className="inputWrap">
                  <label>
                     <textarea onChange={handleChangeReview} value={changeableReviewText}></textarea>
                  </label>
               </div>
            )}
         </div>
      </div>
   );
}

export default ReviewItem;
