require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/student-profile', async (req, res) => {
    try {
        const response = await axios.get('https://ams.mitsgwalior.in/api/api/v1/auth/student/me', {
            headers: {
                'Authorization': `Bearer ${process.env.MITS_BEARER_TOKEN.trim()}`,
                'Accept': 'application/json, text/plain, */*',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Origin': 'https://ams.mitsgwalior.in',
                'Referer': 'https://ams.mitsgwalior.in/student/dashboard'
            }
        });
        
        res.json(response.data);
    } catch (error) {
        console.error('API Error Details:', error.response?.status, error.response?.data || error.message);
        res.status(error.response?.status || 500).json({
            error: 'Failed to retrieve data from MITS portal.',
            details: error.response?.data || error.message
        });
    }
});

app.listen(process.env.PORT || 5000, () => {
    console.log(`Backend server running on http://localhost:${process.env.PORT || 5000}`);
});
// Endpoint to fetch your enrolled courses & attendance
app.get('/api/student-courses', async (req, res) => {
    try {
        const response = await axios.get('https://ams.mitsgwalior.in/api/api/v1/student/eligible-courses', {
            headers: {
                'Authorization': `Bearer ${process.env.MITS_BEARER_TOKEN.trim()}`,
                'Accept': 'application/json, text/plain, */*',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
                'Origin': 'https://ams.mitsgwalior.in',
                'Referer': 'https://ams.mitsgwalior.in/student/dashboard'
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: 'Failed to fetch courses' });
    }
});
app.get('/api/dashboard-summary', async (req, res) => {
    try {
        const response = await axios.get('https://ams.mitsgwalior.in/api/api/v1/studentsite/dashboard', {
            headers: {
                'Authorization': `Bearer ${process.env.MITS_BEARER_TOKEN.trim()}`,
                'Accept': 'application/json, text/plain, */*',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
                'Origin': 'https://ams.mitsgwalior.in',
                'Referer': 'https://ams.mitsgwalior.in/student/dashboard'
            }
        });

        // Forwards the complete object (student, session, statistics, courses) directly
        res.json(response.data);
    } catch (error) {
        console.error('API Error:', error.response?.status, error.response?.data);
        res.status(error.response?.status || 500).json({
            error: 'Failed to retrieve dashboard data from MITS portal',
            details: error.response?.data || error.message
        });
    }
});