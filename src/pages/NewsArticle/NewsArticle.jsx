import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../baseurl/baseurl";
import "./NewsArticle.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import profile from "../../assets/images/coach-cover.png";
import Logo from "../../assets/images/logo.svg";
import { object } from "prop-types";

const NewsArticle = () => {
  const navigate = useNavigate();
  const [state, setState] = useState(null);
  const [hoveredPlayer, setHoveredPlayer] = useState(null);
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false); // State to manage share menu visibility
  let { id } = useParams();

  useEffect(() => {
    const links = document.querySelectorAll(".profile--link");
    links.forEach((link) => {
      link.addEventListener("mouseenter", handleMouseEnter);
      link.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      links.forEach((link) => {
        link.removeEventListener("mouseenter", handleMouseEnter);
        link.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [state]);

  const fetchNewsFeed = async () => {
    console.log("testing fetchNewsFeed");
    try {
      let response = await axios.get(`${BASE_URL}/getSingleNewsFeed/${id}`);
      setState(response?.data?.newsFeed);
      console.log("🚀 ~ fetchNewsFeed ~ response:", response);
    } catch (error) {
      console.log("🚀 ~ fetchNewsFeed ~ error:", error);
      if (error?.response && error?.response?.data) {
        toastr.error(error?.response?.data?.error);
      } else {
        toastr.error("Server error please try again");
      }
    }
  };

  useEffect(() => {
    fetchNewsFeed();
  }, []);

  const createLinkedDescription = (description, players) => {
    let linkedDescription = description;
    players.forEach((player) => {
      const playerName = player.name;
      const playerId = player._id;
      const playerLink = `<a class="profile--link" href="#" data-player-id="${playerId}">${playerName}</a>`;
      const playerNameRegex = new RegExp(playerName, "g");
      linkedDescription = linkedDescription.replace(
        playerNameRegex,
        playerLink
      );
    });
    return linkedDescription;
  };

  const handleMouseEnter = (event) => {
    const playerId = event.target.getAttribute("data-player-id");
    const player = state?.players.find((p) => p?.auth === playerId);

    const hoveredname = state?.featuredPlayers?.find(
      (u) => u?._id === player?.auth
    )?.name;

    setHoveredPlayer({
      ...player,
      name: hoveredname,
    });
  };

  const handleMouseLeave = () => {
    setHoveredPlayer(null);
  };

  const handleShareClick = () => {
    setIsShareMenuOpen(!isShareMenuOpen);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toastr.success("Link copied to clipboard!");
    setIsShareMenuOpen(false);
  };

  const linkedDescription = state?.description
    ? createLinkedDescription(state?.description, state?.featuredPlayers)
    : "";

  const formatDate = (dateString) => {
    if (!dateString) {
      console.warn("Invalid dateString:", dateString);
      return "Invalid Date";
    }

    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      console.warn("Invalid Date Object:", date);
      return "Invalid Date";
    }

    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    }).format(date);
  };

  return (
    <div>
      {/* Top part */}
      <div className="space-y-4">
        <h3 className="text-2xl text-[#000] font-semibold">{state?.title}</h3>
        <p className="text-base text-[#000] leading-6">
          {formatDate(state?.updatedAt)}
        </p>

        <p className="text-base text-[#000] leading-6">
          Players Featured in this article:
        </p>

        {/* Hovered Player Details */}
        <div className="flex items-center gap-5 overflow-x-auto lg:overflow-x-hidden pb-3 lg:pb-0">
          {state &&
            state?.featuredPlayers?.map((player, index) => (
              <div
                key={index}
                className="flex items-center gap-1 rounded-[50px] py-2 px-2 bg-[#F3F3F3]">
                {/* Profile */}
                <div className="min-w-[50px] max-w-[50px] h-[50px] rounded-full overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src={
                      state?.players?.find((u) => u?.auth === player?._id)
                        ?.picture
                    }
                    alt=""
                  />
                </div>

                {/* Details */}
                <div>
                  <p
                    onClick={() => navigate("/player-profile/" + player?._id)}
                    className="text-[#4C8FE1] cursor-pointer text-base font-medium leading-normal">
                    {
                      state?.featuredPlayers?.find(
                        (u) => u?._id === player?._id
                      )?.name
                    }
                  </p>

                  <div className="flex items-center gap-1 text-sm text-[#171717] font-medium leading-normal">
                    <span>
                      {state?.players
                        ?.find((u) => u?.auth === player?._id)
                        ?.position?.toUpperCase()}
                    </span>
                    <span>
                      {
                        state?.players?.find((u) => u?.auth === player?._id)
                          ?.height
                      }
                    </span>
                    <span>
                      {
                        state?.players?.find((u) => u?.auth === player?._id)
                          ?.class
                      }
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Share Button */}
      <div className="share-container">
        <button onClick={handleShareClick} className="share-button">
          Share
        </button>
        {isShareMenuOpen && (
          <div className="share-menu">
            <button onClick={handleCopyLink}>Copy Link</button>
            <a
              href={`mailto:?subject=Check this out&body=Here is the link: ${window.location.href}`}>
              Email
            </a>
            <button onClick={() => window.print()}>Print</button>
          </div>
        )}
      </div>

      {/* News banner */}
      <div className="mt-6 mb-6 lg:mb-12 w-full h-[300px] lg:h-[565px] rounded-xl overflow-hidden">
        <img className=" bannerimgofarical" src={state?.banner} alt="" />
      </div>

      {/* Auth0r  */}
      <div className="div_of_author_main">
        <div className="Imgg_main_author_divv">
          <div className="image_div_author">
            <div className="image_box_of_author">
              <img src={state?.image_of_author} alt="" />
            </div>
            <div className="image_box_logo">
              <img className="Imgg_undis" src={Logo} alt="" />
            </div>
          </div>
        </div>
        <div className="text_div">
          <h2>{state?.name_of_author}</h2>
          <h4>{state?.title_of_author}</h4>
          <p>{formatDate(state?.updatedAt)}</p>
        </div>
      </div>

      {/* News description */}
      <div className="news-article-description mb-[80px]">
        <div>
          <div className="absolute -my-20 player_details_box_ofaritacl">
            {hoveredPlayer && (
              <div className="flex items-center gap-2 rounded-[50px] py-1 px-2 bg-[#F3F3F3]">
                {/* Profile */}
                <div className="min-w-[50px] max-w-[50px] h-[50px] rounded-full overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src={hoveredPlayer?.picture}
                    alt=""
                  />
                </div>

                {/* Details */}
                <div>
                  <p className="text-[#000] text-base font-medium leading-normal">
                    {hoveredPlayer?.name}
                  </p>

                  <div className="flex items-center gap-1 text-sm text-[#171717] font-medium leading-normal">
                    <span>{hoveredPlayer?.position?.toUpperCase()}</span>
                    <span>{hoveredPlayer?.height}</span>
                    <span>{hoveredPlayer?.class}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <p dangerouslySetInnerHTML={{ __html: linkedDescription }}></p>
        </div>
      </div>
    </div>
  );
};

export default NewsArticle;
