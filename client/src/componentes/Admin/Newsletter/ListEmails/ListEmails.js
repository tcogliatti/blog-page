import React, { useState, useEffect } from 'react';
import { EmailItem } from "../EmailItem";
import { Newsletter } from "../../../../api";
import { Loader, Pagination } from "semantic-ui-react";
import { size, map } from "lodash";
import { useAuth } from "../../../../hooks";
import "./ListEmails.scss";

const newsletterController = new Newsletter();

export function ListEmails() {
    const { accessToken } = useAuth();
    const [pagination, setPagination] = useState(null);
    const [page, setPage] = useState(1);
    const [emails, setEmails] = useState(null);
    const [reload, setReload] = useState(false)

    const onReload = () => setReload((prevState) => !prevState);

    useEffect(() => {
        (async () => {
            try {
                const response = await newsletterController.getNewesletter(accessToken, page);
                setEmails(response.docs);
                setPagination({
                    limit: response.limit,
                    page: response.page,
                    pages: response.pages,
                    total: response.total,
                });
                console.log(emails);
            } catch (error) {
                console.error(error);
            }
        })();
    }, [page, reload]);


    const changePage = (_,data) => {
       setPage(data.activePage);
    }

    if (!emails) return <Loader active inline="centered" />;
    if (size(emails) === 0) return "No hay ningun correo electrónico";

    return (
        <div className='list-item'>
            {map(emails, (email) => (
                <EmailItem key={email._id} email={email} onReload={onReload} />
            ))}
            <div className='list-emails__pagination'>
                <Pagination 
                    totalPages={pagination.pages}
                    defaultActivePage={pagination.page}
                    ellipsisItem={false}
                    firstItem={false}
                    lastItem={false}
                    onPageChange={changePage}
                />
            </div>
        </div>
    )
}
