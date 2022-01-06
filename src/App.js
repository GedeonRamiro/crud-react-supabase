import { useEffect, useState } from 'react';
import { supabase } from './client'

const App = () => {

  const [posts, setPosts] = useState([])
  const [post, setPost] = useState({ title: '', context: '' })
  const { tilte, context } = post

  console.log(posts)

  const fetchPosts = async () => {
    const { data } = await supabase.from('posts').select()
    setPosts(data)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div className="App">
      <div className='container mx-auto'>
      <div class="form-control">
  <label class="label">
    <span class="label-text">Primary</span>
  </label> 
  <input type="text" placeholder="username" class="input input-primary input-bordered" />
</div> 
<div class="form-control">
  <label class="label">
    <span class="label-text">Secondary</span>
  </label> 
  <input type="text" placeholder="username" class="input input-secondary input-bordered" />
</div> 
<div class="form-control">
  <label class="label">
    <span class="label-text">Accent</span>
  </label> 
  <input type="text" placeholder="username" class="input input-accent input-bordered" />
</div>
<button class="btn btn-primary">primary</button> 

      </div>
    </div>
  );
}

export default App;
