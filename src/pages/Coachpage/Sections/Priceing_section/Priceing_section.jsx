import React from "react";
import { useState, useEffect } from "react";
import SinglePricing from "../../../Pricing/SinglePricing";

import "./Pricing.css";
const Priceing_section = () => {
  const [isToggled, setIsToggled] = useState(false);
  const [isMonthlyActive, setIsMonthlyActive] = useState(true);
  const [isYearlyActive, setIsYearlyActive] = useState(false);
  const [activePlan, setActivePlan] = useState(null);

  const toggle = () => {
    setIsToggled(!isToggled);
    setIsMonthlyActive(!isMonthlyActive);
    setIsYearlyActive(!isYearlyActive);
  };

  const commonPillStyle = `py-2 px-10 rounded-[30px]  relative z-[15] ease-in-out duration-300 cursor-pointer`;

  const serviceList2 = [
    "Profile Display: Your profile is visible in the player search database.",
    "Visibility: Basic presence on the largest recruiting platform.",
    "Featured Article: Your profile includes an article on the available player page",
    "Weekly Reports: Your profile and article are featured in weekly reports sent to coaches.",
    "Enhanced Searchability: Stand out in the player search database.",
  ];

  useEffect(() => {
    const subscription = localStorage.getItem("subscription");
    if (subscription) {
      setActivePlan(JSON.parse(subscription));
    }
  }, []);

  return (
    <div>
      {/* top part */}
      <div className="flex flex-col items-center text-center">
        <h3 className="text-[26px]  font-bold leading-8 text-[#0E0E0E]">
          Tailored Membership Plans
        </h3>
        <p className="text-[18px] font-normal leading-6 text-[#0E0E0E]">
          We have different memberships plan
        </p>

        {/* pricing trigger */}
        <div className="mt-10 flex items-center bg-primaryColor rounded-[30px] relative p-2">
          <p
            onClick={toggle}
            className={`${commonPillStyle} ${
              isMonthlyActive ? `text-primaryColor` : `text-[#fff]`
            }`}
          >
            Monthly
          </p>
          <p
            onClick={toggle}
            className={`${commonPillStyle} ${
              isYearlyActive ? `text-primaryColor` : `text-[#fff]`
            }`}
          >
            Yearly
          </p>

          {/* pill */}
          <span
            className={`w-[128px] h-10 bg-[#fff] rounded-[30px] ease-in-out duration-300 absolute top-1/2 -translate-y-1/2 ${
              isToggled ? `left-[50%]` : "left-2 "
            } z-10 `}
          ></span>
        </div>

        {/* pricing listgt area */}
        <div className="flex items-center flex-col lg:flex-row lg:gap-[30px] mt-5 lg:mt-[50px] mb-12 lg:mb-[100px]">
          {/* <SinglePricing
            isToggled={isToggled}
            isYearlyActive={isYearlyActive}
            price={12.99}
            title={"Basic"}
            yearlyPrice={140}
            serviceList={serviceList}
            activePlan={activePlan}
            setActivePlan={setActivePlan}
          /> */}
          <SinglePricing
            isToggled={isToggled}
            price={18.99}
            isYearlyActive={isYearlyActive}
            title={"Professional"}
            yearlyPrice={205}
            serviceList={serviceList2}
            activePlan={activePlan}
            setActivePlan={setActivePlan}
          />
          {/* <SinglePricing
            isToggled={isToggled}
            price={23.99}
            isYearlyActive={isYearlyActive}
            title={"Enterprise"}
            yearlyPrice={259}
            serviceList={serviceList}
            activePlan={activePlan}
            setActivePlan={setActivePlan}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default Priceing_section;
