import React, { useState, useEffect } from "react";
import { useSession, getSession } from "next-auth/react";
import Admin from "layouts/Admin.js";
import AllComplaints from "components/ViewComplaintUser";
import axios from "axios";
import { useRouter } from "next/router";
import ComplaintDetails from "components/ComplaintDetails";

export default function ViewComplaint() {
  const router = useRouter();
  const path = router.asPath.split("/")[2];
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [complaintData, setComplaintData] = useState({
    subject: "",
  });

  useEffect(() => {
    setName(localStorage.getItem("name"));
    axios
      .post("http://localhost:3000/api/get-complaints-by-id", {
        id: path,
      })
      .then((res) => {
        setComplaintData(res.data);
      });
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
            <ComplaintDetails complaintData={complaintData} />
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
