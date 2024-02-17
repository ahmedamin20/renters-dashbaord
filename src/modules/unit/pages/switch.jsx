import React from "react";
import Switch from '@mui/material/Switch';
import { useDispatch } from "react-redux";
import { activeCurrencies, getCurrencies } from "../../../redux/currencies.js";

const ActiveCurrenciesSwitch = (props) => {
    const dispatch = useDispatch();

    const handleChange = async () => {
        await dispatch(activeCurrencies(props.id));
        await dispatch(getCurrencies());
    }

    return (
        <Switch
            onChange={handleChange}
            checked={props.isActive}
            color="secondary"
            disabled={props.disabled}
        />
    )
}

export default ActiveCurrenciesSwitch
