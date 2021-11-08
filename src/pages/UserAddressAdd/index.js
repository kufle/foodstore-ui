import * as React from 'react'; 
import {LayoutOne, InputText, FormControl, Textarea, Button} from 'upkit';
import {useForm} from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import Topbar from '../../components/Topbar';
import SelectWilayah from '../../components/SelectWilayah';
import { rules } from './validation';
import { createAddress } from '../../api/address';

export default function UserAddressAdd(){

  let history = useHistory(); 
  let { handleSubmit, register,  formState: { errors }, watch, getValues, setValue } = useForm();

  let allFields = watch();

	React.useEffect(() => {
		register('provinces', rules.provinces);
		register('regencies', rules.regencies);
		register('districts', rules.districts);
		register('villages', rules.villages);
	}, [register])

  
  React.useEffect(() => {
    setValue('regencies', null); 
    setValue('districts', null); 
    setValue('villages', null);
  }, [allFields.provinces, setValue])

  React.useEffect(() => {
    setValue('districts', null); 
    setValue('villages', null);
  }, [allFields.regencies, setValue]) 

  React.useEffect(() => {
    setValue('villages', null);
  }, [allFields.districts, setValue]) 

  const updateValue = 
    (field, value) => setValue(field, value, {shouldValidate: true, shouldDirty: true});

  const onSubmit = async formData => {
     let payload = {
        name: formData.nama_alamat, 
        detail: formData.detail_alamat,
        province: formData.provinces.label, 
        regency: formData.regencies.label, 
        district: formData.districts.label, 
        village: formData.villages.label
     }

    let { data } = await createAddress(payload);

    if(data.error) return;

    history.push('/alamat-pengiriman');

  }


  return (
     <LayoutOne>
       <Topbar/>
       <br />
       <div>
         <form onSubmit={handleSubmit(onSubmit)}>
           <FormControl label="Nama alamat" errorMessage={errors.nama_alamat?.message} color="black">
             <InputText
               placeholder="Nama alamat"
               fitContainer
               name="nama_alamat"
               {...register("nama_alamat", rules.nama_alamat)}
             />
           </FormControl>
           <FormControl label="provinces" errorMessage={errors.provinces?.message} color="black">
             <SelectWilayah
                onChange={option => updateValue('provinces', option)}
                name="provinces"
                value={getValues().provinces}
             />
           </FormControl>
           <FormControl label="regencies/kota" errorMessage={errors.regencies?.message} color="black">
             <SelectWilayah
               tingkat="regencies"
               kodeInduk={getValues().provinces?.value}
               onChange={option => updateValue('regencies', option)}
               value={getValues().regencies}
             />
           </FormControl>
           <FormControl label="districts" errorMessage={errors.districts?.message} color="black">
             <SelectWilayah
               tingkat="districts"
               kodeInduk={getValues().regencies?.value}
               onChange={ option => updateValue('districts', option)}
               value={getValues().districts}
             />
           </FormControl>
           <FormControl label="villages" errorMessage={errors.villages?.message} color="black" >
             <SelectWilayah
               tingkat="villages"
               kodeInduk={getValues().districts?.value}
               onChange={ option => updateValue('villages', option)}
               value={getValues().villages}
             />
           </FormControl>
           <FormControl label="Detail alamat" errorMessage={errors.detail_alamat?.message} color="black">
             <Textarea
               placeholder="Detail alamat"
               fitContainer
               name="detail_alamat"
               {...register("detail_alamat", rules.detail_alamat)}
             />
           </FormControl>

           <Button fitContainer>
             Simpan
           </Button>
         </form>
       </div>
     </LayoutOne>
   )
}
