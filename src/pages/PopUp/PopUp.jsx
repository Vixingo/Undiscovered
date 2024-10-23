import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { IoCloseOutline, IoMailOutline } from "react-icons/io5";
import {
    FormControl,
    IconButton,
    InputAdornment,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { FaPaperPlane } from "react-icons/fa6";
const PopoUp = () => {
    const [example, setExample] = React.useState("example.com");
    React.useEffect(() => {
        fetchData();

        setTimeout(() => {
            setOpen(true);
        }, 2000);
    }, []);
    const fetchData = async () => {
        let response = await fetch("http://dummyjson.com/users", {
            method: "GET",
        }).then((data) => {
            console.log(data);
        });
    };

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const theme = useTheme();
    // const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <>
            <React.Fragment>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    maxWidth="md"
                    // fullScreen={fullScreen}
                    PaperProps={{
                        component: "form",
                        onSubmit: (event) => {
                            event.preventDefault();
                            const formData = new FormData(event.currentTarget);
                            const formJson = Object.fromEntries(
                                formData.entries()
                            );
                            const email = formJson.email;
                            console.log(email);
                            handleClose();
                        },
                    }}
                >
                    <DialogTitle>
                        <Typography
                            variant="h3"
                            sx={{
                                color: "#ED2023",
                                fontFamily: "SF Pro Display",
                                fontSize: "30px",
                                fontWeight: "medium",
                                textAlign: "center",
                                //
                                pt: "20px",
                            }}
                        >
                            {" "}
                            Unlock Your Path to College Basketball –{" "}
                            <Typography
                                sx={{
                                    color: "#ED2023",
                                    fontFamily: "SF Pro Display",
                                    fontSize: "30px",
                                    fontWeight: "bold",
                                }}
                            >
                                Sign Up Now!
                            </Typography>
                        </Typography>{" "}
                    </DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={(theme) => ({
                            position: "absolute",
                            right: 8,
                            top: 8,
                            color: theme.palette.grey[500],
                        })}
                    >
                        <IoCloseOutline />
                    </IconButton>
                    <DialogContent sx={{ backgroundColor: "#ED2023" }}>
                        <DialogContentText>
                            <Typography
                                variant="h6"
                                sx={{
                                    color: "#fff",
                                    fontFamily: "SF Pro Display",
                                    fontSize: "18px",
                                    fontWeight: "regular",
                                    lineHeight: "35px",
                                    //
                                    padding: "12px",
                                    "@media (max-width:600px)": {
                                        lineHeight: "26px",
                                    },
                                }}
                            >
                                {" "}
                                "At Undiscovered Recruits, we believe every
                                player deserves a shot at being discovered.{" "}
                                <br /> By signing up today, you’ll get access
                                to:
                                <br />
                                <ul style={{ listStyle: "outside" }}>
                                    <li>
                                        Exclusive Recruiting Guide tailored to
                                        your goals
                                    </li>
                                    <li>
                                        Early Access to the app so you can get
                                        ahead of the competition
                                    </li>
                                    <li>
                                        {" "}
                                        A chance to win a free month of our
                                        Elite Membership!"
                                    </li>
                                </ul>
                                👉 Don’t wait – your shot is now!
                                <br /> Enter your email below to get started.
                            </Typography>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions
                        sx={{
                            backgroundColor: "#ED2023",
                            justifyContent: "center",
                            paddingBottom: "38px",
                        }}
                    >
                        <TextField
                            // id="input-with-icon-textfield"
                            // label="TextField"

                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <IconButton size="small">
                                                <IoMailOutline />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                size="small"
                                                type="submit"
                                                sx={{ color: "#ED2023" }}
                                            >
                                                <FaPaperPlane />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                },
                            }}
                            variant="outlined"
                            color="error"
                            sx={{
                                borderRadius: "12px",
                                backgroundColor: "#fff",
                                width: "80%",
                            }}
                            fullWidth
                            placeholder="Email"
                            margin="dense"
                            focused
                            required
                        />
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </>
    );
};
export default PopoUp;
