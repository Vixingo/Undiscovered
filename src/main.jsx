import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./assets/fonts/stylesheet.css";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/router.jsx";
import ReactDOM from "react-dom/client";
import {
    PaymentElement,
    Elements,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ProfileProvider } from "./components/context/createProfileContext";
const stripePromise = loadStripe(
    "pk_live_51PdsoNRowQPTHOCmXCesZKtl6Vj8X9rn8tdGTqYx0g5CcAwU1GxxAWDKjGlOaOLD8N33mr0EwqwRpGCAjitt5cED00ve9wLkqz"
);
// const stripePromise = loadStripe(
//   "pk_test_51OwuO4LcfLzcwwOYdssgGfUSfOgWT1LwO6ewi3CEPewY7WEL9ATqH6WJm3oAcLDA3IgUvVYLVEBMIEu0d8fUwhlw009JwzEYmV"

// );
import "mdb-react-ui-kit/dist/css/mdb.min.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";
import { ThemeProvider } from "./themes/ThemeProvider.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <Elements stripe={stripePromise}>
            <ProfileProvider>
                <ThemeProvider>
                    <RouterProvider router={router} />
                </ThemeProvider>
            </ProfileProvider>
        </Elements>
    </React.StrictMode>
);
