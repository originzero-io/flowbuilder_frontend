import React from 'react'
import { NavMenuItemWrapper } from './style'

export default function NavMenuItem({label,icon,onClick}) {
    return (
        <NavMenuItemWrapper onClick={onClick}>
            {icon}
            <div style={{paddingLeft:'5px',fontSize:'1.5vmin'}}>{label}</div>
        </NavMenuItemWrapper>
    )
}
