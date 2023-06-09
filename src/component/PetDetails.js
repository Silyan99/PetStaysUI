import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as service from "../core/service/service";
import UrlConstant from "../constants/UrlConstant";
import { toast } from "react-toastify";
import config from "../core/config/config";
import { Get12HrsFormat } from "../core/interactiveforms";

function PetDetails() {
  let { id } = useParams();
  const [details, setDetails] = useState({});
  
  const GetRequestDetails = () => {
    service
      .get(UrlConstant.Customer_GetRequestDetailURL(id))
      .then((response) => {
        if (response.status === 200) {
            setDetails(response.data);
        }
        else{
            toast.error("Failed to load Pet details", config.ToastConfig);
        }
      })
      .catch((error) => {
        toast.error("Failed to load Pet details", config.ToastConfig);
        console.log(error);
      });
  };

  const OnDeleteClick = ()=>{
    service.deleteApi(UrlConstant.Customer_DeleteRequest(id)).then(response=>{
        if (response.status === 200) {
            toast.success("Request deleted", config.ToastConfig);
            setTimeout(() => {
              window.location.href = "/customer/myrequests";
          }, 2000);
        }
        else{
          toast.error("Failed to delete Pet details", config.ToastConfig);
        }

    }).catch(err=>{
        toast.error("Failed to delete Pet details", config.ToastConfig);
        console.log(err);
    });
  }

  useEffect(() => {
      GetRequestDetails(); 
  },[]);

  return (
    <>
      <div className="container">
        <p className="m-5 px-5 pt-5 display-5">
          Pet <span className="text-danger">Details</span>
        </p>
        <hr></hr>
        <div className="container d-flex flex-row flex-wrap justify-content-center">
          <div
            className="container col-md-11 mx-2 my-4 d-flex flex-row flex-wrap justify-content-evenly mt-5"
            style={{ maxWidth: "80vw" }}
          >
            <div className="col-md-6 d-flex justify-content-center align-item-center ">
            <img
              src={`${config.BaseUrl}${details.Photo || (details.Category && details.Category.toLowerCase()==="dog" ? "default_dog.png":"default_cat.png")}`}
              className="img-fluid rounded"
              alt="..."
            />
            </div>
            <div className="col-md-6 text-start my-1">
              <div className="card-body">
                <p className="h4 fw-normal m-3 ">
                  Pet Name : <span className="text-danger">{details.Name}</span>
                </p>
                <p className="h6 m-3 ">
                  UID : <span> {details.Uid}</span>
                </p>
                <p className="h6 m-3 ">
                  Category : <span> {details.Category}</span>
                </p>
                <p className="h6 m-3">
                  Breed : <span> {details.Breed} </span>
                </p>

                <p className="h6 m-3 ">
                  Color : <span>{details.Color}</span>
                </p>
                <p className="h6 m-3">
                  Gender : <span>{details.Gender}</span>
                </p>
                <p className="h6 m-3">
                  Vaccinated : <span>{details.Vaccinated === true ? "Yes":"No"}</span>
                </p>
                <p className="h6 m-3">
                  Age : <span>{details.Age} Yrs</span>
                </p>
                <p className="h6 m-3">
                    Drop On : { new Date(details.DateFrom).toDateString() },
                  <span>{Get12HrsFormat(details.TimeFrom)}</span>
                </p>
                <p className="h6 m-3">
                    Pick-Up : { new Date(details.DateTo).toDateString()},
                  <span>{Get12HrsFormat(details.TimeTo)}</span>
                </p>
                <p className=" m-3">
                  <strong> Details : </strong>
                  <span>
                  {details.Details || ''}
                  </span>
                </p>
                <p className="card-text mx-3 mt-4">
                  <Link to={`/customer/updatedetails/${id}`} className="btn btn-outline-primary">
                    Edit
                    </Link>
                  <button
                    type="button"
                    className="btn btn-outline-danger mx-2"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    Delete
                  </button>
                  <Link
                    type="button"
                    className="btn btn-outline-primary"
                    to={`/customer/myrequests`}
                  >
                    Back
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Delete Request
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body ">
                <div className="my-2">
                  Are you sure you want to delete your Request?
                </div>
                <div className="text-end mt-4 px-4">
                  <button
                    type="button"
                    className="btn btn-outline-primary mx-3"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button type="button" className="btn btn-outline-danger" onClick={()=>OnDeleteClick()}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PetDetails;
