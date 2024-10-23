import PropTypes from "prop-types";
import SingleNews from "./SingleNews";

const NewsWrapper = ({ newsData }) => {
  // console.log(newsData, "newsData");
  return (
    <div
      className="grid grid-cols-1  lg:grid-cols-3 gap-3"
      style={{ placeItems: "center" }}>
      {!Boolean(newsData.length) ? <h2>No news found</h2> : null}
      {newsData?.map((item, index) => (
        <SingleNews key={index} news={item} />
      ))}
    </div>
  );
};

NewsWrapper.propTypes = {
  newsData: PropTypes.array,
};

export default NewsWrapper;
