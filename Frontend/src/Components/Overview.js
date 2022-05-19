import React, { useState } from "react";
import icon_edit from "../images/icon_edit.png";
import { loadState } from "../localStorage";

function Overview({ editable = false, data, setData }) {
   let { over_view } = data;
   const [isEditing, setIsEditing] = useState(false);
   const [overviewdata, setoverviewdata] = useState(over_view);

   const handleChange = (e) => {
      setoverviewdata(e.target.value);
   };

   const userData = loadState();
   const handleSave = async () => {
      let formData = new FormData();

      formData.append("over_view", overviewdata);

      let api_url = "";
      if (process.env.NODE_ENV === "development") {
         api_url = `/user/${userData.id}/`;
      } else {
         api_url = `${process.env.REACT_APP_API_ROOT}/user/${userData.id}/`;
      }

      let result = await fetch(api_url, {
         method: "PUT",
         headers: {
            Accept: "*/*",
         },
         body: formData,
      });
      result = await result.json();
      setData({ over_view: result.over_view });
      setIsEditing(false);
   };

   const handleCancel = () => {
      setIsEditing(false);
      setoverviewdata(over_view);
   };

   return (
      <section className="overview">
         <div className="sectionSmallHead dflx">
            <h2>Over View:</h2>
            <div className="actions">
               {editable && !isEditing && (
                  <button className="icon_btn" onClick={() => setIsEditing(true)}>
                     <img src={icon_edit} alt="icon_edit" /> Edit Over View
                  </button>
               )}
               {editable && isEditing && (
                  <>
                     <button onClick={handleCancel} className="icon_btn cancelbtn btnset">
                        Cancel{" "}
                     </button>
                     <button className="icon_btn savebtn btnset" onClick={handleSave}>
                        Save{" "}
                     </button>
                  </>
               )}
            </div>
         </div>
         {!isEditing && <p>{overviewdata !== "" ? overviewdata : "No overview set yet!"}</p>}
         {isEditing && (
            <div className="inputWrap">
               <label>
                  <textarea name="over_view" placeholder="Over View" value={overviewdata} onChange={handleChange} />
               </label>
            </div>
         )}
      </section>
   );
}

export default Overview;
