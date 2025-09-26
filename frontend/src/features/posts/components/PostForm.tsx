import {Button, TextField} from "@mui/material";
import Grid from "@mui/material/Grid";
import {useState} from "react";
import type {PostMutation} from "../../../types";
import FileInput from "../../../components/FileInput/FileInput.tsx";
import { useAppSelector } from "../../../app/hooks.ts";
import { selectUser } from "../../users/usersSlice.ts";
import {Navigate} from "react-router-dom";


interface Props {
    onSubmitPost: (post: PostMutation) => void;
}

const PostForm: React.FC<Props> = ({onSubmitPost}) => {
    const  user = useAppSelector(selectUser);
    const [form, setForm] = useState<PostMutation>({
        title: '',
        content: '',
        image: null,
    });

    if (!user) {
        return <Navigate to="/login" />;
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmitPost({...form});
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target;

        if(files) {
            setForm(prevState => ({
                ...prevState,
                [name]: files[0],
            }));
        }
    };
    return (
        <form onSubmit={onSubmit} style={{ width: "50%", margin: "0 auto" }}>
            <Grid container spacing={2} direction="column" alignItems="center">
                <Grid size={{sm: 12, md: 6, lg: 6}}>
                    <TextField
                        style={{ width: "100%"}}
                        id="title"
                        label="Title"
                        name="title"
                        value={form.title}
                        onChange={onInputChange}
                    />
                </Grid>
                <Grid size={{sm: 12, md: 6, lg: 6}}>
                    <TextField
                        style={{ width: "100%"}}
                        multiline rows={3}
                        id="content"
                        label="Content"
                        name="content"
                        value={form.content}
                        onChange={onInputChange}
                    />
                </Grid>
                <Grid size={{sm: 12, md: 6, lg: 6}}>
                    <FileInput
                        name="image"
                        label="Image"
                        onChange={fileInputChangeHandler}
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

export default PostForm;