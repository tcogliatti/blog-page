import React from 'react';
import './Courses.scss';

export function Courses(props) {
    const { course } = props;
    const { title, content } = course;
    return (
        <div className='course'>
            <p>Courses Component</p>
        </div>
    )
}
