import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../shared/Navbar/Navbar";
import Footer from "../shared/Footer/Footer";
import Footer3 from "../shared/Footer3/Footer3";
import Appbar from "../shared/Navbar/appbar";

import ScrollToTop from "../components/ScrollTop";
import Navbar3 from "../shared/Navbar3/Navbar";
import { Box } from "@mui/material";

const Layout = () => {
    const { pathname } = useLocation();
    console.log("🚀 ~ Layout ~ pathname:", pathname);

    return (
        <>
            <div
                className="w-full "
                style={{
                    background:
                        "linear-gradient(rgba(109, 106, 149, 0.2), rgba(88, 89, 124, 0.2), rgba(239, 237, 254, 0.2))",
                }}
            >
                {
                    !(pathname === "/login" || pathname === "/sign-up") && (
                        <Navbar3 />
                    )
                    // <>
                    //   <Appbar />
                    // </>
                }
                {pathname === "/" ||
                    pathname === "/Playerinfo" ||
                    pathname === "/about" ||
                    pathname === "/Coachinfo" ? (
                    <Box
                        sx={{
                            paddingTop: { xs: "55px", md: "75px" },
                            zIndex: "1",
                            overflow: "hidden",
                        }}
                    >
                        <Outlet />
                        <ScrollToTop />
                    </Box>
                ) : (
                    <Box
                        className="max-w-[1210px] mx-auto"
                        style={{
                            paddingTop: "75px",
                            zIndex: "2",
                        }}
                    >
                        <Outlet />
                        <ScrollToTop />
                    </Box>
                )}
                {!(pathname === "/login" || pathname === "/sign-up") && (

                    pathname === "/about" ? <Footer3 /> : <Footer />

                )}{" "}
                {/* THIS LINE WAS BELOW */}
            </div>
        </>
    );
};

export default Layout;
