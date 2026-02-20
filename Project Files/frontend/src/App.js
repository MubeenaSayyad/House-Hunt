import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Common Pages
import Home from "./modules/common/Home";
import Login from "./modules/common/Login";
import Register from "./modules/common/Register";
import ForgotPassword from "./modules/common/ForgotPassword";
import PropertyDetails from "./modules/common/PropertyDetails";

// Admin Pages
import AdminHome from "./modules/admin/AdminHome";
import AllBookings from "./modules/admin/AllBookings";
import AllProperty from "./modules/admin/AllProperty";
import AllUsers from "./modules/admin/AllUsers";

// Owner Pages  (⚠ CAPITAL O)
import OwnerHome from "./modules/user/Owner/OwnerHome";
import AddProperty from "./modules/user/Owner/AddProperty";
import OwnerBookings from "./modules/user/Owner/AllBookings";
import OwnerProperties from "./modules/user/Owner/AllProperties";

// Renter Pages (⚠ small r)
import RenterHome from "./modules/user/renter/RenterHome";
import RenterProperties from "./modules/user/renter/AllProperties";

export const UserContext = createContext();

function App() {
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <Router>
        <Routes>

          {/* Common Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/propertydetails/:id" element={<PropertyDetails />} />

          {/* Admin Routes */}
          <Route path="/adminhome" element={<AdminHome />} />
          <Route path="/allbookings" element={<AllBookings />} />
          <Route path="/allproperty" element={<AllProperty />} />
          <Route path="/allusers" element={<AllUsers />} />

          {/* Owner Routes */}
          <Route path="/ownerhome" element={<OwnerHome />} />
          <Route path="/addproperty" element={<AddProperty />} />
          <Route path="/ownerbookings" element={<OwnerBookings />} />
          <Route path="/ownerproperties" element={<OwnerProperties />} />

          {/* Renter Routes */}
          <Route path="/renterhome" element={<RenterHome />} />
          <Route path="/renterproperties" element={<RenterProperties />} />

        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
