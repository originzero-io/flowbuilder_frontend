import React from 'react'
import ConfigurationMenu from "./ConfigurationMenu"
import MainMenu from "./MainMenu"
import UtilitiesMenu from "./UtilitiesMenu"
export default function NavMenus() {
    return (
        <>
          <MainMenu/>  
          <ConfigurationMenu/>  
          <UtilitiesMenu/>  
        </>
    )
}
