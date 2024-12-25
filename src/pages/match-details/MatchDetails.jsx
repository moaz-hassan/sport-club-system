import { useState } from "react";
import "./match.css";

function MatchDetails() {
  const matchDetails = {
    date: "24th July, 2021",
    time: "10:00 AM",
    location: "Stadium A",
    stadiumCapacity: "50,000",
  };
  const [details, setDetails] = useState("squad");

  return (
    <div className="match-container">
      <header>
        <div className="teams">
          <div className="team">
            <img
              src="/public/_0023605b-ba8a-4dca-bfba-d8f0c2be9017.jpeg"
              alt="team1"
            />
            <h3>Team A</h3>
          </div>
          <div className="result">
            <h2>0 : 1</h2>
          </div>
          <div className="team">
            <img
              src="/public/_0023605b-ba8a-4dca-bfba-d8f0c2be9017.jpeg"
              alt="team2"
            />
            <h3>Team B</h3>
          </div>
        </div>
      </header>
      <nav className="match-details-nav">
        <span
          onClick={() => {
            setDetails("ticket");
          }}
          style={details === "ticket" ? { backgroundColor: "#dadada" } : null}
        >
          Buy ticket
        </span>
        <span
          onClick={() => {
            setDetails("squad");
          }}
          style={details === "squad" ? { backgroundColor: "#dadada" } : null}
        >
          Squad
        </span>
      </nav>
      {details === "squad" && <h2 className="details-title">Match details</h2>}
      {details === "squad" && (
        <div className="match-details">
          <div className="squad">
            <div className="match-squad">
              <span className="gk" style={{ marginBottom: "-20px" }}>
                moaz
              </span>
              <div className="row1">
                <span className="lb">moaz</span>
                <span className="cb pos1">moaz</span>
                <span className="cb pos2">moaz</span>
                <span className="rb">moaz</span>
              </div>
              <div className="row2">
                <span className="cm pos1">moaz</span>
                <span className="cm pos2">moaz</span>
                <span className="cm pos3">moaz</span>
              </div>
              <div className="row3">
                <span className="lw">moaz</span>
                <span className="st">moaz</span>
                <span className="rw">moaz</span>
              </div>
            </div>
            <div className="sub">
              <h2>Substitution</h2>
              <div>
                <span>Moaz</span>
                <span>Moaz</span>
                <span>Moaz</span>
                <span>Moaz</span>
                <span>Moaz</span>
                <span>Moaz</span>
                <span>Moaz</span>
                <span>Moaz</span>
                <span>Moaz</span>
              </div>
              <br />
              <h3>Team: Aswan</h3>
              <h3>Coach: moaz</h3>
            </div>
          </div>
        </div>
      )}
      {details === "ticket" && (
        <div className="match-ticket">
          <div className="match-ticket-card">
            <div className="ticket-header">
              <h3>Match Ticket</h3>
              <button className="purchase-btn">Buy Ticket</button>
            </div>
            <div className="ticket-info">
              <div className="ticket-info-item">
                <strong>Date:</strong> {matchDetails.date}
              </div>
              <div className="ticket-info-item">
                <strong>Time:</strong> {matchDetails.time}
              </div>
              <div className="ticket-info-item">
                <strong>Location:</strong> {matchDetails.location}
              </div>
              <div className="ticket-info-item">
                <strong>Stadium Capacity:</strong>{" "}
                {matchDetails.stadiumCapacity}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MatchDetails;
