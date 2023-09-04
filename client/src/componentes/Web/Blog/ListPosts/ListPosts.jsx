import React, { useEffect, useState } from 'react';
import { Blog } from '../../../../api';
import { Loader, Pagination} from 'semantic-ui-react';
import { map } from "lodash";
import { ListPostItem } from "../ListPostItem";
import './ListPosts.scss';

const blogController = new Blog();

export function ListPosts() {
    const [blogs, setBlogs] = useState(null);
    console.log(blogs);

    useEffect(() => {
        (async () => {
            try {
                const response = await blogController.getPosts(1);
                setBlogs(response.docs);
            } catch (error) {
                console.error(error);
            }
        })();
    }, [])

    if (!blogs) { return <Loader active inline='centered'/> }

    return (
        <div className='list-posts-web'>
            <div className='list'>
                {map(blogs, (post)=> (
                    <ListPostItem className='item' post={post} />
                ))}
            </div>
            <div className='pagination'>
                    <Pagination 
                        totalPages={10}
                        defaultActivePage={1}
                        ellipsisItem={null}
                        firstItem={null}
                        lastItem={null}
                        secondary
                        pointing
                    />
            </div>
        </div>
    )
}
