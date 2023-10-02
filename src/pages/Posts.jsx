import React, { useState, useEffect, useRef } from "react";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import Loader from "../components/UI/loader/Loader";
import PostFilter from "../components/PostFilter";
import MyModal from "../components/UI/myModal/MyModal";
import MyButton from "../components/UI/buttons/MyButton";
import { usePosts } from "../hooks/usePosts";
import PostService from "../API/PostService";
import { useFetching } from "../hooks/useFetching";
import { getPageCount, getPagesArray } from "../utils/pages";
import Pagination from "../components/UI/pagination/Pagination";
import { useObserver } from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";

const Posts = () => {

    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({ sort: '', query: '' });
    const [modal, setModal] = useState(false);
    //custom hook
    const sortedAndSerchedPosts = usePosts(posts, filter.sort, filter.query);

    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const lastElement = useRef();


    // HW: {useMemo} whenchanging countPages
    // let pagesArray = getPagesArray(totalPages);

    const [fetchPosts, isPostLoading, postError] = useFetching(
        async (limit, page) => {
            const response = await PostService.getAll(limit, page);
            setPosts([...posts, ...response.data]);
            const totalCount = response.headers['x-total-count'];
            setTotalPages(getPageCount(totalCount, limit));
        });
    // console.log(pagesArray);

    useObserver(lastElement, page < totalPages, isPostLoading, () => {
        setPage(page + 1);
    })

    useEffect(() => {
        fetchPosts(limit, page);
    }, [page, limit]);

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
        setModal(false);
    };

    const changePage = (page) => {
        setPage(page);
        // fetchPost(limit, page);
    }


    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }
    return (
        <div className="App">
            <MyButton style={{ marginTop: '30px' }} onClick={() => setModal(true)}>
                Create new post
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost} />
            </MyModal>
            <hr style={{ margin: '15px 0' }} />

            <PostFilter
                filter={filter}
                setFilter={setFilter} />


            <MySelect
            value={limit}
            onChange={value => setLimit(value)}
            defaultValue="Amount of elements"
            options={[
                {value: 5, name: '5'},
                {value: 10, name: '10'},
                {value: 25, name: '25'},
                {value: -1, name: 'All'}
            ]}
            
            
            />

            
            {postError &&
                <h1 style={{ textAlign: 'center' }}>Loading ${postError}!</h1>}
            <PostList remove={removePost} posts={sortedAndSerchedPosts} title='List of posts JS' />
            <div ref={lastElement} style={{ height: 20, background: 'red' }} />
            {isPostLoading &&
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}><Loader /></div>
            }
            <Pagination
                page={page}
                changePage={changePage}
                totalPages={totalPages}
            />



        </div>
    );


}

export default Posts;
