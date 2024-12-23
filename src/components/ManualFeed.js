import React, { useState } from 'react';
import axios from 'axios';
import './ManualFeed.css';
import config from './config';

function ManualFeed() {
    const [sentence, setSentence] = useState('');
    const [result, setResult] = useState(null);

    const handleInputChange = (e) => {
        setSentence(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post(config.apiUrl+'analyze', { text: sentence }, {
                headers: {
                    'X-API-KEY': config.apiKey  // Replace with your actual API key
                }
            });
            setResult(response.data.sentiment);
        } catch (error) {
            console.error('Error analyzing sentence:', error);
        }
    };

    const getEmoji = (sentiment) => {
        if (sentiment.compound > 0) return '😊';
        if (sentiment.compound < 0) return '😢';
        return '😐';
    };

    const getEmotion = (sentiment) => {
        if (sentiment.compound > 0) return 'Positive';
        if (sentiment.compound < 0) return 'Negative';
        return 'Neutral';
    };

    return (
        <div className="manual-feed">
            <h1>Analyze Sentence </h1>
            <textarea value={sentence} onChange={handleInputChange} placeholder="Enter a sentence..." />
            <button onClick={handleSubmit}>Submit</button>
            {result && (
                <div className="result">
                    <h2>Sentiment Analysis Result</h2>
                    <p>Emotion: {getEmotion(result)} {getEmoji(result)}</p>
                </div>
            )}
        </div>
    );
}

export default ManualFeed;
