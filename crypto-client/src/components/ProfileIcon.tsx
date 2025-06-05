import React from "react";
import { Icon, IconProps } from "@chakra-ui/react";

const ProfileIcon: React.FC<IconProps> = (props) => {
    return (
        <Icon
            viewBox="0 0 200 200"
            fill="iconColor"
            {...props} // forwards any Chakra props (size, color, etc.)
        >
            <circle cx="100" cy="60" r="50" />
            <path d="M25,200 A75,75 0 0,1 175,200 L175,200 A75,75 0 0,1 25,200 Z" />
        </Icon>
    );
};

export default ProfileIcon;
