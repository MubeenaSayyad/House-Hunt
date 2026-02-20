import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../../services/api";

const Home = () => {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const res = await API.get("/property/getall");
      setProperties(res.data.data || []);
    } catch (error) {
      console.log("Error fetching properties:", error);
    }
  };

  return (
    <div className="container mt-4">

      {/* Top Login / Register Buttons */}
      <div className="d-flex justify-content-end mb-3">
        <Link to="/login" className="btn btn-outline-primary me-2">
          Login
        </Link>
        <Link to="/register" className="btn btn-primary">
          Register
        </Link>
      </div>

      <h2 className="text-center mb-4">Available Properties</h2>

      <div className="row">
        {properties.length === 0 ? (
          <p className="text-center">No Properties Available</p>
        ) : (
          properties.map((item) => (
            <div className="col-md-4" key={item._id}>
              <div className="card mb-4 shadow-sm">

                {/* If backend image exists use it, else default */}
                <img
                  src={
                    item.propertyImage
                      ? `http://localhost:8001/uploads/${item.propertyImage}`
                      : "https://images.unsplash.com/photo-1568605114967-8130f3a36994"
                  }
                  className="card-img-top"
                  alt="property"
                  style={{ height: "200px", objectFit: "cover" }}
                />

                <div className="card-body">
                  <h5 className="card-title">{item.propertyType}</h5>
                  <p className="card-text">{item.propertyAddress}</p>
                  <p><strong>₹ {item.propertyAmt}</strong></p>

                  <button
                    className="btn btn-primary w-100"
                    onClick={() => navigate(`/propertydetails/${item._id}`)}
                  >
                    View Details
                  </button>
                </div>

              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;