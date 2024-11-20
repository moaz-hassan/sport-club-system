// import ApiReq from "../../hooks/useApiReq"
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import UpcomingEvents from "./UpComingEvents";
import TopPrograms from "./TopPrograms";
import FAQ from "./FAQ";
import "./home.css";

function HomePage() {

  // ApiReq("https://fakestoreapi.com/products", "GET").then((apiData) => {
  //   console.log(apiData);
  // });
  
  return (
    <>
      <Navbar />
      <div className="home-container">
        <HeroSection />
        <FeaturesSection />
        <TopPrograms/>
        <UpcomingEvents/>
        <FAQ/>
      </div>
      <Footer />
    </>
  );
}

export default HomePage;
