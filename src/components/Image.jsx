import React, { useState } from 'react';

function Image({setResponsede}) {
  const [image, setImage] = useState('');
  const [prompt, setPrompt] = useState('');

  const generateImage = async () => {
    try {
      const response = await fetch('https://geminichatbackend.vercel.app/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      
      const data = await response.json();
      setImage(data.imageUrl);
      setResponsede(initial=>[...initial,data]);
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <textarea
        value={prompt}
        className='text'
        rows={5}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter prompt"
      />
      <button className='btn' onClick={generateImage}>Generate</button>
      
     
    </div>
  );
}

export default Image;
