import React from 'react';
import { Button, Image, Rating } from 'semantic-ui-react';
import { ENV } from '../../../../utils';
import './Course.scss';

export function Course(props) {
    const { course } = props;
    const { title, description, miniature, url, price, score } = course;
    return (
        <div className='course'>
            <Image src={`${ENV.BASE_PATH}/${miniature}`}/>
            <div className='course__info'>
                <h3>{title}</h3>
                <p>{description}</p>
                <Button as='a' href={url} primary fluid>
                    Entrar en el Curso de {title}
                </Button>
                <div className='course__info-footer'>
                    <span>$ {price}</span>
                    <Rating 
                        icon='star'
                        defaultRating={score}
                        maxRating={5}
                        disabled
                    />
                </div>
            </div>

        </div>
    )
}
