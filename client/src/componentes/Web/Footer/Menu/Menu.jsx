import React from 'react';
import { Grid, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './Menu.scss';

export function Menu() {
    return (
        <div className='footer-menu'>
            <h4>Navegación</h4>
            <Grid columns={2}>
                <Grid.Column>
                    <Link to='#'>
                         <Icon name='book' /> Cursos Online
                    </Link> 
                    <Link to='#'>
                         <Icon name='code' /> Desarrollo Web
                    </Link> 
                    <Link to='#'>
                         <Icon name='database' /> Bases de Datos
                    </Link> 
                    <Link to='#'>
                         <Icon name='code' /> UX/UI
                    </Link> 
                </Grid.Column>
                <Grid.Column>
                    <Link to='#'>
                         <Icon name='server' /> Sistemas/Servidores
                    </Link> 
                    <Link to='#'>
                         <Icon name='cogs' /> CMS
                    </Link> 
                    <Link to='#'>
                         <Icon name='user outline' /> Portfolio
                    </Link> 
                    <Link to='#'>
                         <Icon name='python' /> Backend
                    </Link> 
                </Grid.Column>
            </Grid>
        </div>
    )
}
