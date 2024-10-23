import { useEffect, useState } from "react";

const Terms = () => {
  const [terms, setTerms] = useState(null);

  useEffect(() => {
    fetch("/terms.json")
      .then((res) => res.json())
      .then((data) => setTerms(data));
  }, []);

  return (
    <div>
      <h3 className=" text-[22px] text-center lg:text-start pb-5 lg:pb-0 lg:text-[26px] font-bold leading-8 lg:leading-6 text-[#000]  ">
        Terms and Conditions for {`"Undiscovered Recruits"`}
      </h3>

      {/* terms wrapper */}
      {terms && (
        <div className=" pb-12 lg:pb-[100px]">
          {terms.map((item, index) => (
            <div key={index}>
              <h3 className=" text-[20px] font-medium text-[#000] leading-normal pb-1 ">
                {index + 1}. {item.title}
              </h3>

              <ul>
                {item.features.map((single, index) => (
                  <li
                    className="text-base text-[#000] leading-8 font-normal relative before:content-center before:absolute before:left-0 before:top-3 pl-2.5  before:w-[4px] before:h-[4px] before:rounded-full before:bg-black "
                    key={index}
                  >
                    {" "}
                    {single}{" "}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Terms;
