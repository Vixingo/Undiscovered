import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../baseurl/baseurl";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import player from "../../assets/images/coach-cover.png";
import us from "../../assets/images/us.png";
import { useNavigate } from "react-router-dom";

export default function FavouritePlayers() {
  const navigate = useNavigate();
  const user = localStorage?.getItem("user");
  const [loading, setLoading] = useState(true);
  const [players, setPlayer] = useState();

  const onFavourite = async (id, getAvailabilityPlayer) => {
    setLoading(true);
    const payload = {
      coachId: JSON.parse(user)._id,
      playerId: id,
    };
    console.log("Payload:", payload, JSON.parse(user));
    await axios
      .post(BASE_URL + "/favourites", payload)
      .then((res) => {
        setLoading(false);
        getAvailabilityPlayer();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const getAvailabilityPlayer = async () => {
    try {
      let response = await axios.get(
        `${BASE_URL}/favourites/${JSON.parse(user)._id}`
      );
      console.log(response.data);
      setLoading(false);
      setPlayer(response.data?.data);
    } catch (error) {
      if (error?.response && error?.response?.data) {
      } else {
      }
    }
  };
  console.log(players, "coach");

  useEffect(() => {
    setLoading(true);
    getAvailabilityPlayer();
  }, []);
  return (
    <div>
      {/* top section */}
      <div className="top-section flex items-center justify-between gap-2 mb-4">
        <button
          onClick={() => navigate(-1)}
          type="button"
          class=" hover:bg-gray-100   font-medium rounded-full text-sm p-1.5 text-center inline-flex items-center">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4.25 12.2734L19.25 12.2734"
              stroke="#130F26"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M10.2998 18.299L4.2498 12.275L10.2998 6.25"
              stroke="#130F26"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <h5 className="text-[18px]">Favorite player</h5>
        <div className="flex items-center gap-1">
          <button
            type="button"
            class=" hover:bg-gray-100   font-medium rounded-full text-sm p-1.5 text-center inline-flex items-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="#25282B"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12 8V16"
                stroke="#25282B"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8 12H16"
                stroke="#25282B"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            class=" hover:bg-gray-100   font-medium rounded-full text-sm p-1.5 text-center inline-flex items-center">
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8.1376 5.84701C8.1376 7.55813 6.72696 8.94503 4.98531 8.94503C3.24467 8.94503 1.83301 7.55813 1.83301 5.84701C1.83301 4.1369 3.24467 2.75 4.98531 2.75C6.72696 2.75 8.1376 4.1369 8.1376 5.84701ZM18.7852 4.49013C19.5471 4.49013 20.1663 5.09853 20.1663 5.84701C20.1663 6.5965 19.5471 7.2049 18.7852 7.2049H12.7577C11.9948 7.2049 11.3756 6.5965 11.3756 5.84701C11.3756 5.09853 11.9948 4.49013 12.7577 4.49013H18.7852ZM3.21513 14.6281H9.24269C10.0056 14.6281 10.6248 15.2365 10.6248 15.986C10.6248 16.7345 10.0056 17.3439 9.24269 17.3439H3.21513C2.45226 17.3439 1.83301 16.7345 1.83301 15.986C1.83301 15.2365 2.45226 14.6281 3.21513 14.6281ZM17.014 19.0463C18.7557 19.0463 20.1663 17.6594 20.1663 15.9493C20.1663 14.2382 18.7557 12.8513 17.014 12.8513C15.2734 12.8513 13.8617 14.2382 13.8617 15.9493C13.8617 17.6594 15.2734 19.0463 17.014 19.0463Z"
                fill="#130F26"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* main section */}
      {loading ? (
        <div className="flex items-center justify-center min-h-80">
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-20 h-20 text-gray-200 animate-spin  fill-[#FF3333]"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4 items-center w-full my-8">
          {/* card */}
          {players.map((items, index) => (
            <div
              key={Math.random()}
              className="p-4 rounded-md  w-full"
              style={{
                boxShadow: "0px 0px 23px 0px #00000014",
              }}>
              {/* content */}
              <div className="flex items-center justify-between gap-4">
                <div className="relative flex items-center gap-2">
                  {/* avatar */}
                  <div class="relative">
                    <img
                      class="w-[63px] h-[63px] bg-gray-200 rounded-full"
                      src={items?.picture}
                      alt="players"
                    />
                    <span class="top-3 left-[-4px] absolute  w-[20px] h-[20px]   rounded-full">
                      <img
                        class="w-full h-full rounded-full"
                        src={us}
                        alt="players"
                      />
                    </span>
                  </div>
                  <div>
                    <p className="text-[16px] font-bold flex items-center gap-2 text-[#3b82f6] hover:underline cursor-pointer">
                      {items?.auth?.name}
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M11.191 0.633827C11.042 0.395827 10.8226 0.210189 10.5632 0.102752C10.3038 -0.00468557 10.0173 -0.0285759 9.74371 0.0344069L7.8018 0.480462C7.60279 0.526202 7.396 0.526202 7.19698 0.480462L5.25508 0.0344069C4.98147 -0.0285759 4.69503 -0.00468557 4.43563 0.102752C4.17623 0.210189 3.95678 0.395827 3.80783 0.633827L2.7494 2.323C2.6414 2.49581 2.49559 2.64161 2.32278 2.7507L0.63361 3.80913C0.396021 3.95795 0.210655 4.17704 0.103241 4.436C-0.0041733 4.69495 -0.0283068 4.98092 0.03419 5.25422L0.480245 7.19828C0.52582 7.39695 0.52582 7.60335 0.480245 7.80202L0.03419 9.745C-0.0285497 10.0185 -0.00453765 10.3047 0.102888 10.5638C0.210314 10.823 0.395816 11.0423 0.63361 11.1912L2.32278 12.2496C2.49559 12.3576 2.64139 12.5034 2.75048 12.6762L3.80891 14.3654C4.11348 14.8525 4.69454 15.0933 5.25508 14.9648L7.19698 14.5188C7.396 14.473 7.60279 14.473 7.8018 14.5188L9.74479 14.9648C10.0182 15.0276 10.3044 15.0035 10.5636 14.8961C10.8228 14.7887 11.0421 14.6032 11.191 14.3654L12.2494 12.6762C12.3574 12.5034 12.5032 12.3576 12.676 12.2496L14.3663 11.1912C14.6041 11.0421 14.7895 10.8226 14.8967 10.5632C15.004 10.3038 15.0277 10.0174 14.9646 9.74392L14.5196 7.80202C14.4739 7.60301 14.4739 7.39621 14.5196 7.1972L14.9657 5.25422C15.0285 4.98088 15.0047 4.69475 14.8974 4.43559C14.7902 4.17642 14.6049 3.95708 14.3673 3.80805L12.6771 2.74962C12.5045 2.64141 12.3587 2.49557 12.2505 2.323L11.191 0.633827ZM10.6477 5.09113C10.7145 4.9683 10.731 4.82434 10.6939 4.68954C10.6567 4.55475 10.5687 4.43964 10.4483 4.36842C10.328 4.2972 10.1847 4.27543 10.0487 4.30769C9.91264 4.33995 9.79441 4.42373 9.71887 4.54139L6.89457 9.32163L5.1892 7.68862C5.1386 7.63667 5.07807 7.59544 5.0112 7.56739C4.94433 7.53935 4.87249 7.52506 4.79998 7.52537C4.72747 7.52569 4.65576 7.54061 4.58914 7.56924C4.52251 7.59786 4.46234 7.63962 4.4122 7.692C4.36206 7.74439 4.32299 7.80634 4.29731 7.87415C4.27163 7.94197 4.25987 8.01426 4.26274 8.08672C4.2656 8.15917 4.28303 8.23031 4.31398 8.29589C4.34493 8.36146 4.38878 8.42014 4.44289 8.4684L6.63969 10.5734C6.69848 10.6296 6.76922 10.6718 6.84661 10.6969C6.92401 10.7219 7.00607 10.7292 7.08665 10.718C7.16724 10.7069 7.24427 10.6778 7.312 10.6327C7.37973 10.5876 7.4364 10.5279 7.47779 10.4578L10.6477 5.09113Z"
                          fill="#4C8FE1"
                        />
                      </svg>
                    </p>
                    <p className="text-[12px]">
                      6’4 | Shooting Guard | Notre Dame Prep
                    </p>
                    <p className="text-[12px] flex items-center gap-2">
                      <svg
                        width="14"
                        height="18"
                        viewBox="0 0 14 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M9.08366 7.74782C9.08366 6.59676 8.15096 5.66406 7.00075 5.66406C5.84969 5.66406 4.91699 6.59676 4.91699 7.74782C4.91699 8.89803 5.84969 9.83073 7.00075 9.83073C8.15096 9.83073 9.08366 8.89803 9.08366 7.74782Z"
                          stroke="#0E0E0E"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M6.99959 16.5C6.00086 16.5 0.75 12.2486 0.75 7.80274C0.75 4.3222 3.54758 1.5 6.99959 1.5C10.4516 1.5 13.25 4.3222 13.25 7.80274C13.25 12.2486 7.99832 16.5 6.99959 16.5Z"
                          stroke="#0E0E0E"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      {items?.location}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onFavourite(items._id, getAvailabilityPlayer)}
                  class=" hover:bg-gray-100 border border-[#898989]  font-medium rounded-full text-sm p-1 text-center inline-flex items-center">
                  {items?.favouriteBy?.includes(JSON.parse(user)._id) ? (
                    <svg
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M13.6043 4.67701L15.4317 8.32776C15.6108 8.68616 15.9565 8.93467 16.3573 8.99218L20.4453 9.58062C21.4554 9.72644 21.8573 10.9505 21.1263 11.6519L18.1702 14.4924C17.8797 14.7718 17.7474 15.1733 17.8162 15.5676L18.5138 19.5778C18.6856 20.5698 17.6298 21.3267 16.727 20.8574L13.0732 18.9627C12.715 18.7768 12.286 18.7768 11.9268 18.9627L8.273 20.8574C7.37023 21.3267 6.31439 20.5698 6.48724 19.5778L7.18385 15.5676C7.25257 15.1733 7.12033 14.7718 6.82982 14.4924L3.87368 11.6519C3.14272 10.9505 3.54464 9.72644 4.55466 9.58062L8.64265 8.99218C9.04354 8.93467 9.39028 8.68616 9.56937 8.32776L11.3957 4.67701C11.8477 3.77433 13.1523 3.77433 13.6043 4.67701Z"
                        fill="#FFCC4D"
                        stroke="#212121"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M13.6043 4.67701L15.4317 8.32776C15.6108 8.68616 15.9565 8.93467 16.3573 8.99218L20.4453 9.58062C21.4554 9.72644 21.8573 10.9505 21.1263 11.6519L18.1702 14.4924C17.8797 14.7718 17.7474 15.1733 17.8162 15.5676L18.5138 19.5778C18.6856 20.5698 17.6298 21.3267 16.727 20.8574L13.0732 18.9627C12.715 18.7768 12.286 18.7768 11.9268 18.9627L8.273 20.8574C7.37023 21.3267 6.31439 20.5698 6.48724 19.5778L7.18385 15.5676C7.25257 15.1733 7.12033 14.7718 6.82982 14.4924L3.87368 11.6519C3.14272 10.9505 3.54464 9.72644 4.55466 9.58062L8.64265 8.99218C9.04354 8.93467 9.39028 8.68616 9.56937 8.32776L11.3957 4.67701C11.8477 3.77433 13.1523 3.77433 13.6043 4.67701Z"
                        fill="#212121"
                        stroke="#212121"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
