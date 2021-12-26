import React from "react";
import auth from "./auth";
import { useParams, useNavigate } from "react-router-dom";

export const LandingPage = props => {
    let navigate = useNavigate();
    return (
        <div>
            <h1>Landing Page</h1>
            <button
                onClick={() => {
                    auth.login(() => {
                        navigate("/app");
                    });
                }}
            >
                Login
            </button>
        </div>
    );
};
