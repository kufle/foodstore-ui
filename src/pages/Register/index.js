import React from 'react';
import { LayoutOne, Card, FormControl, InputText, InputPassword, Button } from 'upkit';
import { useForm } from 'react-hook-form';
import { rules } from './validation';
import { registerUser } from '../../api/auth';
import { config } from '../../config';

function Register(){
    let { register, handleSubmit, formState: { errors }, setError } = useForm();
    //cek password vs password confirmation
    
    const onSubmit = async formData => {
        const { password, password_confirmation } = formData;
        if(password !== password_confirmation) {
            return setError('password_confirmation', {type: 'equality',message: 'Konfirmasi password harus dama dengan password'});
        }
        let { data } = await registerUser(formData);
        //cek apakah ada error
        if(data.error){
            //dapatkan field terkait  jika ada errors
            let fields = Object.keys(data.fields);
            //untuk masing masing field kita terapkan error dan tangkap pesan errornya
            fields.forEach(field => {
                setError(field, {type: 'server', message: data.fields[field]?.properties?.message});
            });
        }
    }
    return(
        <LayoutOne size="small">
            <Card color="white">
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

                    <Button size="large" fitContainer>Register</Button>
                </form>
            </Card>
        </LayoutOne>
    );
}

export default Register;