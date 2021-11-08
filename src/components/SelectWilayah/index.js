import * as React from 'react';
import axios from 'axios';
import { Select } from 'upkit';
import { config } from '../../config';
import { oneOf, number, oneOfType, string, func, shape } from 'prop-types';

export default function SelectWilayah({tingkat, kodeInduk, onChange, value}){
    let [ data, setData ] = React.useState([]);
    let [ isFetching, setIsFetching ] = React.useState(false);

    React.useEffect(() => {
        setIsFetching(true);
        axios.get(`${config.api_host}/api/region/${tingkat}?master_code=${kodeInduk}`)
                .then(({data}) => setData(data))
                .finally(_ => setIsFetching(false))
    }, [kodeInduk, tingkat]);

    return <Select 
                options={data.map(wilayah => ({label: wilayah.nama, value: wilayah.kode}))}
                onChange={onChange}
                value={value}
                isLoading={isFetching} />

}

SelectWilayah.defaultProps = {
    tingkat: 'provinces'
}

SelectWilayah.propTypes = {
    tingkat: oneOf(['provinces', 'regencies', 'districts', 'villages']),
    kodeInduk: oneOfType([number, string]),
    onChange: func,
    value: shape({label: string, value: oneOfType([string, number])})
}