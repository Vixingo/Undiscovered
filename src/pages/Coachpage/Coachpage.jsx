import React from "react";
import "./Coachpage.css";
import Sec1 from "./Sections/Section1/Section1";
import Sec2 from "./Sections/Section2/Section2";
import Sec3 from "./Sections/Section3/Section3";
import Sec4 from "./Sections/Section4/Section4";
import Sec5 from "./Sections/Section5/Section5";
import Sec6 from "./Sections/Section6/Section6";
import Sec7 from "./Sections/Section7/Section7";
import Sec8new from "./Sections/Section8_new/Section8_new";
import Sec8 from "./Sections/Section8/Section8";

import Sec10 from "./Sections/Section10/Section10";
import Sec11 from "./Sections/Section11/Section11";
import Sec12 from "./Sections/Section12/Section12";
import Pricingsec from "./Sections/Priceing_section/Priceing_section";

const Coachpage = () => {
  return (
    <div className="bg-transparent">
      <Sec1 />
      <Sec2 />
      <Sec3 />
      <Sec4 />
      <Sec5 />
      <Sec6 />
      <Sec7 />
      <Sec8new />
      <Sec8 />
      <Pricingsec />
      <Sec10 />
      <Sec11 />
      <Sec12 />
    </div>
  );
};

export default Coachpage;
