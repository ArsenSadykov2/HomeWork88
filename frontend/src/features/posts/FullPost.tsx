import {NavLink, useParams} from "react-router-dom";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {Card, CardContent, CardMedia, Container, IconButton, Typography, Box} from "@mui/material";
import NotFoundPic from '../../assets/images/NotFoundPic.png';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {apiUrl} from "../../../globalConstants.ts";
import {selectOnePost, selectPostsLoading} from "./postsSlice.ts";
import {fetchPostById} from "./postsThunks.ts";
import Spinner from "../../components/Spinner/Spinner.tsx";
import Comment from "../comments/Comment.tsx";
import CommentForm from "../comments/components/CommentForm.tsx";
import {selectUser} from "../users/usersSlice.ts";

const FullPost = () => {
    const dispatch = useAppDispatch();
    const post = useAppSelector(selectOnePost);
    const fetchLoading = useAppSelector(selectPostsLoading);
    const user = useAppSelector(selectUser);

    const {id} = useParams();

    useEffect(() => {
        if(id) {
            dispatch(fetchPostById(id))
        }
    }, [id, dispatch])

    return (
        <Container maxWidth="md" sx={{ py: 3 }}>
            <Box sx={{ mb: 2 }}>
                <IconButton component={NavLink} to="/" sx={{ textDecoration: 'none' }}>
                    <ArrowBackIcon />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                        Back to posts
                    </Typography>
                </IconButton>
            </Box>

            {fetchLoading && <Spinner/>}

            {!fetchLoading && post ? (
                <Card sx={{ mb: 4 }}>
                    <CardMedia
                        component="img"
                        height="300"
                        image={post?.image ? apiUrl + '/' + post.image : NotFoundPic}
                        alt={post.title}
                    />
                    <CardContent>
                        <Typography variant="h4" gutterBottom>
                            {post.title}
                        </Typography>
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                            Author: {post.author.username}
                        </Typography>
                        <Typography variant="body1" paragraph>
                            {post.content}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Date: {post.dateTime}
                        </Typography>
                    </CardContent>
                </Card>
            ) : (
                !fetchLoading && <Typography variant="h6">Post not found</Typography>
            )}
            <Comment/>
            {user ? <CommentForm/> : (
                <Box sx={{ textAlign: 'center', mt: 3 }}>
                    <Typography variant="h6" color="text.secondary">
                        Please log in to leave a comment
                    </Typography>
                </Box>
            )}
        </Container>
    );
};

export default FullPost;