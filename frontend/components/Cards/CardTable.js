import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";

export default function CardTable({
  color,
  users,
  formData,
  handleChange,
  handleSubmit,
}) {
  const router = useRouter();
  const analyzeUser = async (user) => {
    let allTweets = [];
    await axios
      .post("http://127.0.0.1:5000/get-tweets", {
        username: user,
      })
      .then(function (response) {
        allTweets = response.data;
        // console.log(allTweets);
      })
      .catch(function (error) {
        console.log(error);
      });
    let result = [];
    await axios
      .post("http://localhost:3000/api/analyseTweet", {
        inputs: allTweets,
      })
      .then(function (response) {
        result = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });

    console.log(result);

    const finalReview = {
      "Not Hate": 0,
      "Physical Harassment": 0,
      "Not Sexist": 0,
      "Sexual Harassment": 0,
      "Indirect Harassment": 0,
    };

    for (let item of result) {
      for (let i = 0; i < 5; i++) {
        finalReview["Not Hate"] +=
          item[i].label == "Not Hate" ? item[i].score / result.length : 0;

        finalReview["Physical Harassment"] +=
          item[i].label == "Physical Harassment"
            ? item[i].score / result.length
            : 0;

        finalReview["Not Sexist"] +=
          item[i].label == "Not Sexist" ? item[i].score / result.length : 0;

        finalReview["Sexual Harassment"] +=
          item[i].label == "Sexual Harassment"
            ? item[i].score / result.length
            : 0;

        finalReview["Indirect Harassment"] +=
          item[i].label == "Indirect Harassment"
            ? item[i].score / result.length
            : 0;
      }
    }

    const analysis = [];

    if (finalReview["Not Hate"] <= 0.6) {
      analysis.push("Hate");
    }
    if (finalReview["Physical Harassment"] >= 0.4) {
      analysis.push("Physical Harassment");
    }
    if (finalReview["Not Sexist"] <= 0.6) {
      analysis.push("Sexist");
    }
    if (finalReview["Sexual Harassment"] >= 0.4) {
      analysis.push("Sexual Harassment");
    }
    if (finalReview["Indirect Harassment"] >= 0.4) {
      analysis.push("Indirect Harassment");
    }

    const analysisString = `Analysis:
    Hate: ${(1 - finalReview["Not Hate"]) * 100}%
    Sexist: ${(1 - finalReview["Not Sexist"]) * 100}%
    Physical Harassment: ${finalReview["Physical Harassment"] * 100}%
    Sexual Harassment: ${finalReview["Sexual Harassment"] * 100}%
    Indirect Harassment: ${finalReview["Indirect Harassment"] * 100}%
    `;
    alert(analysisString);
  };
  const tableData = users.map((user, index) => {
    return (
      <tr key={index} className="text-md">
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4">
          {index + 1}
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 text-left">
          <span
            className={
              "font-bold " +
              +(color === "light" ? "text-blueGray-600" : "text-white")
            }
          >
            {user}
          </span>
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 text-left">
          <button
            type="button"
            onClick={() => {
              analyzeUser(user);
            }}
            className="w-20 h-12 flex justify-center items-center text-md text-white bg-blueGray-800 hover:bg-blueGray-800 transition-all font-medium rounded-lg px-5 py-2.5 text-center"
          >
            Analyze
          </button>
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 text-left">
          <button
            type="button"
            onClick={async () => {
              localStorage.setItem("name", user);
              router.push("/file-complaint");
              await axios.post("http://localhost:3000/api/report-user", {
                username: user,
              });
            }}
            className="w-20 h-12 flex justify-center items-center text-md text-white bg-blueGray-800 hover:bg-blueGray-800 transition-all font-medium rounded-lg px-5 py-2.5 text-center"
          >
            Report
          </button>
        </td>
      </tr>
    );
  });
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
                <div className="mb-3 mr-2">
                  <form className="flex" onSubmit={handleSubmit}>
                    <input
                      className="mr-2 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      id="username"
                      type="text"
                      placeholder="Enter your twitter username"
                      name="username"
                      required
                      onChange={handleChange}
                      value={formData.username}
                    />
                    <button
                      type="submit"
                      className="ml-2 w-96 h-12 flex justify-center items-center text-md text-white bg-blueGray-800 hover:bg-blueGray-800 transition-all font-medium rounded-lg px-5 py-2.5 text-center"
                    >
                      Search
                    </button>
                  </form>
                </div>
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
                  Sr. No.
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  Name
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  Analyze
                </th>

                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  Report
                </th>

                {/* <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                ></th> */}
              </tr>
            </thead>
            <tbody>{tableData}</tbody>
          </table>
        </div>
      </div>
    </>
  );
}

CardTable.defaultProps = {
  color: "dark",
};

CardTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
