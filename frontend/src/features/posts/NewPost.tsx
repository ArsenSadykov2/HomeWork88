import { Typography } from "@mui/material";
import type {PostMutation} from "../../types";
import {useAppDispatch} from "../../app/hooks.ts";
import {useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
import PostForm from "./components/PostForm.tsx";
import {createPost} from "./postsThunks.ts";

const NewPost = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const onCreateNewProduct = async (post: PostMutation) => {
        try{
            await dispatch(createPost(post)).unwrap();
            toast.success("Product successfully was created!");
            navigate("/");
        } catch (e) {
            console.error(e);
            toast.error("Error creating new product");
        }
    };
    return (
        <div>
            <Typography variant="h4" style={{textAlign: "center", marginBottom: "20px"}}>New Post</Typography>
            <PostForm onSubmitPost={onCreateNewProduct}/>
        </div>
    );
};

export default NewPost;