import React, { useState, useEffect } from "react";
import { useSession, getSession } from "next-auth/react";
import Admin from "layouts/Admin.js";
import AllComplaints from "components/ViewComplaintUser";
import axios from "axios";

export default function ViewComplaint({ complaints }) {
  const { data: session, status } = useSession();
  console.log(complaints);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");

  useEffect(() => {
    setName(localStorage.getItem("name"));
  }, []);

  return (
    <Admin
      title="View Complaints"
      headerText="View all your registered complaints"
      image={session.user.image}
    >
      <div className="flex flex-wrap mt-4 justify-center">
        <div className="w-full mb-12 xl:mb-0 px-4">
          <div className="text-white">
            <AllComplaints complaints={complaints} />
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

  let complaints = [];
  await axios
    .post("http://localhost:3000/api/get-user-complaints", {
      email: session.user.email,
    })
    .then((response) => {
      complaints = response.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return {
    props: { session, complaints },
  };
}
