import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Alert,
  CircularProgress,
} from '@mui/material';
import { urlAPI } from '../services/api';

const URLAnalyzer: React.FC = () => {
  const [formData, setFormData] = useState({
    url: '',
    question: '',
  });
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResult(null);
    setLoading(true);

    try {
      const data = await urlAPI.analyzeUrl(formData.url, formData.question);
      setResult(data.answer);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography component="h1" variant="h4" align="center" gutterBottom>
            URL Content Analyzer
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="url"
              label="URL to Analyze"
              name="url"
              placeholder="https://example.com"
              value={formData.url}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="question"
              label="Your Question"
              name="question"
              multiline
              rows={3}
              placeholder="What would you like to know about this URL's content?"
              value={formData.question}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? 'Analyzing...' : 'Analyze URL'}
            </Button>
          </form>

          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <CircularProgress />
            </Box>
          )}

          {result && (
            <Paper elevation={2} sx={{ p: 3, mt: 3, bgcolor: 'grey.50' }}>
              <Typography variant="h6" gutterBottom>
                Analysis Result
              </Typography>
              <Typography variant="body1" component="div" sx={{ whiteSpace: 'pre-wrap' }}>
                {result}
              </Typography>
            </Paper>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default URLAnalyzer; 