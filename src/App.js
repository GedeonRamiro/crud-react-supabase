import { useEffect, useState } from 'react';
import { supabase } from './client'

const App = () => {

  const [posts, setPosts] = useState([])
  const [post, setPost] = useState({ title: '', context: '' })
  const { title, context } = post


  const fetchPosts = async () => {
    const { data } = await supabase.from('posts').select()
    setPosts(data)
  }

  const createPost = async (e) => {
    e.preventDefault()
    try {
      await supabase.from('posts').insert([
        {title, context}
      ]).single()
      setPost({ title: '', context: '' })
      fetchPosts()
    } catch (error) {
      console.log({error})
    }

  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div className="App">
      <div className='container mx-auto'>
        <div className='mx-4'>
            <h1 className='mt-20 mb-6 text-4xl font-bold'>Criar Post</h1>
            <form onSubmit={createPost} className="form-control">
              <label className="label">
                <span className="label-text">Título</span>
              </label> 
              <input 
                type="text" 
                placeholder="Título do post" 
                className="input input-accent input-bordered"
                value={title}
                onChange={e => setPost({...post, title: e.target.value})} 
              />
              <label className="label">
                <span className="label-text">Descrição</span>
              </label> 
              <textarea 
                className="h-24 textarea textarea-bordered textarea-accent" 
                placeholder="Descrição do post"
                value={context}
                onChange={e => setPost({...post, context: e.target.value})}
              />
              <button className="mt-4 btn btn-accent">Salvar</button> 
            </form>

              {posts.map(post => (
                <div className="my-10 shadow card shadow-green-300" key={post.id}>
                  <div className="card-body">
                    <h2 className="card-title">{post.title}</h2> 
                    <p>{post.context}</p>
                  </div>
                </div>   
              ))}
        </div>

      </div>
    </div>
  );
}

export default App;
