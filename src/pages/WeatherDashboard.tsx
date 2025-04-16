import React, { useState, useEffect } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Container, 
  Alert,
  Paper,
  Slide,
  CircularProgress,
  Tabs,
  Tab
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { getWeatherByCoordinates, getWeatherByCity, WeatherData } from '../services/weatherService';
import WeatherCard from '../components/WeatherCard';
import CityInfo from '../components/CityInfo';
import SearchIcon from '@mui/icons-material/Search';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import DirectionsIcon from '@mui/icons-material/Directions';

const StyledContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
  padding: theme.spacing(4),
}));

const SearchPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
  borderRadius: '20px',
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  width: '100%',
  maxWidth: '600px',
}));

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: '10px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
});

const StyledButton = styled(Button)({
  borderRadius: '10px',
  padding: '10px 20px',
  textTransform: 'none',
  fontWeight: 'bold',
});

const WeatherDashboard: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [searchCity, setSearchCity] = useState('');
  const [destinationCity, setDestinationCity] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    getCurrentLocationWeather();
  }, []);

  const getCurrentLocationWeather = () => {
    setLoading(true);
    setError(null);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const data = await getWeatherByCoordinates(
              position.coords.latitude,
              position.coords.longitude
            );
            setWeatherData(data);
            setError(null);
          } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          setError('Please enable location access to get weather for your current location');
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchCity.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const data = await getWeatherByCity(searchCity);
      setWeatherData(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <StyledContainer>
      <Slide direction="down" in={true} timeout={1000}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom 
          sx={{ 
            mb: 4,
            color: '#2c3e50',
            fontWeight: 'bold',
            textAlign: 'center',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)'
          }}
        >
          Weather Dashboard
        </Typography>
      </Slide>

      <SearchPaper elevation={3}>
        <Box component="form" onSubmit={handleSearch} sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <StyledTextField
              fullWidth
              label="Search City"
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              variant="outlined"
              disabled={loading}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'action.active' }} />,
              }}
            />
            <StyledButton 
              type="submit" 
              variant="contained" 
              color="primary"
              disabled={loading}
              startIcon={<SearchIcon />}
            >
              Search
            </StyledButton>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <StyledButton
            fullWidth
            variant="outlined"
            onClick={getCurrentLocationWeather}
            disabled={loading}
            startIcon={<MyLocationIcon />}
          >
            Get Current Location Weather
          </StyledButton>
        </Box>

        {weatherData && (
          <Box sx={{ mb: 3 }}>
            <StyledTextField
              fullWidth
              label="Destination City"
              value={destinationCity}
              onChange={(e) => setDestinationCity(e.target.value)}
              variant="outlined"
              disabled={loading}
              InputProps={{
                startAdornment: <DirectionsIcon sx={{ mr: 1, color: 'action.active' }} />,
              }}
            />
          </Box>
        )}
      </SearchPaper>

      {error && (
        <Slide direction="up" in={true} timeout={500}>
          <Alert 
            severity="error" 
            sx={{ 
              mb: 3, 
              width: '100%',
              maxWidth: '600px',
              borderRadius: '10px'
            }}
          >
            {error}
          </Alert>
        </Slide>
      )}

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress size={60} />
        </Box>
      )}

      {weatherData && !loading && (
        <Box sx={{ width: '100%', maxWidth: '1200px' }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            centered
            sx={{ mb: 3 }}
          >
            <Tab label="Weather" />
            <Tab label="City Information" />
          </Tabs>

          {activeTab === 0 && (
            <Slide direction="up" in={true} timeout={1000}>
              <Box>
                <WeatherCard weatherData={weatherData} />
              </Box>
            </Slide>
          )}

          {activeTab === 1 && (
            <Slide direction="up" in={true} timeout={1000}>
              <Box>
                <CityInfo 
                  city={weatherData.name} 
                  weatherData={weatherData}
                  destinationCity={destinationCity}
                />
              </Box>
            </Slide>
          )}
        </Box>
      )}
    </StyledContainer>
  );
};

export default WeatherDashboard; 