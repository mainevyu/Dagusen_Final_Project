import React, { useState } from "react";
import { deleteEvent } from "../components/EventService";
import type { CommunityEvent } from "../components/EventService";
import { Link } from "react-router-dom";

interface EventListProps {
  events: CommunityEvent[];
  isLoading: boolean;
  errorOccurred: boolean; 
  onRefreshTrigger: () => void;
}

const EventList: React.FC<EventListProps> = ({ events, isLoading, errorOccurred, onRefreshTrigger }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this record from the events list?")) {
      try {
        await deleteEvent(id);
        alert("Event deleted successfully!");
        onRefreshTrigger();
      } catch (error) {
        alert("Could not remove the event.");
      }
    }
  };

  const filteredEventsList = events.filter((e) =>
    e.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.organizer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-success" role="status"></div>
      </div>
    );
  }

  if (errorOccurred) {
    return (
      <div className="text-center py-5 bg-light rounded-3 border border-dashed my-2">
        <p className="text-muted mb-1 fw-semibold fs-6">Could not connect to the server.</p>
        <small className="text-secondary d-block">Please verify your database or Express API server is active.</small>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column gap-3 text-start fade-in-page">
      <div className="d-flex align-items-center gap-2 mb-2 w-100">
        <input
          type="text"
          className="form-control"
          placeholder="Search by event name, location, or group..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button className="btn btn-outline-secondary btn-sm px-3 py-2" onClick={() => setSearchQuery("")}>
            Clear
          </button>
        )}
      </div>

      {filteredEventsList.length === 0 ? (
        <div className="text-center py-5 bg-light rounded-3 border border-dashed my-2">
          <p className="text-muted mb-1 fw-semibold fs-6">No records found matching your search values.</p>
          <small className="text-secondary d-block">Try adjusting your filter text or register a new event.</small>
        </div>
      ) : (
        <div className="table-responsive border rounded-3 bg-white w-100">
          <table className="table table-hover align-middle mb-0 registry-spreadsheet-table w-100">
            <thead className="table-light text-secondary small fw-bold text-uppercase">
              <tr>
                <th className="project-name-col">Event Name</th>
                <th className="location-col">Location</th>
                <th className="organizer-col">Organizer</th>
                <th className="date-col">Date</th>
                <th className="actions-col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEventsList.map((event) => (
                <tr key={event._id}>
                  <td className="project-name-col fw-semibold text-dark text-wrap">
                    {event.eventName}
                  </td>
                  
                  <td className="location-col text-wrap">
                    <span className="badge bg-light text-dark border border-light-subtle fw-medium px-2 py-1 text-wrap d-inline-block">
                      {event.location}
                    </span>
                  </td>
                  
                  <td className="organizer-col text-secondary small text-wrap">
                    {event.organizer}
                  </td>
                  
                  <td className="date-col text-secondary small text-nowrap">
                    {new Date(event.date).toLocaleDateString(undefined, {
                      month: "numeric",
                      day: "numeric",
                      year: "numeric"
                    })}
                  </td>
                  
                  <td className="actions-col">
                    <div className="d-flex gap-2 justify-content-end align-items-center">
                      <Link 
                        to={`/events/${event._id}`} 
                        className="btn btn-light btn-sm border fw-semibold px-3 table-action-btn-edit"
                      >
                        Edit
                      </Link>
                      <button 
                        onClick={() => handleDelete(event._id)} 
                        className="btn btn-danger btn-sm px-3 table-action-btn-remove text-white"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EventList;
