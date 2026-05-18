import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEventById, updateEvent } from "../components/EventService";

interface EditFormState {
  eventName: string; 
  location: string; 
  date: string; 
  organizer: string; 
  description: string;
}

const BAGUIO_LOCATIONS = [
  "Burnham Park Plaza", "Session Road Central", "Mines View Park Overlook",
  "Camp John Hay Eco-Trail", "La Trinidad Strawberry Fields Area",
  "Wright Park Riding Circle", "Baguio City Market Grounds",
  "Malcolm Square Amphitheater", "Asin Road Community Center"
];

const EditEvent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isOtherSelected, setIsOtherSelected] = useState<boolean>(false);
  const [customLocation, setCustomLocation] = useState<string>("");

  const [formData, setFormData] = useState<EditFormState>({
    eventName: "", location: "", date: "", organizer: "", description: ""
  });

  useEffect(() => {
    if (id) fetchEvent(id);
  }, [id]);

  const fetchEvent = async (eventId: string) => {
    try {
      setIsLoading(true);
      const data = await getEventById(eventId);
      const isPredefined = BAGUIO_LOCATIONS.includes(data.location);
      
      setFormData({
        eventName: data.eventName,
        location: data.location,
        date: data.date ? data.date.substring(0, 10) : "",
        organizer: data.organizer,
        description: data.description || ""
      });

      if (!isPredefined && data.location) {
        setIsOtherSelected(true);
        setCustomLocation(data.location);
      }
    } catch (error) { 
      alert("Could not load event data."); 
    } finally { 
      setIsLoading(false); 
    }
  };

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    try {
      await updateEvent(id, formData);
      alert("Event updated successfully!");
      navigate(`/events/${id}`);
    } catch (error) { 
      alert("Could not update event."); 
    }
  };

  if (isLoading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border text-success" role="status"></div>
      </div>
    );
  }

  return (
    <div className="container-fluid my-5 px-4 px-md-5 details-page-container fade-in-page">
      <div className="row g-4 text-start">
  
        <div className="col-12 col-lg-4">
          <div className="card shadow-sm border-0 bg-white h-100 overflow-hidden">
            <div className="p-4 details-card-header-banner d-flex flex-column justify-content-end" style={{ minHeight: "160px" }}>
              <div>
                <span className="badge bg-white-subtle text-white border border-white-subtle mb-2 small">Live Preview</span>
                <h4 className="fw-bold mb-0 text-white text-truncate">{formData.eventName || "Untitled Event"}</h4>
              </div>
            </div>
            
            <div className="card-body p-4 d-flex flex-column gap-3">
              <div>
                <small className="text-muted d-block fw-semibold text-uppercase tracking-wider small mb-1">Event Location</small>
                <span className="text-dark fw-medium fs-6 d-block text-wrap">{formData.location || "Not assigned"}</span>
              </div>
              <div>
                <small className="text-muted d-block fw-semibold text-uppercase tracking-wider small mb-1">Event Date</small>
                <span className="text-dark fw-medium fs-6">
                  {formData.date ? new Date(formData.date).toLocaleDateString(undefined, {
                    month: "long",
                    day: "numeric",
                    year: "numeric"
                  }) : "Not set"}
                </span>
              </div>
              <div>
                <small className="text-muted d-block fw-semibold text-uppercase tracking-wider small mb-1">Organized By</small>
                <span className="text-dark fw-medium fs-6 text-wrap">{formData.organizer || "Unassigned"}</span>
              </div>
              
              <div className="mt-2 border-top pt-3">
                <small className="text-muted d-block fw-semibold text-uppercase tracking-wider small mb-2">About This Event Preview</small>
                <p className="p-3 rounded border text-secondary fs-6 text-wrap details-description-block-text mb-0">
                  {formData.description || "No descriptive text changes written yet..."}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-8">
          <div className="card shadow-sm border-0 bg-white overflow-hidden h-100">
            <div className="p-4 p-md-5">
              
              <div className="mb-2">
                <h4 className="fw-bold text-dark mb-1">Edit Event Settings</h4>
                <p className="text-muted small mb-0">Modify the fields below to update this database record.</p>
              </div>
              <hr className="text-muted opacity-25 mb-4" />
              
              <form onSubmit={handleFormSubmit}>
                <div className="mb-3">
                  <label className="form-label small fw-semibold text-secondary d-block">Event Name</label>
                  <input type="text" name="eventName" className="form-control" value={formData.eventName} onChange={handleInputChange} required />
                </div>

                <div className="create-inline-fields mb-3">
                  <div className="create-field-block">
                    <label className="form-label small fw-semibold text-secondary d-block">Where in Baguio</label>
                    <select name="locationDropdown" className="form-select" value={isOtherSelected ? "Other" : formData.location} onChange={handleLocationDropdownChange} required>
                      {BAGUIO_LOCATIONS.map((loc) => (<option key={loc} value={loc}>{loc}</option>))}
                      <option value="Other">Other</option>
                    </select>
                    {isOtherSelected && (
                      <input type="text" className="form-control mt-2" placeholder="Type other location here..." value={customLocation} onChange={handleCustomLocationInputChange} required />
                    )}
                  </div>
                  
                  <div className="create-field-block">
                    <label className="form-label small fw-semibold text-secondary d-block">Event Date</label>
                    <input type="date" name="date" className="form-control" value={formData.date} onChange={handleInputChange} required />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-semibold text-secondary d-block">Who is organizing it</label>
                  <input type="text" name="organizer" className="form-control" value={formData.organizer} onChange={handleInputChange} required />
                </div>

                <div className="mb-4">
                  <label className="form-label small fw-semibold text-secondary d-block">Event Details</label>
                  <textarea name="description" className="form-control details-description-block-text" rows={3} value={formData.description} onChange={handleInputChange}></textarea>
                </div>
                <div className="d-flex gap-2 justify-content-end pt-2">
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary px-4 fw-semibold" 
                    onClick={() => navigate(`/events/${id}`)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary px-4 py-2 fw-semibold d-inline-flex align-items-center gap-2"
                  >
                    Save Changes
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEvent;
