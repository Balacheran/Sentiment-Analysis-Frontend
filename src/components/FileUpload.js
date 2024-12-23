import React, { useState } from 'react';
import axios from 'axios';
import { FiUpload } from 'react-icons/fi';  // Import the upload icon from react-icons
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import './FileUpload.css';
import config from './config';

function FileUpload() {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('No file chosen');
    const [data, setData] = useState([]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post(config.apiUrl+'upload_csv', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-API-KEY': config.apiKey  // Replace with your actual API key
                }
            });
            setData(response.data.results);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const sentimentData = data.map(item => ({
        id: item.id,
        text: item.text,
        timestamp: item.timestamp,
        compound: item.sentiment.compound,
        neg: item.sentiment.neg,
        neu: item.sentiment.neu,
        pos: item.sentiment.pos
    }));

    const averageSentiments = {
        compound: sentimentData.reduce((acc, item) => acc + item.compound, 0) / sentimentData.length,
        negative: sentimentData.reduce((acc, item) => acc + item.neg, 0) / sentimentData.length,
        neutral: sentimentData.reduce((acc, item) => acc + item.neu, 0) / sentimentData.length,
        positive: sentimentData.reduce((acc, item) => acc + item.pos, 0) / sentimentData.length,
    };

    const sentimentDistribution = [
        { name: 'Positive', value: sentimentData.filter(item => item.compound > 0).length },
        { name: 'Neutral', value: sentimentData.filter(item => item.compound === 0).length },
        { name: 'Negative', value: sentimentData.filter(item => item.compound < 0).length },
    ];

    return (
        <div className="file-upload">
            <h1>File Upload</h1>
            <div className="input-section">
                <label htmlFor="file-upload" className="custom-file-upload">
                    <FiUpload className="upload-icon" /> Choose File
                </label>
                <input id="file-upload" type="file" onChange={handleFileChange} />
                <span className="file-name">{fileName}</span>
                <button onClick={handleUpload} className="upload-btn">
                    {/* <FiUpload className="upload-icon" /> */}
                    Upload and Analyze
                </button>
            </div>
            <div className="chart-container">
                {data.length > 0 && (
                    <>
                        <div className="chart">
                            <h2>Sentiment Distribution</h2>
                            <PieChart width={400} height={400}>
                                <Pie
                                    data={sentimentDistribution}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    fill="#8884d8"
                                >
                                    {sentimentDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.name === 'Positive' ? "#0075A4" : entry.name === 'Neutral' ? "#72ADCF" : "#BFE8FF"} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </div>

                        <div className="chart">
                            <h2>Sentiment Over Time</h2>
                            <LineChart width={600} height={300} data={sentimentData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="timestamp" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="compound" stroke="#8884d8" />
                            </LineChart>
                        </div>

                        <div className="chart">
                            <h2>Average Sentiment Scores</h2>
                            <BarChart width={600} height={300} data={[averageSentiments]}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="compound" fill="#FF8DA1" />
                                <Bar dataKey="negative" fill="#FFA896" />
                                <Bar dataKey="neutral" fill="#88BDF2" />
                                <Bar dataKey="positive" fill="#68BA7F" />
                            </BarChart>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default FileUpload;
