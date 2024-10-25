import PropTypes from "prop-types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SingleNews = ({ news }) => {
    const navigate = useNavigate();
    // console.log("🚀 ~ SingleNews ~ news?.descriptio:", news);
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        // Use Intl.DateTimeFormat to format the date
        return new Intl.DateTimeFormat("en-US", {
            month: "long",
            day: "2-digit",
            year: "numeric",
        }).format(date);
    };
    const words = news?.description.split(" ");

    const truncatedDescription =
        words.length > 15
            ? words.slice(0, 15).join(" ") +
              `<span style='color: #2684FC; cursor: pointer;'> Read more</span>`
            : news?.description;

    // const truncatedDescription =
    //   words.length > 15
    //     ? `${words
    //         .slice(0, 15)
    //         .join(
    //           " "
    //         )} <span style='color: #2684FC; cursor: pointer;>Read more</span>`
    //     : news?.description;

    return (
        <div className="w-[100%] rounded-xl overflow-hidden mb-1.5 items-center">
            {/* img wrapper */}
            <div className="w-[100%] h-[220px] rounded-xl overflow-hidden mb-1.5">
                <img
                    className="w-full h-full object-cover"
                    src={news?.banner}
                    alt=""
                />
            </div>

            <p className="text-[#202020] text-base leading-6 mt-[14px] mb-[13px]">
                {formatDate(news.createdAt)}
            </p>

            <h3
                className="text-[#000] hover:underline text-[18px] font-medium leading-6 mb-[16px] hover:text-[#ED2023] cursor-pointer"
                style={{ cursor: "pointer" }}
                onClick={() => {
                    navigate(`/news-article/${news?._id}`);
                }}
            >
                {news?.title}
            </h3>

            <p
                className="text-base text-[#818181] font-normal cursor-pointer"
                dangerouslySetInnerHTML={{ __html: truncatedDescription }}
                onClick={() => {
                    navigate(`/news-article/${news?._id}`);
                }}
            >
                {/* <span style="color: #2684FC; cursor: pointer;">Read more</span> */}
            </p>
        </div>
    );
};

SingleNews.propTypes = {
    news: PropTypes.object,
};

export default SingleNews;
