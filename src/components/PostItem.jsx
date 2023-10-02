import React from 'react';
import MyButton from './UI/buttons/MyButton';
import { useNavigate } from 'react-router-dom';

const PostItem = (props) => {
    // console.log(props);
    const router = useNavigate();
    // console.log(router);

    return (
        <div className="post">
            <div className="post__content">
                <strong>{props.post.id}. {props.post.title}</strong>
                <div>
                    {props.post.body}
                </div>

            </div>
            <div className="post__btns">
                <MyButton onClick={() => router(`/posts/${props.post.id}`)}>
                    Open
                </MyButton>
                <MyButton onClick={() => props.remove(props.post)}>
                    Delete
                </MyButton>
            </div>
        </div>
    )
}
// router.replace('/path') меняем на router('/path', {replace: true})
// Если вы хотите использовать state, используйте router('/path', { state: { name:'Xyz' }})

export default PostItem;