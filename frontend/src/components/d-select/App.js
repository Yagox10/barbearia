import React from 'react'

import Select from 'react-select'

export default function (props) {
    return(
        <label>
            <small>{props.label}</small>
            <Select
                options= {props.option}
                value={props.value}
                onChange={props.onChange}
            />
        </label>
    )
}