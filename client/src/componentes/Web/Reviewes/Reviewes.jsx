import React from 'react';
import { Container, Image } from 'semantic-ui-react';
import { map } from 'lodash';
import { reviewsData } from './Reviewes.data';
import './Reviewes.scss';

export function Reviewes() {
    return (
        <Container className='reviewes'>
            <h2>Forma parte de los 150 mil estudiantes</h2>
            <div className='reviewes__list'>
                {map(reviewsData, (item, index) => (
                    <div key={index}>
                        <p>{item.comment}</p>
                        <div className='reviewes__list-user'>
                            <Image src={item.avatar} avatar />
                            <div>
                                <span>{item.userName}</span>
                                <span>{item.userType}</span>
                            </div>

                        </div>
                    </div>
                ))}

            </div>
        </Container>
    );
}
