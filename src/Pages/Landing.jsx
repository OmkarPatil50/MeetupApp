import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "..";
import { Navbar } from "../Components/Navbar";

export function Landing() {
  const { state, dispatch } = useContext(AppContext);

  return (
    <div className="main-page">
      <Navbar />
      <div className="sub-section">
        <div className="sub-section-heading">
          <h2>
            <span>Meetup</span> Events
          </h2>
          <select
            name="type"
            id="type"
            onChange={(event) =>
              dispatch({
                type: "UPDATE_FILTER_TYPE",
                payload: event.target.value
              })
            }
          >
            <option value="Both">Select Event Type</option>
            <option>Online</option>
            <option>Offline</option>
            <option>Both</option>
          </select>
        </div>
        <ul>
          {state.renderList?.map((event) => {
            const {
              id,
              title,
              eventStartTime,
              eventThumbnail,
              eventType
            } = event;

            return (
              <li key={id} className="meetup-card">
                <Link to={`/event/${id}`} className="link">
                  <div className="meetup-card-header">
                    <img
                      src={eventThumbnail}
                      alt="event-thumbnail"
                      className="event-thumbnail-card"
                    />
                    <p className="event-type-tag">{eventType} Event</p>
                  </div>
                  <p className="event-time-landing">{eventStartTime}</p>
                  <h3 className="event-title-landing">{title}</h3>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
