import React, { useState, useEffect } from 'react';
import { Course } from "../../../../api";
import { CourseItem } from "../CourseItem";
import "./ListCourses.scss";
import { size, map } from "lodash";
import { Loader, Pagination } from "semantic-ui-react";

const courseController = new Course();

export function ListCourses(props) {
    const { reload } = props;
    // paginación
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState();
    // obtener cursos
    const [courses, setCourses] = useState(false);
    useEffect(() => {
        (async () => {
            try {
                const response = await courseController.getCourses({ page, limit: 5 });
                setPagination({
                    limit: response.limit,
                    page: response.page,
                    pages: response.pages,
                    total: response.total,
                })
                setCourses(response.docs);
            } catch (error) {
                console.error(error);
            }
        })();
    }, [page, reload]);

    if (!courses)
        return <Loader active inline="centered" />;
    if (size(courses) === 0)
        return "No hay cursos cargados";

    const pageChange = (_, data) => {
        setPage(data.activePage);
    }

    return (
        <div className='list-courses'>
            {map(courses, (course) => (
                <CourseItem key={course._id} course={course} />
            ))}

            <div className='list-courses__pagination'>
                <Pagination
                    totalPages={pagination.pages}
                    defaultActivePage={pagination.page}
                    ellipsisItem={null}
                    firstItem={null}
                    lastItem={null}
                    onPageChange={pageChange}
                />
            </div>
        </div>
    )
}
