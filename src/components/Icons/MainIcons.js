import React from "react";
import mainMike from "../../assets/images/iconMike.png";
import iconAime from "../../assets/images/imgAimy.png";
import mainIconEvent from "../../assets/images/mainIconEvent.png";
import mainIconLib from "../../assets/images/mainIconLib.png";
import mainIconRead from "../../assets/images/mainIconRead.png";
import mainIconSearch from "../../assets/images/mainIconSearch.png";
import mainIconSeat from "../../assets/images/mainIconSeat.png";

const icons = {
    iconAime,
    mainIconLib,
    mainIconSeat,
    mainIconRead,
    mainMike,
    mainIconSearch,
    mainIconEvent,
};
function MainIcon({ iconName, className, ...props }) {
    const iconSrc = icons[iconName];
    if (!iconSrc) {
        console.error(`Icon '${iconName}' not found.`);
        return null;
    }
    return (
        <>
            <img
                src={iconSrc}
                alt={iconName}
                {...props}
                className={`imgIcons ${className}`}
            />
        </>
    );
}

export default MainIcon;
