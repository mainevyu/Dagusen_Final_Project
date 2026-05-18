import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEventById, deleteEvent } from "../components/EventService";
import type { CommunityEvent } from "../components/EventService";

const EventDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<CommunityEvent | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) fetchDetails(id);
  }, [id]);

  const fetchDetails = async (eventId: string) => {
    try {
      setIsLoading(true);
      const data = await getEventById(eventId);
      setEvent(data);
    } catch (error) {
      alert("Could not load event details.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTrigger = async () => {
    if (!id || !window.confirm("Do you want to delete this event forever?")) return;
    try {
      await deleteEvent(id);
      alert("Event deleted successfully.");
      navigate("/");
    } catch (error) {
      alert("Could not remove the event.");
    }
  };

  if (isLoading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border text-success" role="status"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="container text-center py-5">
        <div className="alert alert-danger">Event profile reference entry could not be located.</div>
        <button className="btn btn-primary" onClick={() => navigate("/")}>Go Back Home</button>
      </div>
    );
  }

  return (
    <div className="container-fluid my-5 px-4 px-md-5 details-page-container fade-in-page">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button className="btn btn-outline-secondary d-inline-flex align-items-center gap-2" onClick={() => navigate("/")}>
          Back to Dashboard
        </button>
        <button className="btn btn-danger d-inline-flex align-items-center gap-2 px-3 text-white" onClick={handleDeleteTrigger}>
          Delete Event
        </button>
      </div>

      <div className="row g-4 text-start">
        <div className="col-12 col-lg-4">
          <div className="card shadow-sm border-0 bg-white h-100 overflow-hidden">
            <div className="p-4 details-card-header-banner d-flex flex-column justify-content-end" style={{ minHeight: "160px" }}>
              <div>
                <span className="badge bg-white-subtle text-white border border-white-subtle mb-2 small">Event Details</span>
                <h4 className="fw-bold mb-1 text-white text-wrap">{event.eventName}</h4>
              </div>
            </div>
            
            <div className="card-body p-4 d-flex flex-column gap-3">
              <div>
                <small className="text-muted d-block fw-semibold text-uppercase tracking-wider small mb-1">Event Location</small>
                <span className="text-dark fw-medium fs-6 d-block text-wrap">{event.location}</span>
              </div>
              <div>
                <small className="text-muted d-block fw-semibold text-uppercase tracking-wider small mb-1">Event Date</small>
                <span className="text-dark fw-medium fs-6">
                  {new Date(event.date).toLocaleDateString(undefined, {
                    month: "long",
                    day: "numeric",
                    year: "numeric"
                  })}
                </span>
              </div>
              <div>
                <small className="text-muted d-block fw-semibold text-uppercase tracking-wider small mb-1">Organized By</small>
                <span className="text-dark fw-medium fs-6 text-wrap">{event.organizer}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-8">
          <div className="card shadow-sm border-0 bg-white overflow-hidden h-100">
            
            <div className="p-4 p-md-5">
              <div className="mb-2">
                <h4 className="fw-bold text-dark mb-1">Project Overview</h4>
                <p className="text-muted small mb-0">Detailed summary profile information stored inside the database.</p>
              </div>
              <hr className="text-muted opacity-25 mb-4" />
              
              <div className="mb-4">
                <h6 className="text-dark fw-bold mb-3">About This Event</h6>
                <p className="p-4 rounded border text-secondary fs-6 text-wrap details-description-block-text">
                  {event.description || "No descriptive data details written for this community event."}
                </p>
              </div>

              <div className="pt-2">
                <button 
                  className="btn btn-primary px-4 py-2 fw-semibold d-inline-flex align-items-center gap-2" 
                  onClick={() => navigate(`/edit/${event._id}`)}>
                  Edit Details
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
