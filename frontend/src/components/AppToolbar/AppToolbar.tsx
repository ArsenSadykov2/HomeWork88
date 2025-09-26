import {AppBar, Box, Toolbar, Typography} from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import {selectUser} from "../../features/users/usersSlice.ts";
import AnonymousMenu from "./AnonymousMenu.tsx";
import Usermenu from "./UserMenu.tsx";


const AppToolbar = () => {
    const user = useAppSelector(selectUser);
    return (
        <AppBar position="sticky" sx={{mb: 2}}>
            <Toolbar sx={{justifyContent: 'space-between'}}>
                <Typography
                    variant="h5"
                    component={NavLink}
                    to="/"
                    sx={{
                        fontWeight: 700,
                        textDecoration: 'none',
                        color: 'inherit',
                        '&:hover': {
                            transform: 'scale(1.02)',
                            transition: 'transform 0.2s ease'
                        }
                    }}
                >
                    📰 News Posts
                </Typography>
                <Box>
                    {user ? <Usermenu user={user}/> : <AnonymousMenu/>}
                </Box>
            </Toolbar>
        </AppBar>
    );
};



export default AppToolbar;