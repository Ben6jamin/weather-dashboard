import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Card, 
  CardContent, 
  CardMedia,
  Button,
  CircularProgress,
  Rating,
  Grid
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { GoogleMap, LoadScript, DirectionsRenderer, Marker } from '@react-google-maps/api';
import axios from 'axios';

const UNSPLASH_API_KEY = process.env.REACT_APP_UNSPLASH_API_KEY;
const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  borderRadius: '20px',
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
}));

const StyledCard = styled(Card)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '15px',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
});

interface CityInfoProps {
  city: string;
  weatherData: any;
  destinationCity?: string;
}

interface Place {
  name: string;
  rating: number;
  vicinity: string;
  photos?: string[];
}

const CityInfo: React.FC<CityInfoProps> = ({ city, weatherData, destinationCity }) => {
  const [cityPhotos, setCityPhotos] = useState<string[]>([]);
  const [restaurants, setRestaurants] = useState<Place[]>([]);
  const [hotels, setHotels] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [directions, setDirections] = useState<any>(null);
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    const fetchCityData = async () => {
      try {
        // Fetch city photos from Unsplash
        const photosResponse = await axios.get(
          `https://api.unsplash.com/search/photos?query=${city}&client_id=${UNSPLASH_API_KEY}&per_page=5`
        );
        setCityPhotos(photosResponse.data.results.map((photo: any) => photo.urls.regular));

        // Set map center based on weather data
        if (weatherData?.coord) {
          setMapCenter({
            lat: weatherData.coord.lat,
            lng: weatherData.coord.lon
          });
        }

        // Fetch nearby restaurants and hotels using Google Places API
        if (weatherData?.coord) {
          const placesResponse = await axios.get(
            `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${weatherData.coord.lat},${weatherData.coord.lon}&radius=5000&type=restaurant&key=${GOOGLE_MAPS_API_KEY}`
          );
          setRestaurants(placesResponse.data.results);

          const hotelsResponse = await axios.get(
            `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${weatherData.coord.lat},${weatherData.coord.lon}&radius=5000&type=lodging&key=${GOOGLE_MAPS_API_KEY}`
          );
          setHotels(hotelsResponse.data.results);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching city data:', error);
        setLoading(false);
      }
    };

    fetchCityData();
  }, [city, weatherData]);

  useEffect(() => {
    if (destinationCity && weatherData?.coord) {
      // Calculate directions between cities
      const directionsService = new google.maps.DirectionsService();
      directionsService.route(
        {
          origin: { lat: weatherData.coord.lat, lng: weatherData.coord.lon },
          destination: destinationCity,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            setDirections(result);
          }
        }
      );
    }
  }, [destinationCity, weatherData]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <StyledPaper>
        <Typography variant="h5" gutterBottom>
          {city} Photos
        </Typography>
        <Grid container spacing={2}>
          {cityPhotos.map((photo, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <StyledCard>
                <CardMedia
                  component="img"
                  height="200"
                  image={photo}
                  alt={`${city} photo ${index + 1}`}
                />
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </StyledPaper>

      <StyledPaper>
        <Typography variant="h5" gutterBottom>
          Map
        </Typography>
        <Box height="400px" width="100%">
          <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY || ''}>
            <GoogleMap
              mapContainerStyle={{ width: '100%', height: '100%' }}
              center={mapCenter}
              zoom={12}
            >
              {directions && <DirectionsRenderer directions={directions} />}
              <Marker position={mapCenter} />
            </GoogleMap>
          </LoadScript>
        </Box>
      </StyledPaper>

      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <StyledPaper>
              <Typography variant="h5" gutterBottom>
                Restaurants
              </Typography>
              <Grid container spacing={2}>
                {restaurants.slice(0, 3).map((restaurant, index) => (
                  <Grid item xs={12} key={index}>
                    <StyledCard>
                      <CardContent>
                        <Typography variant="h6">{restaurant.name}</Typography>
                        <Rating value={restaurant.rating} readOnly precision={0.5} />
                        <Typography variant="body2" color="text.secondary">
                          {restaurant.vicinity}
                        </Typography>
                      </CardContent>
                    </StyledCard>
                  </Grid>
                ))}
              </Grid>
            </StyledPaper>
          </Grid>
          <Grid item xs={12} md={6}>
            <StyledPaper>
              <Typography variant="h5" gutterBottom>
                Hotels
              </Typography>
              <Grid container spacing={2}>
                {hotels.slice(0, 3).map((hotel, index) => (
                  <Grid item xs={12} key={index}>
                    <StyledCard>
                      <CardContent>
                        <Typography variant="h6">{hotel.name}</Typography>
                        <Rating value={hotel.rating} readOnly precision={0.5} />
                        <Typography variant="body2" color="text.secondary">
                          {hotel.vicinity}
                        </Typography>
                      </CardContent>
                    </StyledCard>
                  </Grid>
                ))}
              </Grid>
            </StyledPaper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CityInfo; 