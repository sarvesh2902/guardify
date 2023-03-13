import React, { useState, useEffect } from "react";
import { useSession, getSession } from "next-auth/react";
import Admin from "layouts/Admin.js";
import AllComplaints from "components/ViewComplaint";
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
      title="File Complaints"
      headerText="Enter your details here to file the complaint"
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
    .get("http://localhost:3000/api/get-all-complaints")
    .then((response) => {
      complaints = response.data;
      console.log(complaints);
    })
    .catch((err) => {
      console.log(err);
    });
  return {
    props: { session, complaints },
  };
}
