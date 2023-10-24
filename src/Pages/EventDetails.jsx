import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AppContext } from "..";
import { Navbar } from "../Components/Navbar";

export function EventDetails() {
  const { eventID } = useParams();
  const { state, dispatch } = useContext(AppContext);
  const [eventDetails, setEventDetails] = useState({});
  const [rsvpText, setRsvpText] = useState("RSVP");
  const [showRsvpBox, setShowRsvpBox] = useState(false);

  const getEventDetails = () => {
    const event = state.renderList.find(({ id }) => id === eventID);
    setEventDetails(event);
  };

  useEffect(() => {
    getEventDetails();
  }, [eventID]);

  const {
    id,
    title,
    eventStartTime,
    eventEndTime,
    location,
    address,
    eventThumbnail,
    eventDescription,
    hostedBy,
    eventType,
    isPaid,
    eventTags,
    speakers,
    price,
    additionalInformation
  } = eventDetails;

  return (
    <div className="main-page">
      <Navbar />
      <div className="sub-section-details">
        <Link to="/">
          <i className="fa-solid fa-arrow-left arrow"></i>
        </Link>
        <div className="left-section">
          <h1 className="details-page-heading">{title}</h1>
          <p className="hosted-head">Hosted By:</p>
          <h3 className="hosted-company">{hostedBy}</h3>
          <img
            src={eventThumbnail}
            alt="event-thumbnail"
            className="event-details-thumbnail"
          />
          <h3 className="details-info-heading">Details:</h3>
          <p>{eventDescription}</p>
          <h3 className="details-info-heading">Additional Information:</h3>
          <p>
            <strong>Dress Code:</strong>
            {additionalInformation?.dressCode}
          </p>
          <p>
            <strong>Age Restrictions:</strong>
            {additionalInformation?.ageRestrictions}
          </p>
          <h3 className="details-info-heading">Event Tags</h3>
          <ul>
            {eventTags?.map((tag) => {
              return <p className="event-tag">{tag}</p>;
            })}
          </ul>
        </div>
        <div className="right-section">
          <div className="event-info-box">
            <div className="event-info-list-item">
              <i className="fa-solid fa-clock"></i>
              <p>
                {eventStartTime} to {eventEndTime}
              </p>
            </div>
            <div className="event-info-list-item">
              <i className="fa-solid fa-location-dot"></i>
              <div className="address">
                <p>{location}</p>
                <p>{address}</p>
              </div>
            </div>
            <div className="event-info-list-item">
              <i className="fa-solid fa-indian-rupee-sign"></i>
              <p>{price}</p>
            </div>
          </div>
          <div className="event-speakers-box">
            <h3>Speakers: ({speakers?.length})</h3>
            <ul>
              {speakers?.map(({ name, image, designation }) => {
                return (
                  <div className="speaker-list-item">
                    <img src={image} alt="speaker" className="speaker-img" />
                    <h3 className="speaker-name">{name}</h3>
                    <p className="speaker-designation">{designation}</p>
                  </div>
                );
              })}
            </ul>
          </div>
          <button
            className="rsvp-main-btn"
            onClick={() => setShowRsvpBox(true)}
            disabled={rsvpText === "Already RSVPed"}
          >
            {rsvpText}
          </button>
        </div>
        {showRsvpBox && (
          <div className="rsvp-page">
            <div className="rsvp-box">
              <h2>Complete Your RSVP</h2>
              <p>Fill in your Personal Information</p>
              <form name="form">
                <label htmlFor="name">Name</label>
                <input type="text" name="form" required />
                <label htmlFor="email">Email</label>
                <input type="email" name="email" required />
                {isPaid && (
                  <p className="paid-tag">
                    * You have to make payment at the venue
                  </p>
                )}
                <button
                  type="submit"
                  onClick={() => {
                    setRsvpText("Already RSVPed");
                    setShowRsvpBox(false);
                  }}
                  className="rsvp-btn"
                >
                  RSVP
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
