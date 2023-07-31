import React, { useState } from 'react';
import { Icon } from "../../../assets";
import "./Auth.scss"
import { Tab } from "semantic-ui-react";
import { RegisterForm, LoginForm} from "../../../componentes/Admin/Auth";

export function Auth() {
  const [activeIndex, setActiveIndex] = useState(0);

  const openLogin = () => setActiveIndex(0);

  const panes = [
    {
      menuItem: "Entrada",
      render: () => {
        return(
          <Tab.Pane>
            <LoginForm />
          </Tab.Pane>
        )
      }
    },
    {
      menuItem: "Nuevo Usuario",
      render: () => {
        return (
          <Tab.Pane>
            <RegisterForm openLogin={openLogin} />
          </Tab.Pane>
          )
      }
    }
  ]
  return (
    <div className='auth'>
      <Icon.LogoWhite className='logo'/>

      <Tab 
        panes = {panes} 
        className = "auth__forms" 
        activeIndex = {activeIndex} 
        onTabChange = { (_, data) => { 
                                      setActiveIndex(data.activeIndex);
                                    }}
      />
    </div>
  )
}
