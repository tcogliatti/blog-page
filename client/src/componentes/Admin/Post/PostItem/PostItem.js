import React, { useState } from 'react';
import { Button, Icon, Confirm } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { BasicModal } from '../../../Shared';
import { FormPost } from '../FormPost';
import { useAuth } from '../../../../hooks';
import { Blog } from '../../../../api';
import './PostItem.scss';

const blogController = new Blog();

export function PostItem(props) {
    const { accessToken } = useAuth();
    const { post, onReload } = props;
    const [showModal, setShowModal] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
    const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState);

    const onDelete = async () => {
        try {
            await blogController.deletePost(accessToken, post._id);
            onReload();
            onOpenCloseConfirm();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className='post-item'>
                <div className='post-item__info'>
                    <span className='post-item__info-title'>{post.title}</span>
                    <span className='post-item__info-path'>{post.path}</span>
                </div>

                <div>
                    <Button as={Link} icon to={`/blog/${post.path}`} target="_blank">
                        <Icon name='eye' />
                    </Button>
                    <Button icon primary onClick={onOpenCloseModal}>
                        <Icon name='pencil' />
                    </Button>
                    <Button icon color='red' onClick={onOpenCloseConfirm}>
                        <Icon name='trash' />
                    </Button>
                </div>
            </div>

            <BasicModal
                show={showModal}
                close={onOpenCloseModal}
                title={`Editar post ${post.title}`}
                size='large'
            >
                <FormPost
                    close={onOpenCloseModal}
                    onReload={onReload}
                    post={post}
                />
            </BasicModal>
            <Confirm
                open={showConfirm}
                onCancel={onOpenCloseConfirm}
                onConfirm={onDelete}
                content={`Eliminar el curso ${post.title}`}
                size="mini"
            />
        </>
    )
}
