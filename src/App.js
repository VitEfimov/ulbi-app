import React, { useState, useEffect } from "react";
import './styles/App.css'
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import Loader from "./components/UI/loader/Loader";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/myModal/MyModal";
import MyButton from "./components/UI/buttons/MyButton";
import { usePosts } from "./hooks/usePosts";
import PostService from "./API/PostService";
import { useFetching } from "./hooks/useFetching";

function App() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: '', query: '' })
  const [modal, setModal] = useState(false);
  //custom hook
  const sortedAndSerchedPosts = usePosts(posts, filter.sort, filter.query)
  const [fetchPost, isPostLoading,postError] = useFetching(
    async () => {
      const posts = await PostService.getAll();
          setPosts(posts);
  })

  useEffect(() => {
    fetchPost();
  }, []);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
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
          {postError &&
          <h1 style={{textAlign:'center'}}>Loading ${postError}!</h1>}
      {isPostLoading
      ? <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader /></div>
    :<PostList remove={removePost} posts={sortedAndSerchedPosts} title='List of posts JS' />}

      
    </div>
  );
}

export default App;
