import React, { useState, useEffect } from "react";
import { useSession, getSession } from "next-auth/react";
import Admin from "layouts/Admin.js";
import FileComplaint from "components/FileComplaint";
import CardTable from "components/Cards/CardTable";
import axios from "axios";

export default function Analyze() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    username: "",
  });

  const handleChange = (event) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };

  const [usernames, setUsernames] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);

    await axios
      .post("http://127.0.0.1:5000/get-followings", {
        username: formData.username,
      })
      .then((res) => {
        console.log(res.data);
        setUsernames(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Admin
      title="Analyze your followings"
      headerText="Click the analyze button to analyze the tweets of your followings"
      image={session.user.image}
    >
      <div className="flex flex-wrap mt-4 justify-center">
        <div className="w-full mb-12 xl:mb-0 px-4">
          <div className="text-white">
            <CardTable
              users={usernames}
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </Admin>
  );
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
