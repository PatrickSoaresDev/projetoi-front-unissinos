import * as React from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface ButtonProps {
    title: string
    icon: string
    color: string
}

export default function Button({ ...props }) {
    // const { title, icon, color } = style

    return (
        <button
            {...props}
            title={props.title}
            type="button"
            data-te-ripple-init
            data-te-ripple-color="light"
            className="bg-green-900  rounded px-1 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg hover:bg-green-300 focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg">
            <FontAwesomeIcon icon={props.icon as IconProp} color={`${props.color}`} />
        </button>
    )

} 