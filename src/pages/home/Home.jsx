// import ApiReq from "../../hooks/useApiReq"
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import UpcomingEvents from "./UpComingEvents";
import TopPrograms from "./TopPrograms";
import FAQ from "./FAQ";
import "./home.css";
import News from "../../components/News";
import MatchesComponent from "../../components/MatchesComponent";
import {
  getDecryptedId,
  storeUserDataInCookies,
} from "../../utils/storageUtils";
import axios from "axios";
import { useState } from "react";
// import { useState } from "react";

function HomePage() {
  const [render, setRender] = useState(false);
  function getUserInfo() {
    // console.log(Number(getDecryptedId()));
    axios({
      method: "POST",
      url: `https://elkhazzansc.pythonanywhere.com/api/Get_UserData`,
      data: { id: Number(getDecryptedId()) },
    })
      .then((response) => {
        storeUserDataInCookies(response.data.data);
      })
      .catch((error) => {
        console.error("Error occurred:", error.response?.data || error.message);
      });
  }
  if (getDecryptedId()) {
    getUserInfo();
  }

  return (
    <>
      <Navbar render={render} setRender={setRender}/>
      <div className="home-container">
        {" "}
        {/* setBodyFlow={setHideFlow} */}
        <HeroSection />
        <FeaturesSection />
        <News />
        <MatchesComponent />
        <TopPrograms />
        <UpcomingEvents />
        <FAQ />
      </div>
      <Footer />
    </>
  );
}

export default HomePage;
