import React, { useState } from 'react';
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
import  useGetProfile from  "../utils/customHooks/useGetProfile"


function Reviewer() {
  
      useGetProfile();
  const [code, setCode] = useState(`function sum(a, b) {
  return a + b;
}`);
  
  const [review, setReview] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('code');


   
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
      const response = await axios.post("http://localhost:3000/ai/get-review", {
        code: code
      },{
        withCredentials:true
      });
        console.log(response.data.codeTitle);
      setReview(response.data.reviewCode);
    } catch (err) {
      setError('Failed to get review. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }
  


  return (
    <div className="reviewer">
      <header className="reviewer-header">
        <h1>
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
              <button 
                className={`tab ${activeTab === 'review' ? 'active' : ''}`}
                onClick={() => setActiveTab('review')}
                disabled={!review}
              >
                AI Review
              </button>
            </div>
          </div>

          {activeTab === 'code' ? (
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
          ) : (
            <div className="review-preview">
              <Markdown rehypePlugins={[rehypeHighlight]}>
                {review || 'Run a review to see AI feedback here'}
              </Markdown>
            </div>
          )}

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
            <h2>
              <FaRobot className="header-icon" /> 
              AI Code Analysis
            </h2>
            {review && (
              <div className="review-meta">
                {new Date().toLocaleString()}
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
            <Markdown rehypePlugins={[rehypeHighlight]}>
              {review}
            </Markdown>
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
    </div>
  );
}

export default Reviewer;