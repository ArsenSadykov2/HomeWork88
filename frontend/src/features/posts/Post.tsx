import {Grid, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useEffect} from "react";
import Spinner from "../../components/Spinner/Spinner.tsx";
// import {useParams} from "react-router-dom";
import {selectPosts, selectPostsLoading} from "./postsSlice.ts";
import PostItem from "./components/PostItem.tsx";
import {fetchAllPosts} from "./postsThunks.ts";

const Posts = () => {
    const dispatch = useAppDispatch();
    const posts = useAppSelector(selectPosts);
    const postsFetchLoading = useAppSelector(selectPostsLoading);

    // const {id} = useParams();

    useEffect(() => {
        dispatch(fetchAllPosts());
    }, [dispatch]);

    return (
        <Grid container direction="column" spacing={2}>
            <Grid container justifyContent="space-between" alignItems="center">
                <Grid>
                    <Grid>
                        {posts.length > 0 && posts[0].author && (
                            <Typography variant='h4'>{posts[0].author.username}</Typography>
                        )}
                    </Grid>
                </Grid>
            </Grid>


            {postsFetchLoading ? <Spinner/> :
                <>
                    {posts.length === 0 ? <Typography variant='h4'>No Posts yet</Typography> :
                        <Grid container direction="row" spacing={1}>
                            {posts.map(post => (
                                <PostItem
                                    key={post._id}
                                    id={post._id}
                                    author={post.author.username}
                                    title={post.title}
                                    image={post.image || undefined}
                                    dateTime={post.dateTime}
                                />
                            ))}
                        </Grid>
                    }
                </>
            }
        </Grid>
    );
};

export default Posts;