import React, { useEffect, useState } from "react";

import { Typography } from "@mui/material";
import { getAuthorizationRequests } from "../../services/apiService";

const AuthorizationList = () => {
  const [requests, setRequests] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchRequests = async () => {
      const data = await getAuthorizationRequests(token);
      setRequests(data);
    };
    fetchRequests();
  }, [token]);

  return (
    <div>
      <Typography variant="h4">Authorization Requests</Typography>
      <ul>
        {requests.map((request) => (
          <li key={request._id}>
            <span>
              {request.treatmentType} - {request.insurancePlan}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuthorizationList;
