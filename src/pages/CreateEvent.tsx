import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface NewEventForm {
  eventName: string;
  location: string;
  date: string;
  organizer: string;
  description: string;
}

interface CreateEventProps {
  onEventCreated?: () => void;
}

const BAGUIO_LOCATIONS = [
  "Burnham Park Plaza", "Session Road Central", "Mines View Park Overlook",
  "Camp John Hay Eco-Trail", "La Trinidad Strawberry Fields Area",
  "Wright Park Riding Circle", "Baguio City Market Grounds",
  "Malcolm Square Amphitheater", "Asin Road Community Center"
];

const CreateEvent: React.FC<CreateEventProps> = ({ onEventCreated }) => {
  const navigate = useNavigate();
  const [isOtherSelected, setIsOtherSelected] = useState<boolean>(false);
  const [customLocation, setCustomLocation] = useState<string>("");

  const [formData, setFormData] = useState<NewEventForm>({
    eventName: "", location: "", date: "", organizer: "", description: ""
  });

  const handleLocationDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "Other") {
      setIsOtherSelected(true);
      setFormData((prev) => ({ ...prev, location: customLocation }));
    } else {
      setIsOtherSelected(false);
      setFormData((prev) => ({ ...prev, location: value }));
    }
  };

  const handleCustomLocationInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomLocation(value);
    setFormData((prev) => ({ ...prev, location: value }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.eventName || !formData.location.trim() || !formData.date || !formData.organizer) {
      alert("Please fill in all fields. Only the description can be left blank.");
      return;
    }
    try {
      await axios.post("http://localhost:5000/events", formData);
      alert("Event added successfully!");
      if (onEventCreated) {
        onEventCreated();
      } else {
        navigate("/");
      }
    } catch (error) {
      alert("Could not save to the database.");
    }
  };

  const todayDateString = new Date().toISOString().split("T")[0];

return (
    <div className="container-fluid px-4 px-md-5 create-page-container fade-in-page">
      <div className="row g-4 align-items-stretch create-master-row">
        <div className="col-12 col-lg-4 d-none d-lg-block">
          <div className="card shadow-sm border-0 h-100 create-side-decorative-image">
            <div className="card-body d-flex flex-column justify-content-end p-4 text-white text-start">
              <h4 className="fw-bold mb-1 text-white">Baguio City Hub</h4>
              <p className="small mb-0 text-white-50">Building clean and safe community spaces.</p>
            </div>
          </div>
        </div>
        
        <div className="col-12 col-lg-8">
          <div className="card shadow-sm border-0 text-start h-100 create-form-wrapper-card">
            <div className="card-body">
              
              <div className="create-form-content-inner">
                <div className="premium-form-header">
                  <h2 className="create-form-header-title">Create Event</h2>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mb-2"> 
                    <label className="form-label small fw-semibold text-secondary d-block">Event Name</label>
                    <input type="text" name="eventName" className="form-control" placeholder="e.g., Tree Planting, Trash Cleanup" value={formData.eventName} onChange={handleChange} required />
                  </div>

                  <div className="create-inline-fields mb-2"> 
                    <div className="create-field-block">
                      <label className="form-label small fw-semibold text-secondary d-block">Location</label>
                      <select name="locationDropdown" className="form-select" value={isOtherSelected ? "Other" : BAGUIO_LOCATIONS.includes(formData.location) ? formData.location : formData.location ? "Other" : ""} onChange={handleLocationDropdownChange} required>
                        <option value="" disabled>Choose a Location</option>
                        {BAGUIO_LOCATIONS.map((loc) => (<option key={loc} value={loc}>{loc}</option>))}
                        <option value="Other">Other</option>
                      </select>
                      {isOtherSelected && (
                        <input type="text" className="form-control mt-2" placeholder="Type custom location..." value={customLocation} onChange={handleCustomLocationInputChange} required />
                      )}
                    </div>
                    
                    <div className="create-field-block">
                      <label className="form-label small fw-semibold text-secondary d-block">Date</label>
                      <input type="date" name="date" className="form-control" min={todayDateString} value={formData.date} onChange={handleChange} required />
                    </div>
                  </div>

                  <div className="mb-2"> 
                    <label className="form-label small fw-semibold text-secondary d-block">Organizer</label>
                    <input type="text" name="organizer" className="form-control" placeholder="e.g., Green Club, Youth Council" value={formData.organizer} onChange={handleChange} required />
                  </div>

                  <div className="mb-3"> 
                    <label className="form-label small fw-semibold text-secondary d-block">Description</label>
                    <textarea name="description" className="form-control create-form-textarea" rows={2} placeholder="Tell people what they will do..." value={formData.description} onChange={handleChange}></textarea>
                  </div>

                  <div className="d-flex gap-2 justify-content-end pt-1">
                    <button type="button" className="btn create-cancel-btn" onClick={() => navigate("/")}>
                      Cancel
                    </button>
                    <button type="submit" className="btn create-submit-action-btn">
                      Create Event
                    </button>
                  </div>
                </form>
              </div> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
