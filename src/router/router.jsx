import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../pages/Home/Home";
import PlayerProfile from "../pages/PlayerProfile/PlayerProfile";
import Filter from "../pages/Filter/Filter";
import NewsArticle from "../pages/NewsArticle/NewsArticle";
import PlayersList from "../pages/PlayersList/PlayersList";
import Login from "../pages/AuthPage/Login";
import SignUp from "../pages/AuthPage/SignUp";
import ContactUs from "../pages/ContactUs/ContactUs";
import Pricing from "../pages/Pricing/Pricing";
import About from "../pages/About/About";
import Terms from "../pages/Terms/Terms";
import Privacy from "../pages/Privacy/Privacy";
import ForgetPassword from "../pages/AuthPage/ForgetPassword";
import ChangePassword from "../pages/AuthPage/ChangePassword";
import CreatePlayerProfile from "../pages/CreatePlayerProfile/CreatePlayerProfile";
import CreateCoachProfile from "../pages/CreateCoachProfile/CreateCoachProfile";
import AvailablePlayers from "../pages/AvailablePlayers/AvailablePlayers";
import axios from "axios";
import { BASE_URL } from "../baseurl/baseurl";
import { ProfileProvider } from "../components/context/createProfileContext";
import Newspage from "../pages/Newspage/Newspage";
import Success from "../pages/Success/Success";
import FavouritePlayers from "../pages/favouritePlayers";
import WatchList from "../pages/watchList";
import Scouting from "../pages/Scouting/Scouting";
import Playerinfo from "../pages/Playerinfo/Playerinfo";
import ScrollToTop from "../components/ScrollTop";

// let data = localStorage.getItem('profile')?JSON.parse(localStorage.getItem('profile')):{
//   about: '',
//   phoneNumber: '',
//   jerseyNumber: '',
//   birthPlace: '',
//   starRating: '',
//   athleticaccomplishments: [""],
//   name: '',
//   location: '',
//   position: '',
//   height: '',
//   weight: '',
//   offers: [{
//     type: "",
//     university: "",
//     status: "",
//     date: "",
//     logo: ''
//   }],
//   coach: [{
//     name: '',
//     phone: '',
//     email: '',
//     picture: '',
//     coachProgram: ''
//   }],
//   socialLinks: [{
//     social_type: '',
//     link: ''
//   }],
//   stats: '',
//   academics: {
//     gpa: '',
//     satScore: '',
//     actScore: '',
//     ncaaId: ''
//   },
//   playerClass: '',
//   universityName: '',
//   picture: '',
//   logo: ''
// };

let data = {
  about: "",
  phoneNumber: "",
  jerseyNumber: "",
  birthPlace: "",
  starRating: "",
  athleticaccomplishments: [""],
  name: "",
  location: "",
  position: "",
  height: "",
  weight: "",
  offers: [
    {
      type: "",
      university: "",
      status: "",
      date: "",
      logo: "",
    },
  ],
  coach: [
    {
      name: "",
      phone: "",
      email: "",
      picture: "",
      coachProgram: "",
    },
  ],
  socialLinks: [
    {
      social_type: "",
      link: "",
    },
  ],
  stats: "",
  academics: {
    gpa: "",
    satScore: "",
    actScore: "",
    ncaaId: "",
  },
  playerClass: "",
  universityName: "",
  picture: "",
  logo: "",
};

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/player-profile/:id",
          element: <PlayerProfile />,
        },
        {
          path: "/filter",
          element: <Filter />,
        },
        {
          path: "/news-article/:id",
          element: <NewsArticle />,
        },
        {
          path: "/player-list",
          element: <PlayersList />,
        },
        {
          path: "/forget-password",
          element: <ForgetPassword />,
        },
        {
          path: "/change-password/:token",
          element: <ChangePassword />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/sign-up",
          element: <SignUp />,
        },
        {
          path: "/contact",
          element: <ContactUs />,
        },
        {
          path: "/pricing",
          element: <Pricing />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/terms",
          element: <Terms />,
        },
        {
          path: "/privacy",
          element: <Privacy />,
        },
        {
          path: "/create-player-profile",
          element: <CreatePlayerProfile data={data} />,
        },
        {
          path: "/create-coach-profile",
          element: <CreateCoachProfile data={data} />,
        },
        {
          path: "/available-players",
          element: <AvailablePlayers />,
        },
        {
          path: "/newsFeed",
          element: <Newspage />,
        },
        {
          path: "/success",
          element: <Success />,
        },
        {
          path: "/favourite-players",
          element: <FavouritePlayers />,
        },
        {
          path: "/watch-list",
          element: <WatchList />,
        },
        {
          path: "/Scouting",
          element: <Scouting />,
        },
        {
          path: "/Playerinfo",
          element: <Playerinfo />,
        },
      ],
    },
  ]
  // { basename: "/undiscovered-website" }
);

export default router;
