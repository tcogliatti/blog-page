import React, { useState } from 'react';
import { Button, Tab } from "semantic-ui-react";
import { ListPost, FormPost } from "../../../componentes/Admin/Post";
import { BasicModal } from "../../../componentes/Shared";
import "./Blog.scss";



export function Blog() {
  const [show, setShow] = useState(false);
  const [reload, setReload] = useState(false);

  const onOpenCloseModal = () => setShow((prevState) => !prevState);
  const onReload = () => setReload((prevState) => !prevState);

  const panes = [
    {
      render: () => (
        <Tab.Pane attached={false}>
          <ListPost reload={reload} onReload={onReload}/>
        </Tab.Pane>
      ),
    },
  ]; 

  return (
    <>
      <div className='blog-page'>
        <div className='blog-page__add'>
          <Button primary onClick={onOpenCloseModal}>
            Nuevo Post
          </Button>
        </div>
        <Tab menu={{ secondary: true }} panes={panes} />
      </div>

      <BasicModal
        show={show}
        close={onOpenCloseModal}
        title={`Crear nuevo post`}
        size='large'
        children={
          <FormPost close={onOpenCloseModal} onReload={onReload}/>
        
        }
      />
    </>
  )
}
