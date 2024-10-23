import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

// import work2 from "../../../assets/images/work2.png";
// import work3 from "../../../assets/images/work3.png";
import { Box } from "@mui/material";

function MediaCard({ img, title, detail }) {
    return (
        <Card sx={{ maxWidth: 310, mb: 5 }}>
            <CardMedia sx={{ height: 142 }} image={img} title="z" />
            <CardContent>
                <Typography
                    gutterBottom
                    sx={{
                        fontSize: "22px",
                        fontWeight: "700",
                        textAlign: "center",
                        lineHeight: "35px",
                        maxWidth: "233px",
                        mx: "auto",
                    }}
                    component="div"
                >
                    {title}
                </Typography>
                <Typography variant="body2" textAlign={"center"}>
                    {detail}
                </Typography>
            </CardContent>
            {/* <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions> */}
        </Card>
    );
}
const HowItWorks = () => {
    return (
        <div className=" my-6  lg:my-[30px] rounded-[15px] bg-white">
            <Typography variant="h1" sx={{ textAlign: "center", pt: "40px" }}>
                How it works
            </Typography>

            {/* steps wrapper */}
            <div className="flex gap-8 mt-12 relative flex-col flex-wrap md:flex-row justify-center md:items-start items-center">
                <MediaCard
                    img={"/img/work1.png"}
                    title={"Sign Up and Fill in Basic Information"}
                    detail={
                        "Begin by signing up with your name, email, and profile details, such as your position and personal stats. This foundational information helps coaches get a quick overview of your background and skills."
                    }
                />
                <MediaCard
                    img={"/img/work2.png"}
                    title={"Upload Your Highlights and Achievements"}
                    detail={
                        "Once your basic info is set, it's time to showcase your talents. Upload your highlight reels, game footage, and any training videos you have. Make sure to also include your achievements and milestones to give coaches a comprehensive view of your abilities."
                    }
                />
                <MediaCard
                    img={"/img/work3.png"}
                    title={"Review and Finalize Your Profile"}
                    detail={
                        "Before submitting, review your profile to ensure all information is accurate and your videos are properly displayed. Once satisfied, finalize your profile to make it publicly viewable. Now, your profile is ready to be shared with coaches and included in our 'Explore' section for maximum visibility seen by COACHES ONLY."
                    }
                />
            </div>
        </div>
    );
};

export default HowItWorks;
