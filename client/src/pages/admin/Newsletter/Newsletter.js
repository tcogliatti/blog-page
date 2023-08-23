import React from 'react';
import { Tab, Button } from "semantic-ui-react";
import { ListEmails } from "../../../componentes/Admin/Newsletter";
import "./Newsletter.scss";

const panes = [
  {
    render: () => (
      <Tab.Pane attached={false}>
        <ListEmails />
      </Tab.Pane>
    ),
  },
];

export function Newsletter() {
  return (
    <div className='newsletter-page'>
      <Tab menu={{ secondary: true }} panes={panes}/>
    </div>
  )
}
