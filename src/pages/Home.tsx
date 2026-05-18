import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; 
import EventList from "./EventList";
import { getEvents } from "../components/EventService";
import type { CommunityEvent } from "../components/EventService";

const Home: React.FC = () => {
  const [events, setEvents] = useState<CommunityEvent[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorOccurred, setErrorOccurred] = useState<boolean>(false);
  
  const location = useLocation(); 

  const fetchLatestData = async () => {
    try {
      setIsLoading(true);
      setErrorOccurred(false);
      const data = await getEvents();
      setEvents(data || []);
    } catch (err) {
      console.error(err);
      setErrorOccurred(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestData();
  }, [location.pathname, location.search]); 

  return (
    <div className="min-vh-100 bg-light home-page-overflow-mask">
      <section id="home" className="py-5 text-center position-relative text-white border-bottom hero-banner-section">
        <div className="container py-5 position-relative z-1 hero-content-container">
          <span className="badge fw-semibold text-uppercase px-3 py-2 rounded-pill mb-3 shadow-sm text-dark hero-sdg-badge">
            SDG 11: Sustainable Cities
          </span>
          <h1 className="mb-3 hero-main-title">Help Your Baguio Community.</h1>
          <p className="lead mx-auto mb-4 hero-sub-paragraph">
            Bring people together. Plan mountain cleanups, local art classes, flower festival meetings, and tree planting events around Baguio City.
          </p>
        </div>
      </section>

      <div className="container my-5 directory-section-container">
        <section id="list" className="w-100">
          <div className="card shadow-sm border-0 p-4 p-md-5 text-start">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h3 className="h4 fw-bold text-dark mb-1">Baguio Events</h3>
                <p className="text-muted small mb-0">Find active projects and cleanups around community</p>
              </div>
            </div>

            <EventList 
              events={events} 
              isLoading={isLoading} 
              errorOccurred={errorOccurred} 
              onRefreshTrigger={fetchLatestData} 
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
