import React from "react";
import Marquee from "react-fast-marquee";
import MarqueeItem1 from "../../assets/images/marqee1.png";
import MarqueeItem2 from "../../assets/images/marqee2.png";
import MarqueeItem3 from "../../assets/images/marqee3.png";
import MarqueeItem4 from "../../assets/images/marqee4.png";
import MarqueeItem5 from "../../assets/images/marqee5.png";
import MarqueeItem6 from "../../assets/images/marqee6.png";
import MarqueeItem7 from "../../assets/images/marqee7.png";
import MarqueeItem8 from "../../assets/images/marqee8.jpeg";
import MarqueeItem9 from "../../assets/images/marqee9.jpeg";
import MarqueeItem10 from "../../assets/images/marqee10.jpeg";
export default function Brands() {
    return (
        <div>
            <div className=" px-3 lg:px-[20px] py-10 lg:py-10 bg-white mb-5">
                <Marquee>
                    {[
                        MarqueeItem1,
                        MarqueeItem2,
                        MarqueeItem3,
                        MarqueeItem4,
                        MarqueeItem5,
                        MarqueeItem6,
                        MarqueeItem7,
                        MarqueeItem8,
                        MarqueeItem9,
                        MarqueeItem10,
                    ].map((item) => (
                        <img
                            key={Math.random()}
                            src={item}
                            alt="marqee"
                            className="h-[30px] lg:h-[40px] w-full mx-4 lg:mx-10 object-contain"
                        />
                    ))}
                </Marquee>
            </div>
        </div>
    );
}
