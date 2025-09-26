import { NavLink, useNavigate } from "react-router-dom";
import { Alert, Avatar, Box, Button, Link, Stack, TextField, Typography, CircularProgress } from "@mui/material";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { selectLoginError, selectLoginLoading } from "./usersSlice.ts";
import { type ChangeEvent, type FormEvent, useState } from "react";
import type { LoginMutation } from "../../types";
import { login } from "./usersThunks.ts";

const Login = () => {
    const dispatch = useAppDispatch();
    const error = useAppSelector(selectLoginError);
    const loading = useAppSelector(selectLoginLoading);
    const navigate = useNavigate();

    const [state, setState] = useState<LoginMutation>({
        username: '',
        password: '',
    });

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setState(prevState => ({ ...prevState, [name]: value }));
    };

    const onSubmitForm = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await dispatch(login(state)).unwrap();
            navigate("/");
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '400px', justifyContent: 'center', margin: "auto" }}>
            <Avatar sx={{ m: 1, bgcolor: 'success.main', width: 56, height: 56 }}>
                <LockOpenIcon sx={{ fontSize: 30 }} />
            </Avatar>

            <Typography component="h1" variant="h4" sx={{ mb: 1, fontWeight: 700 }}>
                Вход в аккаунт
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Введите свои учетные данные
            </Typography>

            {error && (
                <Alert severity="error" sx={{ width: '100%', mb: 2, borderRadius: 2 }}>
                    {error.error}
                </Alert>
            )}

            <Box component="form" onSubmit={onSubmitForm} sx={{ width: '100%' }}>
                <Stack spacing={3}>
                    <TextField
                        fullWidth
                        label="Имя пользователя"
                        name="username"
                        value={state.username}
                        onChange={inputChangeHandler}
                        autoComplete="current-username"
                        variant="outlined"
                        sx={{
                            borderRadius: 2,
                        }}
                    />

                    <TextField
                        fullWidth
                        type="password"
                        label="Пароль"
                        name="password"
                        value={state.password}
                        onChange={inputChangeHandler}
                        autoComplete="current-password"
                        variant="outlined"
                        sx={{
                            borderRadius: 2,
                        }}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        size="large"
                        disabled={loading}
                        sx={{
                            py: 1.5,
                            borderRadius: 2,
                            textTransform: 'none',
                            fontSize: '1.1rem',
                            fontWeight: 600,
                            mt: 1,
                            bgcolor: 'success.main',
                            '&:hover': { bgcolor: 'success.dark' }
                        }}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Войти'}
                    </Button>
                </Stack>
            </Box>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                    Нет аккаунта?{' '}
                    <Link
                        component={NavLink}
                        to="/register"
                        sx={{
                            fontWeight: 600,
                            textDecoration: 'none',
                            '&:hover': { textDecoration: 'underline' }
                        }}
                    >
                        Зарегистрироваться
                    </Link>
                </Typography>
            </Box>
        </Box>
    );
};

export default Login;