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
         const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
       const obj = {id:id,query:query,time:time,...data};
      
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
       const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
        const obj = {id:id,query:query,time:time,data:res.data.response};
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
       height:"100vh",
      
      }} className="">
<div className="h1animation" style={{
    height:"10vh",
  display:"flex",
  justifyContent:"center",
  alignItems:"center"
}}>

  <h1
    style={{
      background: "linear-gradient(90deg, #ff00ff, #00ffff)",
      WebkitBackgroundClip: "text", 
      WebkitTextFillColor: "transparent",
    
    }}
    className="text-2xl font-bold text-center mb-4"
  >
    Gemini Chat
  </h1>

</div>














      
          <div  style={{
            display:"flex",
            flexDirection:"column",
            "gap":"10px",
          height:"81vh",
            // border:"white",
            overflowY:"scroll",
            overflowX:"hidden"
          
            
            // backgroundColor:"white"
          }} className="mt-4 p-3 divanimation bg-gray-200 rounded-lg div-res">

{responsede.length > 0 ? responsede.map(data=>{ return data.imageUrl ?  <div key={data.id}>
<div  style={{"display":"flex",
  "justifyContent":"end",
    padding:"3px 20px"
}}>
<strong  className="question"  style={
{
"borderRadius":"10px",
  "backgroundColor":"#303030",
  "color":"white",
  "padding":"10px"
}
}

>{data.query}
<div style={{
  display:"flex",
  justifyContent:"end"
}}>
<span style={{
  fontSize:"11px",
  paddingTop:"5px"
}}>{data.time}</span>
</div>
</strong>
</div>
 <div style={{padding:"0px 20px",
 
}}>
  <div style={{
    display:"flex",
   position:"relative",
  width:"fit-content",
  height:"fit-content",

  }}>
  <img className="answer" loading="lazy"  src={data.imageUrl}  />


  <span style={{
    fontSize:".7rem",
    paddingTop:"5px",
    position:"absolute",
    bottom:"3px",
    left:"5px",
    color:"white"
  
  }}>{data.time}</span>
  </div>
 
</div>
</div>  : <div key={data.id}>
<div style={{"display":"flex",
  "justifyContent":"end",
  padding:"3px 20px",

}}>
<strong className="question"  style={
{
"borderRadius":"10px",
  "backgroundColor":"#303030",
  "color":"white",
  "padding":"5px",
  display:"flex",
  flexDirection:"column"
}
}

>{data.query}
<div style={{
  display:"flex",
  justifyContent:"end"
}}>
<span style={{
  fontSize:"11px",
  paddingTop:"5px"
}}>{data.time}</span>
</div>

</strong>
</div>
<div style={
  {
     padding:"3px 20px",
  }
}>
  <div className="answer" style={{
     "borderRadius":"10px",
     "backgroundColor":"#303030",
  }}>
  <strong  style={
  {
    "color":"white",
   
  }
}>{data.data}
<div style={{
  display:"flex",
  justifyContent:"end"
}}>
<span style={{
  fontSize:"11px",
  paddingTop:"5px"
}}>{data.time}</span>
</div>

</strong>
  </div>

</div>
</div> 
}) :<div>Ask me Anything</div>}
         </div>


         <div className="main" >
        <textarea
          className="w-full text p-3 border animMain border-gray-300 rounded-lg"
          rows="3"
          placeholder=" Ask Anything..."
          style={{marginBottom:0}}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        />
          <button
          className="btn animMainRight"
          onClick={handleGenerate}
          disabled={loading}
          style={{
            background:"linear-gradient(90deg, #ff00ff, #00ffff)"
          }}
        >
          {loading ? "generating..." : "Generate"}
        </button>
        </div>
      </div>
     

    </div>
  );
};

export default App;

