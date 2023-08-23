import React from 'react';
import { Container } from 'semantic-ui-react';
import { TopBar, Footer } from '../../componentes/Web';
import './ClientLayout.scss';

export function ClientLayout(props) {
  const { children } = props;
  const currentYear = new Date().getFullYear();

  return (
    <div className='client-layout'>
      <div className='client-layout__header'>
        <TopBar />
      </div>

      {children}

      <div className='client-layout__footer'>
        <Container>
          <Footer.Info />
          <Footer.Menu />
          <Footer.Newsletter />
        </Container>
        <Container>
          <span>® All Rigths Reserved {currentYear}</span>
          <span>Tomás Cogliatti | FullStack Developer</span>
        </Container>
      </div>
    </div>
  )
}
