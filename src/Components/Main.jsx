import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../Home.css'
import { useSelector } from 'react-redux'


const Main = () => {

 const user = useSelector((store)=> store?.user);



    const navigate = useNavigate();
      const [terminalHistory, setTerminalHistory] = useState([
        'Welcome to CodeCraft AI Terminal',
        'Type "review" command or click "Start Reviewing" to begin',
        ''
      ]);
      const [command, setCommand] = useState('');
      const [isProcessing, setIsProcessing] = useState(false);
      const [focusInput, setFocusInput] = useState(false);

      const handleCommandSubmit = (e) => {
        e.preventDefault();
        if (!command.trim()) return;
    
        const newHistory = [...terminalHistory, `$ ${command}`];
        setTerminalHistory(newHistory);
        setIsProcessing(true);
        
        // Simulate processing
        setTimeout(() => {
          let response = '';
          if (command.includes('review')) {
            response = 'Initializing code review session...\nRedirecting to review interface.';
            setTimeout(() => navigate('/login',{ replace: true }), 1500);
          } else {
            response = `Command not recognized: ${command}\nTry "review" to start code analysis`;
          }
          setTerminalHistory([...newHistory, response, '']);
          setCommand('');
          setIsProcessing(false);
        }, 800);
      };
    
      const clearTerminal = () => {
        setTerminalHistory([
          'Terminal cleared',
          'Type "review" or click "Start Reviewing" to begin',
          ''
        ]);
      };


  return (
    <div>
          <main className="main-content">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-text">
            <h2>
              <span className="gradient-text">AI-Powered Code Reviews</span>
              <br />
              with Integrated Terminal
            </h2>
            <p>
              Get instant feedback on your code with our intelligent analysis system.
               Debug  your code directly in your browser.
            </p>
            <div className="hero-buttons">
              <button className="primary-btn" onClick={() => {
                document.getElementById('terminal').scrollIntoView();
                 setFocusInput(true);
              }
              }>
                Try Terminal
              </button>
              <button className="secondary-btn" onClick={

                () => {

                 if(user.name){
                  console.log(user);
                  navigate("/review",{ replace: true })
                 }
                 else{
                  navigate("/login",{ replace: true })
                 }



                }
                
                
                
                }>
                Start Reviewing
              </button>
            </div>
          </div>
          <div className="hero-code">
            <div className="code-editor">
              <div className="editor-header">
                <div className="window-controls">
                  <span className="control red"></span>
                  <span className="control yellow"></span>
                  <span className="control green"></span>
                </div>
                <span className="file-name">example.js</span>
              </div>
              <pre className="code-content">
                <code>
                  <span className="keyword">function</span> <span className="function">analyzeCode</span>(code) {'{\n'}
                  {'  '}<span className="keyword">const</span> issues = [];{'\n'}
                  {'  '}<span className="comment">// AI analysis happens here</span>{'\n'}
                  {'  '}<span className="keyword">return</span> issues.map(issue {'=>'} {'{\n'}
                  {'    '}<span className="keyword">return</span> {'{\n'}
                  {'      '}type: issue.type,{'\n'}
                  {'      '}message: issue.message,{'\n'}
                  {'      '}line: issue.line{'\n'}
                  {'    };\n'}
                  {'  });\n'}
                  {'}'}
                </code>
              </pre>
            </div>
          </div>
        </section>

        {/* Terminal Section */}
        <section className="terminal-section" id="terminal">
          <div className="section-header">
            <h2>Interactive Development Terminal</h2>
            <p>Run commands and get instant AI feedback on your code</p>
          </div>
          <div className="terminal-container">
            <div className="terminal">
              <div className="terminal-header">
                <div className="terminal-tabs">
                  <button className="tab active">bash</button>
                  <button className="tab">node</button>
                  <button className="tab">review</button>
                </div>
                <button className="clear-btn" onClick={clearTerminal}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
              <div className="terminal-content">
                {terminalHistory.map((line, index) => (
                  <div key={index} className={`terminal-line ${line.startsWith('$') ? 'command' : ''}`}>
                    {line.startsWith('$') ? (
                      <>
                        <span className="prompt">user@codecraft:~$</span>
                        <span>{line.substring(2)}</span>
                      </>
                    ) : (
                      <span>{line}</span>
                    )}
                  </div>
                ))}
                <form onSubmit={handleCommandSubmit} className="terminal-input">
                  <span className="prompt">user@codecraft:~$</span>
                  <input
                    type="text"
                    value={command}
                    onChange={(e) => setCommand(e.target.value)}
                    disabled={isProcessing}
                    autoFocus={focusInput}
                  />
                  {isProcessing && <span className="processing-animation"></span>}
                </form>
              </div>
            </div>
          </div>
        </section>
       </main>

      
    </div>
  )
}

export default Main;
