import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";

import Navbar from "./components/NavBar";
import ScrollToHash from "./components/ScrollToHash"; 
import Home from "./pages/Home";
import CreateEvent from "./pages/CreateEvent"; 
import EventDetails from "./pages/EventDetails";
import EditEvent from "./pages/EditEvent";
import Footer from "./components/Footer";

const App: React.FC = () => {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <ScrollToHash /> 
        
        <Navbar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateEvent />} /> 
            <Route path="/events/:id" element={<EventDetails />} />
            <Route path="/edit/:id" element={<EditEvent />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
