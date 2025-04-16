import React from 'react';
import { Card, CardContent, Typography, Box, Fade, Grow } from '@mui/material';
import { WeatherData } from '../services/weatherService';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  margin: '20px auto',
  background: 'linear-gradient(135deg, #00b4db, #0083b0)',
  color: 'white',
  borderRadius: '20px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.18)',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const WeatherIcon = styled('img')({
  width: '100px',
  height: '100px',
  filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))',
  animation: 'float 3s ease-in-out infinite',
  '@keyframes float': {
    '0%': { transform: 'translateY(0px)' },
    '50%': { transform: 'translateY(-10px)' },
    '100%': { transform: 'translateY(0px)' },
  },
});

const TemperatureText = styled(Typography)({
  fontSize: '3.5rem',
  fontWeight: 'bold',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
});

const WeatherDescription = styled(Typography)({
  fontSize: '1.2rem',
  textTransform: 'capitalize',
  marginTop: '10px',
});

const DetailBox = styled(Box)({
  display: 'flex',
  justifyContent: 'space-around',
  marginTop: '20px',
  padding: '15px',
  background: 'rgba(255, 255, 255, 0.1)',
  borderRadius: '15px',
  backdropFilter: 'blur(5px)',
});

interface WeatherCardProps {
  weatherData: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData }) => {
  const getBackgroundColor = (temp: number) => {
    if (temp < 10) return '#00b4db';
    if (temp < 20) return '#0083b0';
    if (temp < 30) return '#ff9a44';
    return '#ff6b6b';
  };

  return (
    <Fade in={true} timeout={1000}>
      <StyledCard sx={{ background: `linear-gradient(135deg, ${getBackgroundColor(weatherData.main.temp)}, #0083b0)` }}>
        <CardContent>
          <Grow in={true} timeout={1500}>
            <Typography variant="h4" component="div" sx={{ textAlign: 'center', mb: 2 }}>
              {weatherData.name}, {weatherData.sys.country}
            </Typography>
          </Grow>
          
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', my: 2 }}>
            <WeatherIcon
              src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt={weatherData.weather[0].description}
            />
            <TemperatureText>
              {Math.round(weatherData.main.temp)}°C
            </TemperatureText>
          </Box>

          <WeatherDescription align="center">
            {weatherData.weather[0].description}
          </WeatherDescription>

          <DetailBox>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Humidity
              </Typography>
              <Typography variant="body1">
                {weatherData.main.humidity}%
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Pressure
              </Typography>
              <Typography variant="body1">
                {weatherData.main.pressure} hPa
              </Typography>
            </Box>
          </DetailBox>
        </CardContent>
      </StyledCard>
    </Fade>
  );
};

export default WeatherCard; 