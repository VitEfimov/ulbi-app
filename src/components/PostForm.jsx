import React, { useState } from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/buttons/MyButton";

const PostForm = ({ create }) => {
    const [post, setPost] = useState({ title: '', body: '' });
    // const bodyInputRef = useRef();
    const addNewPost = (e) => {
        e.preventDefault();
        const newPost = {
            
            ...post,id: Date.now()
        }
        // setPosts([...posts, {...post, id: Date.now()}]);
        create(newPost);
        setPost({ title: '', body: '' });
    }
    return (
        <form>
            {/* Управляемый компонент */}
            <MyInput
                value={post.title}
                onChange={e => setPost({ ...post, title: e.target.value })}
                type="text"
                placeholder="Posts name" />
            {/* <input ref={bodyInputRef} type="text"/> */}
            {/* Не управляемый компонент  
        <MyInput
         ref={bodyInputRef}
         type="text" 
         placeholder="Posts description" /> */}

            <MyInput
                value={post.body}
                onChange={e => setPost({ ...post, body: e.target.value })}
                type="text"
                placeholder="Posts description" />

            <MyButton onClick={addNewPost}>Create new post</MyButton>
        </form>
    )
}

export default PostForm;