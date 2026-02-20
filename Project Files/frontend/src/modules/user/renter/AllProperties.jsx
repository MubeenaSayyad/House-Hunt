import { message } from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const AllProperties = () => {
  const [allProperties, setAllProperties] = useState([]);

  // ✅ Fetch All Properties (NOT bookings)
  const getAllProperties = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8001/api/property/getall"
      );

      if (response.data.success) {
        setAllProperties(response.data.data);
      } else {
        message.error("Failed to fetch properties");
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };

  useEffect(() => {
    getAllProperties();
  }, []);

  return (
    <div className="p-4">
      <h3 style={{ marginBottom: 20 }}>All Available Properties</h3>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Property ID</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Ad Type</TableCell>
              <TableCell>Address</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Owner</TableCell>
              <TableCell align="center">Availability</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {allProperties.map((property) => (
              <TableRow key={property._id}>
                <TableCell>{property._id}</TableCell>
                <TableCell>{property.propertyType}</TableCell>
                <TableCell>{property.propertyAdType}</TableCell>
                <TableCell>{property.propertyAddress}</TableCell>
                <TableCell align="center">
                  ₹ {property.propertyAmt}
                </TableCell>
                <TableCell align="center">
                  {property.ownerName}
                </TableCell>
                <TableCell align="center">
                  {property.availability ? "Available" : "Not Available"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AllProperties;
