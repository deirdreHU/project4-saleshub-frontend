import {AuthConsumer as useAuth} from "../../auth";
import {Button, Card, CardContent, Grid, Paper, TextField} from "@mui/material";
import {Form, Input, message} from "antd";
import {Link, useNavigate} from "react-router-dom";
import Logo from "../../components/logo/Logo";
import {authedRequest} from "../../http";

function Login() {

    const { login } = useAuth();
    const navigate = useNavigate();
    // Responses to user click submit button
    const handleSubmit = async (values) => {
        const res = await authedRequest.post('/api/users/login', values);
        const token = res.data.token;
        login(token)
            .then(() => {
                message.success("Welcome!");
                navigate('/');
            });
    }

    return (
        <div className={'container container-header'}>
            <Paper elevation={13} className={'w-100 p-3 m-auto'}>

                <Grid container>

                    <Grid item xs={4} className={'d-flex flex-column p-3'}>

                        <Form
                            layout={'vertical'}
                            onFinish={handleSubmit}
                            name="login-form"
                            autoComplete="off">

                            <Logo />

                            <h5 className={'mt-3'}>Log in</h5>

                            <label className={'form-label text-secondary fw-bold'}>Email Address</label>
                            <Form.Item
                                rules={[
                                    { required: true, message: 'Please input an correct email!', type: 'email' },
                                ]}
                                name={'email'}>
                                <TextField label="Email Address" fullWidth variant="filled" />
                            </Form.Item>

                            <label className={'form-label text-secondary fw-bold'}>Password</label>
                            <Form.Item
                                name={'password'}
                                rules={[
                                    { required: true, message: 'Please input your password!' }
                                ]}>
                                <TextField type={'password'} label="Password*" fullWidth variant="filled" />
                            </Form.Item>

                            <Form.Item>
                                <Button type={'submit'} fullWidth variant={'contained'} color={'secondary'}>Log in</Button>
                            </Form.Item>

                            <p className={'text-black text-end'}>
                                Don't have account yet?
                                <Link className={'text-info'} to={'/register'}>New Account</Link>
                            </p>
                        </Form>

                    </Grid>

                    <Grid item xs={8}></Grid>

                </Grid>

            </Paper>

        </div>
    )
}


export default Login;