import React from 'react';
// import { Button, Icon } from 'semantic-ui-react';
import { BrowserRouter } from "react-router-dom";
import { WebRouter, AdminRouter } from "./router";
import { AuthProvider } from "./contexts";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <WebRouter/>
        <AdminRouter/>
      </BrowserRouter>
    </AuthProvider>
  )
}

