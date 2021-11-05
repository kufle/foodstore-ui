import React, { useState } from 'react';
import { LayoutOne, Card, FormControl, InputText, InputPassword, Button } from 'upkit';
import { useForm } from 'react-hook-form';
import { rules } from './validation';
import { registerUser } from '../../api/auth';
import { useHistory, Link } from 'react-router-dom';
import StoreLogo from '../../components/StoreLogo';

const statuslist = {
    idle: 'idle',
    process: 'process',
    success: 'success',
    error: 'error'
}

function Register(){
    let { register, handleSubmit, formState: { errors }, setError } = useForm();
    let [status, setStatus] = useState(statuslist.idle);
    const history = useHistory();

    const onSubmit = async formData => {
        const { password, password_confirmation } = formData;
        //cek password vs password confirmation
        if(password !== password_confirmation) {
            return setError('password_confirmation', {type: 'equality',message: 'Konfirmasi password harus dama dengan password'});
        }

        setStatus(statuslist.process);

        let { data } = await registerUser(formData);
        //cek apakah ada error
        if(data.error){
            //dapatkan field terkait  jika ada errors
            let fields = Object.keys(data.fields);
            //untuk masing masing field kita terapkan error dan tangkap pesan errornya
            fields.forEach(field => {
                setError(field, {type: 'server', message: data.fields[field]?.properties?.message});
            });

            setStatus(statuslist.error);
            return;
        }

        setStatus(statuslist.success);
        history.push('register-success');
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
                        <FormControl errorMessage={errors.full_name?.message}>
                            <InputText name="full_name" placeholder="Full Name" fitContainer {...register("full_name", rules.full_name)} />
                        </FormControl>

                        <FormControl errorMessage={errors.email?.message}>
                            <InputText name="email" placeholder="Email" fitContainer {...register("email", rules.email)} />
                        </FormControl>

                        <FormControl errorMessage={errors.password?.message}>
                            <InputPassword name="password" placeholder="Password" fitContainer {...register("password", rules.password)} />
                        </FormControl>

                        <FormControl errorMessage={errors.password_confirmation?.message}>
                            <InputPassword name="password_confirmation" placeholder="Password Confirmation" fitContainer {...register("password_confirmation", rules.password_confirmation)} />
                        </FormControl>

                        <Button 
                            size="large" 
                            fitContainer
                            disabled={status === statuslist.process}
                        >{status === statuslist.process ? "Please Wait" : "Register"}</Button>
                        <div className="text-center mt-2">
                            <Link to="/login">Already have an account ? Login</Link>
                        </div>
                    </form>
                </div>
            </Card>
        </LayoutOne>
        </div>
    );
}

export default Register;