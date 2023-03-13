import React from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import ReactLoading from "react-loading";

const FileComplaint = ({ name }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    subject: "",
    name: "",
    address: "",
    city: "",
    code: "",
    phone: "",
    email: "",
    complaint: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [output, setOutput] = useState(null);
  const handleChange = (event) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsDisabled(true);
    setIsLoading(true);
    console.log(formData);
    let data = null;

    await axios
      .post("http://localhost:3000/api/fileComplaint", {
        subject: formData.subject,
        name: formData.name,
        address: formData.address,
        city: formData.city,
        code: formData.code,
        phone: formData.phone,
        email: formData.email,
        complaint: formData.complaint,
        reportedName: name,
      })
      .then(function (response) {
        setIsDisabled(false);
        setIsLoading(false);
        data = response.data;
        console.log(data);
        setOutput(data);
        console.log(output);
      })
      .catch(function (error) {
        console.log(error);
      });
    setFormData({
      subject: "",
      name: "",
      address: "",
      city: "",
      code: "",
      phone: "",
      email: "",
      complaint: "",
    });
    alert("Complaint sent successfully");
    router.push("view-complaint");
  };
  return (
    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
      <div className="flex-auto px-4 lg:px-10 py-10">
        <form onSubmit={handleSubmit}>
          <div className="">
            <div className="mb-3">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="subject"
              >
                Subject
              </label>
              <input
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                id="subject"
                type="text"
                placeholder="Subject"
                name="subject"
                required
                onChange={handleChange}
                value={formData.subject}
              />
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="mb-3 mr-2">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                id="name"
                placeholder="Name"
                name="name"
                required
                onChange={handleChange}
                value={formData.name}
              />
            </div>

            <div className="ml-2 mb-3">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="address"
              >
                Address
              </label>
              <input
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                id="address"
                type="text"
                placeholder="Address"
                name="address"
                required
                onChange={handleChange}
                value={formData.address}
              />
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="mr-2 mb-3">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="city"
              >
                City
              </label>
              <input
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                id="city"
                type="text"
                placeholder="City"
                name="city"
                required
                onChange={handleChange}
                value={formData.city}
              />
            </div>

            <div className="ml-2 mb-3">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="code"
              >
                Postal Code
              </label>
              <input
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                id="code"
                type="number"
                placeholder="Postal Code"
                name="code"
                required
                onChange={handleChange}
                value={formData.code}
              />
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="mr-2 mb-3">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="phone"
              >
                Phone
              </label>
              <input
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                id="phone"
                type="number"
                placeholder="Phone"
                name="phone"
                required
                onChange={handleChange}
                value={formData.phone}
              />
            </div>

            <div className="ml-2 mb-3">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                id="email"
                type="email"
                placeholder="Email"
                name="email"
                required
                onChange={handleChange}
                value={formData.email}
              />
            </div>
          </div>
          <div className="mb-3">
            <label
              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              htmlFor="complaint"
            >
              Complaint
            </label>
            <textarea
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              id="complaint"
              placeholder="Complaint"
              name="complaint"
              required
              rows={10}
              onChange={handleChange}
              value={formData.complaint}
            />
          </div>

          {/* <div className="mb-3">
            <label
              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              htmlFor="Soil"
            >
              Soil Type
            </label>
            <select
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              id="Soil"
              name="Soil"
              required
              onChange={handleChange}
              value={formData.Soil}
            >
              <option value="0">Black</option>
              <option value="1" selected>
                Clayey
              </option>
              <option value="2">Loamy</option>
              <option value="3">Red</option>
              <option value="4">Sandy</option>
            </select>
          </div> */}

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              disabled={isDisabled}
              className="w-96 h-12 flex justify-center items-center text-md text-white bg-blueGray-800 hover:bg-blueGray-800 transition-all font-medium rounded-lg px-5 py-2.5 text-center"
            >
              {isLoading ? (
                <ReactLoading
                  type="bars"
                  color="#ffffff"
                  height={25}
                  width={25}
                />
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FileComplaint;
