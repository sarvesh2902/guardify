import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";

export default function ComplaintDetails({ color, complaintData }) {
  console.log(complaintData);
  const router = useRouter();
  const saveStatus = async (status) => {
    await axios
      .post("http://localhost:3000/api/save-status", {
        status,
        complaintId: complaintData._id,
      })
      .then((res) => {
        console.log(res);
        alert("Saved Successfully");
        router.push("/admin");
      });
  };

  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-blueGray-700 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-blueGray-700" : "text-white")
                }
              >
                Your Complaint
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  Topic
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  Details
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-md">
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 text-left">
                  <span
                    className={
                      "font-bold " +
                      +(color === "light" ? "text-blueGray-600" : "text-white")
                    }
                  >
                    Subject
                  </span>
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 text-left">
                  <span
                    className={
                      color === "light" ? "text-blueGray-600" : "text-white"
                    }
                  >
                    {complaintData.subject}
                  </span>
                </td>
              </tr>

              <tr className="text-md">
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 text-left">
                  <span
                    className={
                      "font-bold " +
                      +(color === "light" ? "text-blueGray-600" : "text-white")
                    }
                  >
                    Name
                  </span>
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 text-left">
                  <span
                    className={
                      color === "light" ? "text-blueGray-600" : "text-white"
                    }
                  >
                    {complaintData.name}
                  </span>
                </td>
              </tr>

              <tr className="text-md">
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 text-left">
                  <span
                    className={
                      "font-bold " +
                      +(color === "light" ? "text-blueGray-600" : "text-white")
                    }
                  >
                    Address
                  </span>
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 text-left">
                  <span
                    className={
                      color === "light" ? "text-blueGray-600" : "text-white"
                    }
                  >
                    {complaintData.address}
                  </span>
                </td>
              </tr>

              <tr className="text-md">
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 text-left">
                  <span
                    className={
                      "font-bold " +
                      +(color === "light" ? "text-blueGray-600" : "text-white")
                    }
                  >
                    City
                  </span>
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 text-left">
                  <span
                    className={
                      color === "light" ? "text-blueGray-600" : "text-white"
                    }
                  >
                    {complaintData.city}
                  </span>
                </td>
              </tr>

              <tr className="text-md">
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 text-left">
                  <span
                    className={
                      "font-bold " +
                      +(color === "light" ? "text-blueGray-600" : "text-white")
                    }
                  >
                    Code
                  </span>
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 text-left">
                  <span
                    className={
                      color === "light" ? "text-blueGray-600" : "text-white"
                    }
                  >
                    {complaintData.code}
                  </span>
                </td>
              </tr>

              <tr className="text-md">
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 text-left">
                  <span
                    className={
                      "font-bold " +
                      +(color === "light" ? "text-blueGray-600" : "text-white")
                    }
                  >
                    Phone
                  </span>
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 text-left">
                  <span
                    className={
                      color === "light" ? "text-blueGray-600" : "text-white"
                    }
                  >
                    {complaintData.phone}
                  </span>
                </td>
              </tr>

              <tr className="text-md">
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 text-left">
                  <span
                    className={
                      "font-bold " +
                      +(color === "light" ? "text-blueGray-600" : "text-white")
                    }
                  >
                    Complaint
                  </span>
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 text-left">
                  <span
                    className={
                      color === "light" ? "text-blueGray-600" : "text-white"
                    }
                  >
                    {complaintData.complaint}
                  </span>
                </td>
              </tr>

              <tr className="text-md">
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 text-left">
                  <span
                    className={
                      "font-bold " +
                      +(color === "light" ? "text-blueGray-600" : "text-white")
                    }
                  >
                    Reported User
                  </span>
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 text-left">
                  <span
                    className={
                      color === "light" ? "text-blueGray-600" : "text-white"
                    }
                  >
                    {complaintData.reportedName}
                  </span>
                </td>
              </tr>

              <tr className="text-md">
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 text-left">
                  <span
                    className={
                      "font-bold " +
                      +(color === "light" ? "text-blueGray-600" : "text-white")
                    }
                  >
                    Status
                  </span>
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 text-left">
                  <span
                    className={
                      color === "light" ? "text-blueGray-600" : "text-white"
                    }
                  >
                    {complaintData.status}
                  </span>
                </td>
              </tr>

              <tr className="text-md">
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 text-left">
                  <span
                    className={
                      "font-bold " +
                      +(color === "light" ? "text-blueGray-600" : "text-white")
                    }
                  >
                    Update Status
                  </span>
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 text-left flex">
                  <button
                    type="button"
                    onClick={() => {
                      saveStatus("In Progress");
                    }}
                    className="mr-4 w-24 h-12 flex justify-center items-center text-md text-white bg-blueGray-800 hover:bg-blueGray-800 transition-all font-medium rounded-lg px-5 py-2.5 text-center"
                  >
                    In Progress
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      saveStatus("Resolved");
                    }}
                    className="mr-4 w-24 h-12 flex justify-center items-center text-md text-white bg-blueGray-800 hover:bg-blueGray-800 transition-all font-medium rounded-lg px-5 py-2.5 text-center"
                  >
                    Resolved
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      saveStatus("Rejected");
                    }}
                    className="mr-4 w-24 h-12 flex justify-center items-center text-md text-white bg-blueGray-800 hover:bg-blueGray-800 transition-all font-medium rounded-lg px-5 py-2.5 text-center"
                  >
                    Rejected
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

ComplaintDetails.defaultProps = {
  color: "dark",
};

ComplaintDetails.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
