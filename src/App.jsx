import React, { use, useState } from 'react'
import './App.css'
import  "prismjs/themes/prism-tomorrow.css" 
import Editor from 'react-simple-code-editor'
import axios from 'axios'
import prism from "prismjs"
import rehypeHighlight from 'rehype-highlight'
import "highlight.js/styles/atom-one-dark.css"
import { useEffect } from 'react'
import Markdown from "react-markdown"

function App() {

const[code,setCode]= useState(`function sum() {
  return a + b;
}`);

const[review,setReview]= useState(``)



  useEffect(() => {
      prism.highlightAll()
  },[])



async function  reviewCode() {
 const response = await axios.post("http://localhost:3000/ai/get-review", {
  code: code
 })

  setReview(response.data);
  console.log(response.data);

}



  return (
  <>
   <main>
   <div className="left">
              <div className="code">
                <Editor
                  value={code}
                  onValueChange={code => setCode(code)}
                  highlight={code => prism.highlight(code, prism.languages.js, 'js')}
                  padding={10}
                  style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 12,
                    borderRadius: "5px",
                    color: "#abb2bf",
                    height:"100%",
                    width:"100%"
                  }}
                />
              </div>
              <div className="review-button"
              
              onClick={reviewCode}
              
              >Review</div>
     </div>
     <div className="right">
      <Markdown 

        rehypePlugins={[rehypeHighlight]} >
      {review}
      </Markdown>
     </div>
   </main>
  
  
  </>
  )
}


 







export default App;
