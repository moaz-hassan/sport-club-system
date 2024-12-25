const News = () => {
  const mainNews = {
    title: "Breaking News: Major Sports Event Announced",
    content:
      "A major sports event will take place in the coming weeks. Stay tuned for more details.",
    date: "December 24, 2024",
    image: "./public/_0023605b-ba8a-4dca-bfba-d8f0c2be9017.jpeg", // Replace with an actual image path
  };

  const otherNews = [
    {
      title: "Team Wins Championship",
      date: "December 20, 2024",
      image: "./public/_0023605b-ba8a-4dca-bfba-d8f0c2be9017.jpeg", // Replace with actual image path
    },
    {
      title: "New Player Joins the Squad",
      date: "December 19, 2024",
      image: "./public/_0023605b-ba8a-4dca-bfba-d8f0c2be9017.jpeg", // Replace with actual image path
    },
    {
      title: "Stadium Renovation Updates",
      date: "December 18, 2024",
      image: "./public/_0023605b-ba8a-4dca-bfba-d8f0c2be9017.jpeg", // Replace with actual image path
    },
    {
      title: "Upcoming Match Preview",
      date: "December 15, 2024",
      image: "./public/_0023605b-ba8a-4dca-bfba-d8f0c2be9017.jpeg", // Replace with actual image path
    },
  ];

  return (
    <div className="news-container">
        <h2>News</h2>
      <div className="main-news">
        <div className="main-news-image-container">
          <img
            src={mainNews.image}
            alt="Main News"
            className="main-news-image"
          />
          <div className="main-news-overlay">
            <h2>{mainNews.title}</h2>
            <p>{mainNews.content}</p>
            <span className="news-date">{mainNews.date}</span>
          </div>
        </div>
      </div>

      <div className="other-news">
        <h3>Other News</h3>
        <div className="other-news-list">
          {otherNews.map((news, index) => (
            <div key={index} className="other-news-item">
              <img
                src={news.image}
                alt={`News ${index + 1}`}
                className="other-news-image"
              />
              <div className="other-news-content">
                <h4>{news.title}</h4>
                <span>{news.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
