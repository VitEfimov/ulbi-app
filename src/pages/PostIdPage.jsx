import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetching } from "../hooks/useFetching";
import PostService from "../API/PostService";
import Loader from "../components/UI/loader/Loader";

const PostIdPage = () => {
    const params = useParams();

    const [post, setPost] = useState({});
    const [comment, setComment] = useState([]);


    const [fetchPostById, isLoading, error] = useFetching(async (id) => {
        const response = await PostService.getById(id);
        setPost(response.data);
    })

    const [fetchCommentById, isComLoading, errorComment] = useFetching(async (id) => {
        const response = await PostService.getCommentById(id);
        setComment(response.data);
    })

    useEffect(() => {
        fetchPostById(params.id);
        fetchCommentById(params.id);

    }, [])

    return (
        <div>
            <h1>
                Post page with ID = {params.id}</h1>
            {isLoading
                ? <Loader />
                : <div>{post.id}.{post.title}</div>
            }
            <h1>
                Comments
            </h1>
            {isComLoading
                ? <Loader />
                : <div>
                    {comment.map(comm => 
                    <div key={comm.id} style={{marginTop: '15px'}}>
                        <h3>{comm.email}</h3>
                        <div>{comm.body}</div>
                    </div>)
                    }
                    </div>
            }
        </div>

    )
}

export default PostIdPage;