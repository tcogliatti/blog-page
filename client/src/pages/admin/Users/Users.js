import React, { useState } from 'react';
import { Tab, Button } from "semantic-ui-react";
import { BasicModal } from "../../../componentes/Shared";
import { UserForm, ListUsers } from "../../../componentes/Admin/Users";
import "./Users.scss";


export function Users() {
  const [showModal, setShowModal] = useState(false);
  const [reload, setReaload] = useState(false);

  const onOpenCloseModal = () => setShowModal((prevSatate) => !prevSatate);
  const onReload = () => setReaload((prevSatate) => !prevSatate);

  const panes = [
    {
      menuItem: "Usuarios Activos",
      render: () => (
        <Tab.Pane attached={false}>
          <ListUsers usersActive={true} reload={reload} onReload={onReload}/>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Usuarios Inactivos",
      render: () => (
        <Tab.Pane attached={false}>
          <ListUsers usersActive={false} reload={reload} onReload={onReload}/>
        </Tab.Pane>
      ),
    },
  ]

  return (
    <>
      <div className='users-page'>
        <Button className='users-page__add' primary onClick={onOpenCloseModal}>Nuevo Usuario</Button>
        <Tab menu={{ secondary: true }} panes={panes} />
      </div>

      <BasicModal show={showModal} close={onOpenCloseModal} title="Crear nuevo usuario">
        <UserForm close={onOpenCloseModal} onReload={onReload}/>
      </BasicModal>
    </>
  )
}
