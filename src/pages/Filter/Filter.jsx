import { useRef } from "react";
import "./Filter.css";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

const Filter = () => {
  const navigate = useNavigate();

  const locationOptions = [
    { value: "North Carolina", label: "North Carolina" },
    { value: "new Jersy", label: "New Jersy" },
    { value: "Los Angeles", label: "Los Angeles" },
  ];
  const schoolStateOptions = [
    { value: "North Carolina", label: "North Carolina" },
    { value: "new Jersy", label: "New Jersy" },
    { value: "Los Angeles", label: "Los Angeles" },
  ];
  const tutionOptions = [
    { value: "10k-30k", label: "10k-30k" },
    { value: "40k-85k", label: "40k-85k" },
    { value: "90k-115k", label: "90k-115k" },
  ];

  const customSelectStyles = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      borderColor: "#DBDBDB", // Change border color
      borderRadius: "70px", // Make it rounded
      boxShadow: state.isFocused ? "0 0 0 1px #DBDBDB" : "none",
      "&:focus": {
        borderColor: "#DBDBDB", // Change border color on focus
      }, // Optional: shadow on focus
      padding: "5px 20px",
    }),
    menu: (baseStyles) => ({
      ...baseStyles,
      zIndex: 9999,
      color: "#000",
    }),
    option: (baseStyles, state) => ({
      ...baseStyles,
      backgroundColor: state.isSelected ? "#f33" : "white",
    }),
    placeholder: (baseStyles) => ({
      ...baseStyles,
      color: "grey",
    }),
    singleValue: (baseStyles) => ({
      ...baseStyles,
      color: "#000",
    }),
  };

  const filterRef = useRef(null);

  const clearFilter = () => {
    let form = document.querySelector(".filter--form");

    form &&
      form
        .querySelectorAll("input[type='radio']")
        .forEach((item) => (item.checked = "false"));
  };

  return (
    <div>
      {/* top part */}
      <div className="flex items-center justify-between">
        {/* back button */}
        <div onClick={() => navigate(-1)} className="w-6 h-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="15"
            viewBox="0 0 17 15"
            fill="none"
            className="w-full h-full"
          >
            <path
              d="M1.25 7.27441L16.25 7.27441"
              stroke="#130F26"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.2998 13.299L1.2498 7.275L7.2998 1.25"
              stroke="#130F26"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/*  */}
        <p className="text-[18px] text-[#000] font-medium leading-normal ">
          {" "}
          Filter & Show{" "}
        </p>

        {/* clear filter */}
        <p className="text-sm leading-6">Clear filter</p>
      </div>

      {/* filter form area */}

      <form ref={filterRef} className="filter--form py-10 space-y-9">
        {/* radio input */}
        <div>
          <p className="common--title">Program type</p>

          {/* wrapper */}
          <div className="flex items-center gap-4 flex-wrap lg:flex-nowrap">
            <div className="single--input">
              <input type="radio" name="Program-type" id="NCAA" />
              <label htmlFor="NCAA">NCAA</label>
            </div>
            <div className="single--input">
              <input type="radio" name="Program-type" id="NJCAA" />
              <label htmlFor="NJCAA">NJCAA</label>
            </div>
            <div className="single--input">
              <input type="radio" name="Program-type" id="NAIA" />
              <label htmlFor="NAIA">NAIA</label>
            </div>
            <div className="single--input">
              <input type="radio" name="Program-type" id="PREP" />
              <label htmlFor="PREP">PREP</label>
            </div>
            <div className="single--input">
              <input type="radio" name="Program-type" id="HS" />
              <label htmlFor="HS">HS</label>
            </div>
          </div>
        </div>

        {/* location search */}
        <div>
          <Select
            styles={customSelectStyles}
            options={locationOptions}
            placeholder="Location..."
          />
        </div>

        {/* radio input */}
        <div className="large--inputs">
          <p className="common--title">School division</p>

          {/* wrapper */}
          <div className="flex items-center gap-4 flex-wrap lg:flex-nowrap">
            <div className="single--input">
              <input type="radio" name="school-division" id="2020" />
              <label htmlFor="2020">2020</label>
            </div>
            <div className="single--input">
              <input type="radio" name="school-division" id="2021" />
              <label htmlFor="2021">2021</label>
            </div>
            <div className="single--input">
              <input type="radio" name="school-division" id="2022" />
              <label htmlFor="2022">2022</label>
            </div>
            <div className="single--input">
              <input type="radio" name="school-division" id="2023" />
              <label htmlFor="2023">2023</label>
            </div>
            <div className="single--input">
              <input type="radio" name="school-division" id="2024" />
              <label htmlFor="2024">2024</label>
            </div>
          </div>
        </div>

        {/* School state */}
        <div>
          <p className="common--title">School state</p>
          <Select
            styles={customSelectStyles}
            options={schoolStateOptions}
            placeholder="Location..."
          />
        </div>
        {/* tuition*/}
        <div>
          <p className="common--title">Tuition</p>
          <div className="flex items-center gap-6 flex-col lg:flex-row">
            <Select
              styles={customSelectStyles}
              options={tutionOptions}
              placeholder="Min"
              className="w-full"
            />
            <Select
              styles={customSelectStyles}
              options={tutionOptions}
              placeholder="Max"
              className="w-full"
            />
          </div>
        </div>

        {/* Conference */}
        <div className="large--inputs">
          <p className="common--title">Conference</p>

          {/* wrapper */}
          <div className="flex items-center gap-4 flex-wrap lg:flex-nowrap">
            <div className="single--input">
              <input type="radio" name="Conference" id="conference-NCAA" />
              <label htmlFor="conference-NCAA">NCAA</label>
            </div>
            <div className="single--input">
              <input type="radio" name="Conference" id="conference-NJCAA" />
              <label htmlFor="conference-NJCAA">NJCAA</label>
            </div>
            <div className="single--input">
              <input type="radio" name="Conference" id="conference-NAIA" />
              <label htmlFor="conference-NAIA">NAIA</label>
            </div>
            <div className="single--input">
              <input type="radio" name="Conference" id="conference-PREP" />
              <label htmlFor="conference-PREP">PREP</label>
            </div>
            <div className="single--input">
              <input type="radio" name="Conference" id="conference-HS" />
              <label htmlFor="conference-HS">HS</label>
            </div>
          </div>
        </div>

        {/* Verified coach */}
        <div className="large--inputs">
          <p className="common--title">Verified coach</p>

          {/* wrapper */}
          <div className="flex items-center gap-4">
            <div className="single--input">
              <input type="radio" name="Verified-coach" id="no-coach" />
              <label htmlFor="no-coach">No</label>
            </div>
            <div className="single--input">
              <input type="radio" name="Verified-coach" id="yes-coach" />
              <label htmlFor="yes-coach">Yes</label>
            </div>
          </div>
        </div>

        {/* Apply Button */}
        <button
          onClick={clearFilter}
          className="py-3 flex items-center justify-center bg-primaryColor w-full text-[#fff] leading-6 text-base rounded-[30px]"
        >
          Apply
        </button>
      </form>
    </div>
  );
};

export default Filter;
