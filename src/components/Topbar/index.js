import React from 'react';
import StoreLogo from '../StoreLogo';
import { useSelector } from 'react-redux';
import { Responsive, ButtonCircle } from 'upkit';
import { Link } from 'react-router-dom';
import FaUser from "@meronex/icons/fa/FaUser";

const Topbar = () => {
    let auth = useSelector(state => state.auth);
    return(
        <Responsive desktop={2} justify="between" items="center">
            <div>
                <StoreLogo />
            </div>
            <div className="mr-5 text-right">
                <div className="mr-2 inline-block text-red-600 font-bold">
                    <Link to={auth?.user ? '/acount' : '/login'}>{auth?.user?.full_name}</Link>
                </div>
                <ButtonCircle icon={<FaUser/>} />
            </div>
        </Responsive>
    );
}

export default Topbar;