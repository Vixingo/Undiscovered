import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Tab, Tabs } from "@mui/material";
import Logo from "../../assets/images/logo.svg";
import { CiSearch } from "react-icons/ci";
import { AiFillInfoCircle } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
const drawerWidth = 240;
const navItems = ["Home", "About", "Contact"];

function DrawerAppBar(props) {
    const navigate = useNavigate();
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };
    // tabs
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    // tabs
    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    height: "50px",
                }}
            >
                <Link to={"/"}>
                    <img src={Logo} style={{ height: "100%" }} />
                </Link>
            </Box>
            <Tabs
                orientation="vertical"
                value={value}
                onChange={handleChange}
                centered
                // sx={{ display: { xs: "none", md: "block" } }}
            >
                <Tab
                    label="Home"
                    sx={{
                        // padding: "30px 22px",
                        fontSize: "18px",
                        fontWeight: "400",
                        textTransform: "capitalize",
                    }}
                    onClick={() => navigate("/")}
                />
                <Tab
                    label="Player Search"
                    sx={{
                        // padding: "30px 22px",
                        fontSize: "18px",
                        fontWeight: "400",
                        textTransform: "capitalize",
                    }}
                    onClick={() => navigate("/player-list")}
                />
                <Tab
                    label="Plans & Pricing"
                    sx={{
                        // padding: "30px 22px",
                        fontSize: "18px",
                        fontWeight: "400",
                        textTransform: "capitalize",
                    }}
                    onClick={() => navigate("/pricing")}
                />

                <Tab
                    label="About"
                    sx={{
                        // padding: "30px 22px",
                        fontSize: "18px",
                        fontWeight: "400",
                        textTransform: "capitalize",
                    }}
                    onClick={() => navigate("/about")}
                />
            </Tabs>
        </Box>
    );

    const container =
        window !== undefined ? () => window().document.body : undefined;
    const { pathname } = useLocation();
    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar
                component="nav"
                sx={{
                    backgroundColor:
                        pathname == "/Playerinfo"
                            ? { xs: "#FFEBEB", md: "#fff" }
                            : "#fff",
                    boxShadow: pathname == "/Playerinfo" ? "none" : "",
                    minHeight: "80px",
                    justifyContent: { xs: "center", md: "flex-end" },
                }}
            >
                <Toolbar
                    sx={{
                        justifyContent: "space-between",
                    }}
                >
                    <Box sx={{ flex: 1, height: "55px" }}>
                        <Link to={"/"}>
                            <img src={Logo} style={{ height: "100%" }} />
                        </Link>
                    </Box>
                    {/* <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", sm: "block" },
                        }}
                    >
                        MUI
                    </Typography> */}
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        centered
                        sx={{
                            display: { xs: "none", md: "flex" },
                        }}
                    >
                        <Tab
                            label="Home"
                            sx={{
                                padding: "30px 22px",
                                fontWeight: "400",
                                textTransform: "capitalize",
                            }}
                            onClick={() => navigate("/")}
                        />
                        <Tab
                            label="Player Search"
                            sx={{
                                padding: "30px 22px",
                                fontWeight: "400",
                                textTransform: "capitalize",
                            }}
                            onClick={() => navigate("/player-list")}
                        />
                        <Tab
                            label="Plans & Pricing"
                            sx={{
                                padding: "30px 22px",
                                fontWeight: "400",
                                textTransform: "capitalize",
                            }}
                            onClick={() => navigate("/pricing")}
                        />

                        <Tab
                            label="About"
                            sx={{
                                padding: "30px 22px",
                                fontWeight: "400",
                                textTransform: "capitalize",
                            }}
                            onClick={() => navigate("/about")}
                        />
                    </Tabs>

                    {/* <Box sx={{ display: { xs: "none", sm: "block" } }}>
                        {navItems.map((item) => (
                            <Button key={item} sx={{ color: "#fff" }}>
                                {item}
                            </Button>
                        ))}
                    </Box> */}
                    <Box
                        sx={{
                            display: "flex",
                            gap: "7px",
                            flex: "1",
                            justifyContent: "end",
                            alignContent: "center",
                        }}
                    >
                        <IconButton
                            onClick={() => {
                                navigate("/player-list");
                            }}
                        >
                            <CiSearch color="#000" />
                        </IconButton>
                        <IconButton
                            sx={{
                                display: { xs: "none", sm: "block" },
                                rotate: "180deg",
                            }}
                            onClick={() => {
                                navigate("/Playerinfo");
                            }}
                        >
                            <AiFillInfoCircle color="#ED2023" />
                        </IconButton>
                        <Button
                            sx={{ fontSize: "13px" }}
                            onClick={() => {
                                navigate("/login");
                            }}
                        >
                            Login
                        </Button>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "#ED2023",
                                color: "#fff",
                                fontWeight: "400",
                                padding: "10px 20px",
                                fontSize: "13px",
                                borderRadius: "50px",
                                display: { xs: "none", sm: "block" },
                            }}
                            onClick={() => {
                                navigate("/sign-up");
                            }}
                        >
                            Join
                        </Button>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "#ED2023",
                                color: "#fff",
                                fontWeight: "400",
                                padding: "10px 45px 10px 10px",
                                fontSize: { xs: "12px", md: "13px" },
                                borderRadius: "50px",
                                position: "relative",
                                width: { xs: "128px", md: "140px" },
                            }}
                            onClick={() => {
                                navigate("/contact");
                            }}
                        >
                            Contact Us{" "}
                            <span
                                style={{
                                    fontSize: "24px",
                                    position: "absolute",
                                    right: "10px",
                                }}
                            >
                                &#x1F44B;
                            </span>
                        </Button>
                    </Box>

                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 1, ml: 1, display: { md: "none" } }}
                    >
                        <MenuIcon sx={{ color: "#2b3f6c" }} />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: "block", md: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
        </Box>
    );
}

DrawerAppBar.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default DrawerAppBar;
