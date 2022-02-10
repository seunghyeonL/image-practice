//import { useState } from 'react';
import axios from 'axios';

function App() {
  // const [img, setImage] = useState(null);
  const formData = new FormData();

  const onSubmit = (e) => {    
    e.preventDefault();
    console.dir(e.target[0])
    formData.append('image', e.target[0].files[0]);
    axios.post('http://localhost:8080',
      formData,
      { 'content-type' : 'multipart/form-data' }      
      )
  };


  return (
    <form /* method='post' action='http://localhost:8080' encType='multipart/form-data' */ onSubmit={onSubmit }>
      <input type="file" name='image' accept='image/*'/>
      <button type='submit'>전송</button>
    </form>
  );
}

export default App;
