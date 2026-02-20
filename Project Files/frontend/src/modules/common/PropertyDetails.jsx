import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api";

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await API.get(`/property/${id}`);
        setProperty(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProperty();
  }, [id]); // now warning gone

  if (!property) return <h3 className="text-center mt-5">Loading...</h3>;

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <img
          src="https://images.unsplash.com/photo-1568605114967-8130f3a36994"
          className="img-fluid mb-3"
          alt="property"
        />
        <h3>{property.propertyType}</h3>
        <p><strong>Address:</strong> {property.propertyAddress}</p>
        <p><strong>Amount:</strong> ₹ {property.propertyAmt}</p>
        <p><strong>Owner:</strong> {property.ownerName}</p>
        <p><strong>Contact:</strong> {property.ownerContact}</p>
        <p><strong>Info:</strong> {property.additionalInfo}</p>
      </div>
    </div>
  );
};

export default PropertyDetails;