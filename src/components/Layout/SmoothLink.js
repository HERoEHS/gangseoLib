import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export function SmoothLink({ to, children, onClick, delay = 0, ...props }) {
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        if (onClick) {
            setTimeout(() => {
                onClick(e);
            }, delay);
        }
        navigate(to);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <Link to={to} {...props} onClick={handleClick}>
            {children}
        </Link>
    );
}

export function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [pathname]);

    return null;
}
export default SmoothLink;
