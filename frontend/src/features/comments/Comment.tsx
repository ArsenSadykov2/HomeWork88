import {Box, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useEffect} from "react";
import Spinner from "../../components/Spinner/Spinner.tsx";
import {selectComments, selectCommentsLoading} from "./commentsSlice.ts";
import CommentItem from "./components/CommentItem.tsx";
import { useParams } from "react-router-dom";
import {fetchCommentById} from "./commentsThunks.ts";

const Comment = () => {
    const dispatch = useAppDispatch();
    const comments = useAppSelector(selectComments);
    const loading = useAppSelector(selectCommentsLoading);

    const {id: postId} = useParams();

    useEffect(() => {
        if (postId) {
            dispatch(fetchCommentById(postId));
        }
    }, [dispatch, postId]);


    return (
        <Box>
            <Typography variant="h5" gutterBottom>
                Comments
            </Typography>

            {loading ? <Spinner/> :
                comments.length === 0 ? (
                    <Typography>No comments yet</Typography>
                ) : (
                    <Box>
                        {comments.map(comment => (
                            <CommentItem
                                key={comment._id}
                                author={comment.author.username}
                                post={comment.post}
                                comment={comment.comment}
                            />
                        ))}
                    </Box>
                )
            }
        </Box>
    );
};

export default Comment;