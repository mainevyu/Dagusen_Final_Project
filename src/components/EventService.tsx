import axios from "axios";

const API_URL = "http://localhost:5000/events";

export interface CommunityEvent {
  _id: string;
  eventName: string;
  location: string;
  date: string;
  organizer: string;
  description?: string;
}

export const getEvents = async (): Promise<CommunityEvent[]> => {
  const response = await axios.get<CommunityEvent[]>(API_URL);
  return response.data;
};

export const getEventById = async (id: string): Promise<CommunityEvent> => {
  const response = await axios.get<CommunityEvent>(`${API_URL}/${id}`);
  return response.data;
};

export const updateEvent = async (id: string, updatedEvent: Omit<CommunityEvent, "_id">): Promise<CommunityEvent> => {
  const response = await axios.put<CommunityEvent>(`${API_URL}/${id}`, updatedEvent);
  return response.data;
};

export const deleteEvent = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
