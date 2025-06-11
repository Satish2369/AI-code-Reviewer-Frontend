import  { useState } from 'react';
import '../App.css';
import "prismjs/themes/prism-tomorrow.css";
import Editor from 'react-simple-code-editor';
import axios from 'axios';
import prism from "prismjs";
import rehypeHighlight from 'rehype-highlight';
import "highlight.js/styles/atom-one-dark.css";
import { useEffect } from 'react';
import Markdown from "react-markdown";
import { FaCode, FaRobot, FaSpinner } from 'react-icons/fa';
import { BASE_URL } from '../utils/Constant';
import { ToastContainer,toast } from 'react-toastify';
import downloadGif from "../assets/icons8-download.gif";
import { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';






function Reviewer() {
  const [code, setCode] = useState(`function sum(a, b) {
  return a + b;
}`);
  
  const [review, setReview] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('code');

  const reviewRef = useRef();

  
  useEffect(() => {
    prism.highlightAll();
  }, [code, review]);



  async function reviewCode() {
    if (!code.trim()) {
      setError('Please enter some code to review');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.post(BASE_URL + "/ai/get-review", {
        code: code
      },{
        withCredentials:true
      });
        // console.log(response.data.codeTitle);
      setReview(response.data.reviewCode);
    } catch (err) {
      setError('Failed to get review. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }
  const copyReviewToClipboard = async () => {
  try {
    if (review) {
      await navigator.clipboard.writeText(review);
      toast.success("Review copied to clipboard!");
    } else {
      toast.warn("⚠️ Nothing to copy!");
    }
  } catch (err) {
    toast.warn("Failed to copy.");
    console.error(err);
  }
};



 const downloadPdf = async () => {
  const original = reviewRef.current;
  if (!original) return;

  
  const clone = original.cloneNode(true);


  clone.style.backgroundColor = "#0d1117";
  clone.style.color = "#ffffff";
  clone.style.padding = "2.5vw";
  clone.style.width = "794px";
  clone.style.height = "1123px";


  clone.style.position = "absolute";
  clone.style.top = "-9999px";
  document.body.appendChild(clone);


  const canvas = await html2canvas(clone);
  const imgData = canvas.toDataURL('image/png');

  const pdf = new jsPDF('p', 'mm', 'a4');
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  pdf.save('ai-review.pdf');


  document.body.removeChild(clone);

  toast.success("Review file is downloading");
};



  

  return (
    <div className="reviewer">
      <header className="reviewer-header">
        <h1 style={{color:"#4fc3f7"}}>
          <FaCode className="header-icon" /> 
          AI Code Reviewer
        </h1>
        <p>Get instant feedback on your code quality and best practices</p>
      </header>

      <main>
        <div className="left">
          <div className="editor-header">
            <div className="tabs">
              <button 
                className={`tab ${activeTab === 'code' ? 'active' : ''}`}
                onClick={() => setActiveTab('code')}
              >
                Your Code
              </button>
             
            </div>
          </div>

          
            <div className="code">
              <Editor
                value={code}
                onValueChange={code => setCode(code)}
                highlight={code => prism.highlight(code, prism.languages.js, 'js')}
                padding={20}
                style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: 14,
                  color: "#abb2bf",
                  height: "100%",
                  width: "100%",
                  background: "var(--code-bg)"
                }}
              />
            </div>
          

          <div className="controls">
            <button 
              className="review-button"
              onClick={reviewCode}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <FaSpinner className="spin" /> Analyzing...
                </>
              ) : (
                <>
                  <FaRobot /> Review Code
                </>
              )}
            </button>
            {error && <div className="error-message">{error}</div>}
          </div>
        </div>

        <div className="right">
          <div className="review-header">
            <h2  style={{color:"#4fc3f7"}}>
              <FaRobot className="header-icon" /> 
              AI Code Analysis
            </h2> 
            {review && (

              <div className='extra-options'> 




               <div className="download-icon"  style={{ cursor: "pointer" }}   onClick={downloadPdf}>
                   <img
                    src={downloadGif}
                    alt="download-icon"
                    style={{ height: "2vw", width: "2vw" }}
                 />
               </div>


                <div className="copy-icon" onClick={copyReviewToClipboard} style={{ cursor: "pointer" }}>
                   <img
                    src="https://img.icons8.com/?size=100&id=32540&format=png&color=000000"
                    alt="copy-icon"
                    style={{ height: "2vw", width: "2vw" }}
                 />
               </div>

                   

                 <div className="review-meta">
                   {new Date().toLocaleString()}
                 </div>

               </div>

            )}
          </div>

          {isLoading ? (
            <div className="loading-state">
              <FaSpinner className="spin" />
              <p>Analyzing your code...</p>
              <p className="hint">This usually takes 10-30 seconds</p>
            </div>
          ) : review ? (
           <div ref={reviewRef}>
               <Markdown rehypePlugins={[rehypeHighlight]}>
               {review}
               </Markdown>
          </div>
          ) : (
            <div className="empty-state">
              <div className="robot-icon">
                <FaRobot />
              </div>
              <h3>No Review Yet</h3>
              <p>Click "Review Code" to get AI feedback on your code</p>
              <div className="tips">
                <h4>Tips for best results:</h4>
                <ul>
                  <li>Keep functions under 20 lines</li>
                  <li>Include clear comments</li>
                  <li>Show complete examples</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </main>
   <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
}
export default Reviewer;