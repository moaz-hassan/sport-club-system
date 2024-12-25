import { Link } from "react-router-dom";

const MatchesSlider = () => {
  const matches = [
    {
      id:1,
      match: 'Team A vs Team B',
      date: 'December 25, 2024',
      time: '5:00 PM',
      image: './public/_0023605b-ba8a-4dca-bfba-d8f0c2be9017.jpeg',
    },
    {
      id:2,
      match: 'Team C vs Team D',
      date: 'December 26, 2024',
      time: '7:00 PM',
      image: './public/_0023605b-ba8a-4dca-bfba-d8f0c2be9017.jpeg',
    },
    {
      id:3,
      match: 'Team E vs Team F',
      date: 'December 27, 2024',
      time: '3:00 PM',
      image: "./public/_0023605b-ba8a-4dca-bfba-d8f0c2be9017.jpeg",
    },
  ];

  return (
    <div className="matches-slider">
      <h3>Upcoming Matches</h3>
      <div className="slider-container">
        {matches.map((match, index) => (
          <div key={index} className="match-item">
            <img src={match.image} alt={match.match} className="match-image" />
            <div className="match-info">
              <h4>{match.match}</h4>
              <p>{match.date} at {match.time}</p>
              <Link to={`match-details/${match.id}`} className="match-details-link">View Details</Link>
            </div> 
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchesSlider;
