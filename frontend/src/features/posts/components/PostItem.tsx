import {Box, Card, CardActions, CardContent, CardMedia, Grid, IconButton, Typography, useTheme} from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import {Link} from 'react-router-dom';
import NotFoundPic from '../../../assets/images/NotFoundPic.png';
import {apiUrl} from "../../../../globalConstants.ts";

interface Props {
    id: string,
    author: string;
    title: string;
    image: string | undefined,
    dateTime: string
}

const PostItem: React.FC<Props> = ({id, author, title, dateTime, image}) => {
    const theme = useTheme();
    let cartImage = NotFoundPic;

    if(image) {
        cartImage = apiUrl + '/' + image;
    }


    return (
        <Grid size={{xs: 6,sm: 12, md: 6, lg: 4}}>
            <Card
                sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: theme.shadows[8],
                    }
                }}
            >
                <CardMedia
                    component="img"
                    height="200"
                    image={cartImage}
                    alt={title}
                    sx={{
                        objectFit: 'cover',
                    }}
                />

                <CardContent sx={{ flexGrow: 1, p: 2 }}>
                    <Typography
                        variant="h6"
                        component="h3"
                        sx={{
                            fontWeight: 600,
                            lineHeight: 1.3,
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            minHeight: '64px',
                            mb: 2
                        }}
                    >
                        {title}
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <PersonIcon fontSize="small" color="primary" />
                            <Typography variant="body2" color="text.secondary">
                                {author}
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CalendarTodayIcon fontSize="small" color="primary" />
                            <Typography variant="body2" color="text.secondary">
                                {dateTime}
                            </Typography>
                        </Box>
                    </Box>
                </CardContent>

                <CardActions sx={{ p: 2, pt: 0 }}>
                    <IconButton
                        component={Link}
                        to={'/post/' + id}
                        sx={{
                            backgroundColor: theme.palette.primary.main,
                            color: 'white',
                            '&:hover': {
                                backgroundColor: theme.palette.primary.dark,
                                transform: 'scale(1.1)'
                            },
                            transition: 'all 0.3s ease-in-out',
                            ml: 'auto'
                        }}
                    >
                        <ArrowForwardIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default PostItem;