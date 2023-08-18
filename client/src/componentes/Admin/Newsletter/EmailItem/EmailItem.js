import React, { useState } from 'react';
import { Button, Icon, Confirm } from "semantic-ui-react";
import "./EmailItem.scss";
import { useAuth } from "../../../../hooks";
import { Newsletter } from "../../../../api";

const newsletterController = new Newsletter();

export function EmailItem(props) {
    const { email, onReload } = props;
    const { accessToken } = useAuth();

    const [showConfirm, setShowConfirm] = useState(false);

    const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState);

    const onDelete = async () => {
        try {
            await newsletterController.deleteNewesletter(accessToken, email._id);
            onReload();
            onOpenCloseConfirm();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <div className='newsletter-item'>
                <span>{email.email}</span>
                <Button icon color='red' onClick={onOpenCloseConfirm}>
                    <Icon name='trash' />
                </Button>
            </div>
            <Confirm 
                open={showConfirm}
                onCancel={onOpenCloseConfirm}
                onConfirm={onDelete}
                content={`Desea eliminar el correo ${email.email}?`}
                size='mini'
            />
        </>

    )
}
