import type {User} from "../../types";
import {type MouseEvent, useState} from "react";
import {Button, Menu, MenuItem} from "@mui/material";
import {useAppDispatch} from "../../app/hooks.ts";
import {logout} from "../../features/users/usersThunks.ts";

interface Props {
    user: User;
}

const Usermenu: React.FC<Props> = ({user}) => {
    const dispatch = useAppDispatch();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (e: MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        await dispatch(logout());
    };

    return (
        <>
            <Button onClick={handleClick} sx={{color: "white"}}>
                Hello, {user.username}!
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem>Profile</MenuItem>
                <MenuItem>My Account</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </>
    );
};

export default Usermenu;