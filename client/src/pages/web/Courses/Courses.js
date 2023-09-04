import React, { useState, useEffect } from 'react';
import { Container, Image, Button } from 'semantic-ui-react';
import { Course as CourseCard } from '../../../componentes/Web/Courses';
import { Course } from '../../../api';
import { map } from 'lodash';
import { image } from '../../../assets';
import './Courses.scss';

const courseController = new Course();

export function Courses() {
  const [courses, setCourses] = useState(null);
  const [pagination, setPagination] = useState(null)
  const [page, setPage] = useState(1);
  const isCurrenPageIsLast = pagination?.page === pagination?.pages;

  useEffect(() => {
    (async () => {
      try {
        const result = await courseController.getCourses({ page, limit: 3 });
        setCourses((prevState) => (!courses ? result.docs : [...prevState, ...result.docs]));
        setPagination({
          page: result.page,
          pages: result.pages,
        });
      } catch (error) {
        console.error(error);
      }
    })();
  }, [page])

  const onChangePage = () => {
    setPage(page === pagination.pages ? page : page + 1)
  }

  return (
    <Container className='courses-page'>
      <Image src={image.academicLogo} />
      <h2>
        En la web vas a encontrar los mejores cursos online de programación en
        Español. Unete a nosotros y empieza tu camino como programador frontend
        o backend
      </h2>

      <div className='courses'>
        {map(courses, (course) => (
          <div key={course._id} className='courses__item'>
            <CourseCard course={course} />
          </div>
        ))}
      </div>

      { !isCurrenPageIsLast && (
        <div className='more'>
          <Button primary onClick={onChangePage} >
            Cargar más...
          </Button>

        </div>
      )}

    </Container>
  )
}
