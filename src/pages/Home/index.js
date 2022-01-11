import { useEffect, useState } from 'react';
import { supabase } from '../../services/client'

const App = () => {

  const [posts, setPosts] = useState([])
  const [post, setPost] = useState({ title: '', context: '' })
  const { title, context } = post
  const [editPostState, setEditPostState] = useState(null)


 const cancelEditPost = () => {
  setEditPostState(null)
  setPost({ title: '', context: '' })
 }

  const fetchPosts = async () => {

    try {
      const { data: posts, error } = await supabase
      .from('posts').select().order('id', { ascending: false })
      
      setPosts(posts)
  
      if(error){
        console.log('Error:', error)
        return
      }
      
    } catch (error) {
      console.log({error})
    }

  
  }

  const createPost = async (e) => {
    e.preventDefault();
    console.log('funcou')

    if(editPostState){
      const { data, error } = await supabase.from('posts')
      .update({ title: title, context: context })
      .eq("id", post.id);

      
      const dataIndex = posts.findIndex(item => item.id === data[0].id)
      
      posts[dataIndex].title = title
      posts[dataIndex].context = context
      setPosts(posts)
      setEditPostState(null)
      setPost({ title: '', context: '' })
     
      if(error){
        console.log('Error:', error)
        return
      }
      
      return
   }

    try {
      const { data, error } = await supabase.from('posts').insert([
        {title, context}
      ]).single()
  
      
      setPost({ title: '', context: '' })
      setPosts([data, ...posts])
  
      if(error){
        console.log('Error:', error)
        return
      }
      
    } catch (error) {
      console.log({error})
    }
    
   
  }

  const deletePost = async (id) => {

    try {
      const { data, error } = await supabase.from('posts').delete().match({'id': id})
      
      const dataDelete = posts.filter(item => item.id !== data[0].id )
  
      setPosts(dataDelete)
  
      if(error){
        console.log('Error:', error)
        return
      }
      
    } catch (error) {
      console.log({error})
    }
    
  }

  const editPost = (post) => {
    setPost(post)
    setEditPostState(post)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div className="App">
      
      <div className='container mx-auto'>
        <div className='mx-4'>

        <div className='flex items-center mt-20 mb-6'>
           <h1 className='text-4xl font-bold '>{editPostState ? 'Editar' : 'Criar'} Post</h1>
            {editPostState && (
               <button onClick={cancelEditPost} class="btn ml-4">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 mr-2 stroke-current">   
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>                       
               </svg>
                   cancelar edição  
             </button> 
            )}
        </div>
           
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
              {editPostState ? (
                 <button className="mt-4 btn btn-accent">Editar</button> 
              ) : (
                  <button className="mt-4 btn btn-accent">Salvar</button> 
              )}
            </form>

              {posts.map(post => (
                <div className="my-10 shadow card shadow-gray-300" key={post.id}>
                  <div className="card-body">
                    <h2 className="card-title">{post.title}</h2> 
                    <p>{post.context}</p>
                  </div>
                  <div className='flex mb-2'>
                    <button onClick={() => editPost(post)} className="mx-2 text-xs btn btn-neutral btn-sm">Editar</button> 
                    <button onClick={() => deletePost(post.id)} class="btn text-xs btn-neutral btn-sm mx-2">Excluir</button>
                  </div>
                </div>   
              ))}
                            
        </div>

      </div>
    </div>
  );
}

export default App;
