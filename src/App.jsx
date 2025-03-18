import React, { useState,useEffect } from "react";
import axios from "axios";
import Image from "./components/Image";
const App = () => {
  const [query, setQuery] = useState("");
  const [responsede, setResponsede] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
  const data =  localStorage.getItem('items');
  if(data){
    const parsedata = JSON.parse(data);
    setResponsede(parsedata);
  }
  else{
    setResponsede([]); 
  }
  }, [])
  useEffect(() => {
    if(responsede.length > 0)
    {
      localStorage.setItem('items',JSON.stringify(responsede));
    }

  }, [responsede])
  
  const handleGenerate = async () => {
    if (!query) return alert("Please enter a query!");
    const words = query.toLowerCase().split(' '); // Split into words
const keywords = ["image", "generate", "create","images"]; // Define keywords to match
const isMatched = words.some(word => keywords.includes(word));
    setLoading(true);
      if(isMatched){
        try {
          const response = await fetch('https://geminichatbackend.vercel.app/generate-image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({prompt: query })
          })
          const data = await response.json();
          const id = Math.random();
          const obj = {id:id,query:query,...data};
      
          setResponsede(initial=>[...initial,obj]);
           setQuery('');
          console.log(data);
        } catch (error) {
          console.error('Error:', error);
        }
      setLoading(false);
      }
    else{

      try{
        const res = await axios.post("https://geminichatbackend.vercel.app/ask", { query });
        setQuery("");
        const id = Math.random();
        const obj = {id:id,query:query,data:res.data.response};
        setResponsede(arr=>[...arr,obj]);
      }
 catch (error) {
        setResponsede("Error fetching response!");
      }
      setLoading(false);
    }
  };
 return (
    <div style={{border:"white",
      height:"100vh",
    }} className="">
      <div style={{
       height:"90vh",
      
      }} className="">
       <center style={{
        border:"white",
       }}>
       <h1 style={{color:"white",
     padding:"20px 0"
      
       }} className="text-2xl font-bold text-center mb-4">Gemini Chat</h1>
        </center> 
      
          <div style={{
            display:"flex",
            flexDirection:"column",
            "gap":"10px",
          height:"75vh",
            // border:"white",
            overflowY:"scroll",
          
            
            // backgroundColor:"white"
          }} className="mt-4 p-3 bg-gray-200 rounded-lg div-res">

{responsede.length > 0 ? responsede.map(data=>{ return data.imageUrl ?  <div key={data.id}>
<div style={{"display":"flex",
  "justifyContent":"end",
    padding:"3px 20px"
}}>
<strong  style={
{
"borderRadius":"10px",
  "backgroundColor":"#303030",
  "color":"white",
  "padding":"10px"
}
}

>{data.query}</strong>
</div>
<div style={{padding:"0px 20px"}}><img  src={data.imageUrl} />

</div>
</div>  : <div key={data.id}>
<div style={{"display":"flex",
  "justifyContent":"end",
    padding:"3px 20px"
}}>
<strong  style={
{
"borderRadius":"10px",
  "backgroundColor":"#303030",
  "color":"white",
  "padding":"10px"
}
}

>{data.query}</strong>
</div>
<div style={
  {
     padding:"3px 20px"
  }
}>
<strong style={
  {
    "color":"white",
  }
}>{data.data}</strong>
</div>
</div> 
}) :<div>Ask me Anything</div>}
         </div>
      </div>
      <div className="main" >
        <textarea
          className="w-full text p-3 border border-gray-300 rounded-lg"
          rows="3"
          placeholder=" Ask Anything..."
          style={{marginBottom:0}}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        />
          <button
          className="btn"
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate"}
        </button>
        </div>
      <center>
      {/* <Image setResponsede = {setResponsede}/> */}
        </center> 

    </div>
  );
};

export default App;

 
