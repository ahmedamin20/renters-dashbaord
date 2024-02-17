import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { useSidebarContext } from "../global/sidebar/sidebarContext";
import "./errorStyle.css"
const ErrorPage = () => {
    const { t } = useTranslation()
    const { sidebarRTL } = useSidebarContext();

    const loggedIn = useSelector(state => state.user.loggedIn)
    return (
        <section className="page_404" style={{ direction: sidebarRTL ? "rtl" : "ltr", minHeight: "100vh" }}>
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <div style={{ margin: "1rem auto" }} className="col-sm-10 col-sm-offset-1 text-center">
                            <div className="four_zero_four_bg">
                                <h1 className="text-center">404</h1>
                            </div>
                            <div className="contant_box_404">
                                <h3 className="h2">{t("Look like you're lost")}</h3>
                                <p>{t("The page you are looking for is not available!")}</p>
                                <Link to={loggedIn ? "/dashboard" : "/"} className="link_404">{t("Go Home")}</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};




export default ErrorPage;
