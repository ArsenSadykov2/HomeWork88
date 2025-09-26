import {Button, TextField} from "@mui/material";
import Grid from "@mui/material/Grid";
import {useState} from "react";
import type {CommentMutation} from "../../../types";
import {useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import { selectUser } from "../../users/usersSlice.ts";
import {Navigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import {createComment, fetchCommentById} from "../commentsThunks.ts";


const CommentForm = () => {
    const dispatch = useAppDispatch();
    const  user = useAppSelector(selectUser);
    const { id: postId } = useParams();
    const [form, setForm] = useState<CommentMutation>({
        comment: '',
        post: postId || '',
    });

    if (!user) {
        return <Navigate to="/login" />;
    }

    const onCreateNewComment = async (form: CommentMutation) => {
        try {
            await dispatch(createComment(form)).unwrap();
            toast.success("Comment successfully created!");
            setForm({ comment: '', post: postId || '' });
            if (postId) {
                dispatch(fetchCommentById(postId));
            }
        } catch (e) {
            console.error(e);
            toast.error("Error creating comment");
        }
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onCreateNewComment({...form});
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };
    return (
        <form onSubmit={onSubmit} style={{ width: "50%", margin: "0 auto" }}>
            <Grid container spacing={2} direction="column" alignItems="center">
                <Grid size={{sm: 12, md: 6, lg: 6}}>
                    <TextField
                        style={{ width: "100%"}}
                        multiline rows={3}
                        id="comment"
                        label="Comment"
                        name="comment"
                        value={form.comment}
                        onChange={onInputChange}
                    />
                </Grid>
                <Grid size={{sm: 12, md: 6, lg: 6}}>
                    <Button
                        style={{ width: "100%"}}
                        type="submit" color="primary" variant="contained">
                        Create
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default CommentForm;