import { useNavigate } from "react-router-dom";

const PlayerNews = ({ newsFeedData }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex flex-col gap-4">
        {newsFeedData && newsFeedData.length > 0 ? (
          newsFeedData.map((item, index) => {
            const newsDate = new Date(item.createdAt);

            const formattedDate = `${
              newsDate.getMonth() + 1
            }/${newsDate.getDate()}/${newsDate.getFullYear()}`;
            const formatDate = (dateString) => {
              const date = new Date(dateString);
              // Use Intl.DateTimeFormat to format the date
              return new Intl.DateTimeFormat("en-US", {
                month: "long",
                day: "2-digit",
                year: "numeric",
              }).format(date);
            };

            const words = item?.description.split(" ");

            const truncatedDescription =
              words.length > 35
                ? words.slice(0, 35).join(" ") +
                  `<span style='color: #2684FC; cursor: pointer;'> Read more</span>`
                : item?.description;

            return (
              <div
                onClick={() => navigate(`/news-article/${item?._id}`)}
                className=" cursor-pointer p-3 bg-[#fff] flex items-start flex-col lg:flex-row gap-2.5 rounded-xl shadow-[0px_0px_13px_0px_rgba(0,0,0,0.05)] space-y-2.5"
                key={index}>
                <div className=" lg:min-w-[260px]  lg:max-w-[260px] w-full lg:w-auto h-[170px] rounded-xl overflow-hidden ">
                  <img
                    className="w-full h-full object-cover"
                    src={item?.banner}
                    alt=""
                  />
                </div>

                <div className="space-y-3">
                  <p className="text-[20px] font-600 leading-normal text-[#3b82f6] hover:underline ">
                    {item?.title}
                  </p>
                  <p className="text-sm text-[#717171] leading-6">
                    {formatDate(item.createdAt)}
                  </p>
                  <p
                    className="text-base leading-6  font-normal text-[#717171]"
                    dangerouslySetInnerHTML={{
                      __html: truncatedDescription,
                    }}></p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-[#000] text-base leading-6 font-normal">
            No news feed
          </p>
        )}
      </div>
    </div>
  );
};

export default PlayerNews;
