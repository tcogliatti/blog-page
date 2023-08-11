import React from 'react';
import "./AdminLayout.scss";
import { Icon } from "../../assets"
import { AdminMenu, Logout } from "../../componentes/Admin/AdminLayout";

export function AdminLayout(props) {
  const { children } = props;

  return (
    <div className='admin-layout'>
      <div className='admin-layout__left'>
        <Icon.LogoWhite className='logo' />
        <AdminMenu />
      </div>
      <div className='admin-layout__rigth'>
        <div className='admin-layout__rigth-header'>
          <Logout/>
        </div>
        <div className='admin-layout__rigth-content'>
          {children}
        </div>
      </div>
    </div>
  )
}
