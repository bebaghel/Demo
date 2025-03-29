import React from "react";
import {useDispatch} from 'react-redux';

import {Navigate }from 'react-router'

const Logout = () => {
    const dispatch = useDispatch();
    dispatch(removeUser());

    localStorage.clear();
    <Navigate to='/' />
}

export default Logout;