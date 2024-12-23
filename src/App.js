import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import FileUpload from './components/FileUpload';
import ManualFeed from './components/ManualFeed';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <div className="main-content">
                    <Routes>
                        <Route path="/upload" element={<FileUpload />} />
                        <Route path="/manual" element={<ManualFeed />} />
                        <Route path="/" element={<Home />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

function Home() {
    return (
        <div className="home">
            <h1 style={{color:'#333'}}>Welcome to the Sentiment Analysis Portal</h1>
            <p>Choose an option from the navigation sidebar to get started.</p>
        </div>
    );
}

export default App;
