import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Card, Modal, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { message } from "antd";

const AllPropertiesCards = ({ loggedIn }) => {
  const [show, setShow] = useState(false);
  const [allProperties, setAllProperties] = useState([]);
  const [propertyOpen, setPropertyOpen] = useState(null);

  const [userDetails, setUserDetails] = useState({
    fullName: "",
    phone: "",
  });

  // ✅ GET ALL PROPERTIES
  const getAllProperties = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8001/api/property/getall"
      );

      if (res.data.success) {
        setAllProperties(res.data.data);
      } else {
        message.error("Failed to load properties");
      }
    } catch (error) {
      console.log(error);
      message.error("Server error while fetching properties");
    }
  };

  useEffect(() => {
    getAllProperties();
  }, []);

  const handleClose = () => {
    setShow(false);
    setUserDetails({ fullName: "", phone: "" });
  };

  const handleShow = (propertyId) => {
    setPropertyOpen(propertyId);
    setShow(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleBooking = async (propertyId, ownerId) => {
    try {
      const res = await axios.post(
        `http://localhost:8001/api/user/bookinghandle/${propertyId}`,
        { userDetails, status: "pending", ownerId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.success) {
        message.success(res.data.message);
        handleClose();
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Booking failed");
    }
  };

  return (
    <div className="d-flex flex-wrap justify-content-center mt-4">
      {allProperties.length > 0 ? (
        allProperties.map((property) => {

          // ✅ FIXED IMAGE URL
          const imageUrl = property.propertyImage
            ? `http://localhost:8001/uploads/${property.propertyImage}`
            : "http://localhost:8001/uploads/house1.jpg";

          return (
            <Card
              key={property._id}
              style={{
                width: "300px",
                margin: "15px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
              }}
            >
              {/* ✅ IMAGE SECTION */}
              <Card.Img
                variant="top"
                src={imageUrl}
                style={{
                  height: "200px",
                  objectFit: "cover",
                }}
                onError={(e) => {
                  e.target.src =
                    "http://localhost:8001/uploads/house1.jpg";
                }}
              />

              <Card.Body>
                <Card.Text>
                  <b>Location:</b> {property.propertyAddress} <br />
                  <b>Type:</b> {property.propertyType} <br />
                  <b>Ad Type:</b> {property.propertyAdType} <br />
                  <b>Price:</b> ₹ {property.propertyAmt}
                </Card.Text>

                {!loggedIn ? (
                  <Link to="/login">
                    <Button variant="dark">Login to View</Button>
                  </Link>
                ) : property.availability ? (
                  <>
                    <Button
                      onClick={() => handleShow(property._id)}
                      variant="dark"
                    >
                      Get Info
                    </Button>

                    <Modal
                      show={show && propertyOpen === property._id}
                      onHide={handleClose}
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>Property Details</Modal.Title>
                      </Modal.Header>

                      <Modal.Body>
                        <p><b>Owner Contact:</b> {property.ownerContact}</p>
                        <p><b>Amount:</b> ₹ {property.propertyAmt}</p>
                        <p><b>Additional Info:</b> {property.additionalInfo}</p>

                        <Form
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleBooking(property._id, property.ownerId);
                          }}
                        >
                          <Row>
                            <Col md={6}>
                              <Form.Control
                                type="text"
                                placeholder="Full Name"
                                required
                                name="fullName"
                                value={userDetails.fullName}
                                onChange={handleChange}
                              />
                            </Col>

                            <Col md={6}>
                              <Form.Control
                                type="text"
                                placeholder="Phone Number"
                                required
                                name="phone"
                                value={userDetails.phone}
                                onChange={handleChange}
                              />
                            </Col>
                          </Row>

                          <Button
                            type="submit"
                            className="mt-3"
                            variant="secondary"
                          >
                            Book Property
                          </Button>
                        </Form>
                      </Modal.Body>
                    </Modal>
                  </>
                ) : (
                  <p style={{ color: "red" }}>Not Available</p>
                )}
              </Card.Body>
            </Card>
          );
        })
      ) : (
        <h5 className="text-center mt-4">No Properties Available</h5>
      )}
    </div>
  );
};

export default AllPropertiesCards;