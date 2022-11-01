import {AuthConsumer as useAuth} from "../../auth";
import {Button, Grid, TextField} from "@mui/material";
import {Form, message} from "antd";
import {Link, useNavigate} from "react-router-dom";
import Logo from "../../components/logo/Logo";
import {authedRequest} from "../../http";

function Login() {

    const { login } = useAuth();

    const navigate = useNavigate();

    // Responses to user click submit button
    const handleSubmit = async (values) => {
        console.log("values:",values)
        const res = await authedRequest.post('/api/users/login', values);
        const token = res.data.token;
        login(token)
            .then(() => {
                message.success("Welcome!");
                navigate('/');
            });
    }

    return (
        <>
            <div>
                <Grid container mt={8} mb={4} display="flex" justifyContent="center" alignItems="center">
                    <Logo />
                </Grid>
            </div>

            <div className={'container'}>

                <Grid container spacing={4} display="flex" justifyContent="center" alignItems="center" >

                    <Grid item xs={4} >

                        <Form
                            layout={'vertical'}
                            onFinish={handleSubmit}
                            name="login-form"
                            autoComplete="off">

                            <h5 className={'mt-3 mb-3'}>Log in</h5>

                            <Form.Item
                                rules={[
                                    { required: true, message: 'Please input an correct email!', type: 'email' },
                                ]}
                                name={'email'}>
                                <TextField label="Email Address" fullWidth variant="filled" />
                            </Form.Item>

                            <Form.Item
                                name={'password'}
                                rules={[
                                    { required: true, message: 'Please input your password!' }
                                ]}>
                                <TextField type={'password'} label="Password*" fullWidth variant="filled" />
                            </Form.Item>

                            <Form.Item>
                                <Button type={'submit'} fullWidth variant={'contained'} color={'primary'}>Log in</Button>
                            </Form.Item>

                            <p className={'text-black text-end'}>
                                Don't have account yet?
                                <Link className={'text-info'} to={'/register'}>Create New Account</Link>
                            </p>
                        </Form>

                    </Grid>

                </Grid>

            </div>
        </>
    )
}


export default Login;