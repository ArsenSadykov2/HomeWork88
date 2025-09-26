import {Container, CssBaseline, Typography } from '@mui/material';
import {ToastContainer} from "react-toastify";
import './App.css'
import AppToolbar from './components/AppToolbar/AppToolbar';
import {Route, Routes } from 'react-router-dom';
import Register from "./features/users/Register.tsx";
import Login from "./features/users/Login.tsx";
import Post from "./features/posts/Post.tsx";
import CommentForm from "./features/comments/components/CommentForm.tsx";
import NewPost from "./features/posts/NewPost.tsx";
import FullPost from "./features/posts/FullPost.tsx";

const App = () => (
    <>
        <CssBaseline/>
        <ToastContainer/>
        <header>
            <AppToolbar>

            </AppToolbar>
        </header>
        <main>
            <Container maxWidth="xl">
                <Routes>
                    <Route path="/" element={<Post/>}/>
                    <Route path="/posts" element={<NewPost/>}/>
                    <Route path="/post/:id" element={<FullPost/>}/>
                    <Route path="/comments" element={<CommentForm/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="*" element={<Typography variant="h4">Not Found Page</Typography>}/>
                </Routes>
            </Container>
        </main>
    </>
);

export default App
