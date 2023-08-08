import "./styles.css";
import ReactFileReader from 'react-file-reader';
import { useState } from "react";
export default function App() {
const [image,setimage]=useState(null)
 const handleFiles = (files) => {
   
    setimage(files.base64)
    
  }
   console.log(image)
 
  return (
    <div className="App">
     <ReactFileReader fileTypes={[".PNG",".jpeg",".png",'.jpg']} base64={true} multipleFiles={false} handleFiles={handleFiles}>
  <button className='btn'>Upload</button>
</ReactFileReader>


  {image &&<img src={image} alt="alt"/>} 
    </div>
  );
}
