import React, { useState, useEffect } from 'react';
import { Container, Image, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { map } from 'lodash';
import { Course } from '../../../api';
import { ENV } from '../../../utils';
// import { } from '';
import './HomeCourses.scss';

const courseController = new Course();

export function HomeCourses() {
    const [courses, setCourses] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const response = await courseController.getCourses({ limit: 6 });
                setCourses(response.docs);
            } catch (error) {
                console.error(error);
            }
        })()
    }, [])


    return (
        <Container className='home-courses'>
            <h2>Aprende y mejora tus habilidades</h2>
            <div className='home-courses__all-courses'>
                {map(courses, (item)=> (
                    <a key={item._id} href={item.url} target='_blank'>
                        <Image src={`${ENV.BASE_PATH}/${item.miniature}`} />
                        <div>
                            <span>{item.title}</span>
                            <span>{item.description}</span>
                        </div>
                    </a>
                ))}
            </div>

            <div className='home-courses__more'>
                <Button as={Link} to='/courses' primary>
                    Ver mas <span><Icon name='arrow right'></Icon></span>
                    
                </Button>
            </div>
        </Container>
    )
}
