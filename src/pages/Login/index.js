import React, {useState} from 'react';
import { LayoutOne, Card, FormControl, InputText, InputPassword, Button } from 'upkit';
import { rules } from './validation';
import { useForm } from 'react-hook-form';
import StoreLogo from '../../components/StoreLogo';
import { login } from '../../api/auth';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../features/Auth/action';
import { useHistory, Link } from 'react-router-dom';

const statuslist = {
    idle: 'idle',
    process: 'process',
    success: 'success',
    error: 'error'
}

const Login = () => {
    const { register, handleSubmit, formState: { errors }, setError } = useForm();
    const dispatch = useDispatch();
    const history = useHistory();
    let [status, setStatus] = useState(statuslist.idle);

    const onSubmit = async ({email, password}) => {
        setStatus(statuslist.process);
        let { data } = await login(email, password);
        if(data.error){
            setError('password', {type: 'invalidCredential', message: data.message});
            setStatus(statuslist.error);
        }else{
            let {user, token} = data;
            dispatch(userLogin(user, token));
            history.push("/");
            setStatus(statuslist.success);
        }
    }
    return(
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <LayoutOne size="small">
            <Card color="white">
            <div>
                <div className="text-center mb-5">
                    <StoreLogo/>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl errorMessage={errors.email?.message}>
                        <InputText name="email" placeholder="Email" fitContainer {...register("email", rules.email)} />
                    </FormControl>

                    <FormControl errorMessage={errors.password?.message}>
                        <InputPassword name="password" placeholder="Password" fitContainer {...register("password", rules.password)} />
                    </FormControl>
                    <Button 
                        size="large" 
                        fitContainer
                        disabled={status === statuslist.process}>
                        {status === statuslist.process ? "Loading..." : "Login"}
                    </Button>
                </form>
                <div className="text-center mt-2">
                    <Link to="/register">Don't have an account ? Register</Link>
                </div>
            </div>
            </Card>
        </LayoutOne>
        </div>
    )
}

export default Login;