import {Button, Grid, Paper, TextField} from "@mui/material";
import {Form, message} from "antd";
import {Link, useNavigate} from "react-router-dom";
import Logo from "../../components/logo/Logo";
import {authedRequest} from "../../http";
import {AuthConsumer as useAuth} from "../../auth";

function Register() {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const {login} = useAuth();

    const handleSubmit = async (values) => {
        const res = await authedRequest.post('/api/users/register', values);

        const token = res.data.token;
        login(token)
        .then(() => {
            message.success("Welcome!");
            navigate('');
        });
    }

    return (
        <div className={'container container-header'}>

            <Paper elevation={13} className={'w-100 m-auto'}>

                <Grid container>

                    <Grid item xs={4} className={'d-flex flex-column p-3'}>

                        <Form
                            form={form}
                            onFinish={handleSubmit}
                            layout={'vertical'}
                            name="login-form"
                            autoComplete="off">

                            <Logo />

                            <h5 className={'mt-3'}>Sign up</h5>

                            <label className={'form-label text-secondary fw-bold mt-4'}>Username</label>
                            <Form.Item
                                rules={[{ required: true, message: 'Please input your username!' }]}
                                name={'username'}>
                                <TextField label="username" fullWidth variant="filled" />
                            </Form.Item>

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

                            <label className={'form-label text-secondary fw-bold'}>Confirm your password</label>
                            <Form.Item
                                name={'confirmPassword'}
                                rules={[
                                    { required: true, message: 'Please input your password again!' },
                                    {
                                        message: 'Two password must same!',
                                        validator: (_, value) => {
                                        if (value === form.getFieldValue('password')) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject();
                                        }
                                    }
                                ]}>
                            <TextField type={'password'} label="Confirm your password" fullWidth variant="filled" />
                            </Form.Item>

                            <Form.Item>
                                <Button type={'submit'} fullWidth variant={'contained'} color={'primary'}>Sign up</Button>
                            </Form.Item>

                            <p className={'text-black text-end'}>
                                Already have an account?
                                <Link className={'text-info'} to={'/login'}>Sign In</Link>
                            </p>

                        </Form>

                    </Grid>

                    <Grid item xs={8} className={'bg-light p-3'}></Grid>

                </Grid>

            </Paper>

        </div>
    )
}

export default Register;
