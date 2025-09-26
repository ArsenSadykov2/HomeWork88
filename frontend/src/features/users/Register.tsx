import { type ChangeEvent, type FormEvent, useState } from "react";
import type { RegisterMutation } from "../../types";
import { Avatar, Box, Button, Link, Stack, TextField, Typography, CircularProgress } from "@mui/material";
import LockOutlineIcon from '@mui/icons-material/LockOutline';
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { selectRegisterError, selectRegisterLoading } from "./usersSlice.ts";
import { register } from "./usersThunks.ts";

const Register = () => {
    const dispatch = useAppDispatch();
    const error = useAppSelector(selectRegisterError);
    const loading = useAppSelector(selectRegisterLoading);
    const navigate = useNavigate();

    const [state, setState] = useState<RegisterMutation>({
        username: '',
        password: '',
    });

    const getFieldError = (fieldName: string) => {
        return error?.errors[fieldName]?.message;
    };

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setState(prevState => ({ ...prevState, [name]: value }));
    };

    const onSubmitForm = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await dispatch(register(state)).unwrap();
            navigate("/");
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '400px', justifyContent: 'center', margin: "auto" }}>
            <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 56, height: 56 }}>
                <LockOutlineIcon sx={{ fontSize: 30 }} />
            </Avatar>

            <Typography component="h1" variant="h4" sx={{ mb: 1, fontWeight: 700 }}>
                Создать аккаунт
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Заполните данные для регистрации
            </Typography>

            <Box component="form" onSubmit={onSubmitForm} sx={{ width: '100%' }}>
                <Stack spacing={3}>
                    <TextField
                        required
                        fullWidth
                        label="Имя пользователя"
                        name="username"
                        value={state.username}
                        onChange={inputChangeHandler}
                        autoComplete="new-username"
                        error={Boolean(getFieldError('username'))}
                        helperText={getFieldError('username')}
                        variant="outlined"
                        sx={{
                            borderRadius: 2,
                        }}
                    />

                    <TextField
                        required
                        fullWidth
                        type="password"
                        label="Пароль"
                        name="password"
                        value={state.password}
                        onChange={inputChangeHandler}
                        autoComplete="new-password"
                        error={Boolean(getFieldError('password'))}
                        helperText={getFieldError('password')}
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
                            mt: 1
                        }}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Зарегистрироваться'}
                    </Button>
                </Stack>
            </Box>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                    Уже есть аккаунт?{' '}
                    <Link
                        component={NavLink}
                        to="/login"
                        sx={{
                            fontWeight: 600,
                            textDecoration: 'none',
                            '&:hover': { textDecoration: 'underline' }
                        }}
                    >
                        Войти
                    </Link>
                </Typography>
            </Box>
        </Box>
    );
};

export default Register;