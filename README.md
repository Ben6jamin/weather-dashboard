# Weather Dashboard

A modern, interactive weather dashboard application built with React and Material-UI. This application provides real-time weather information, city photos, nearby restaurants, hotels, and interactive maps for any location.

## 🚀 Live Demo

Check out the live application at: [Weather Dashboard](https://weather-dashboard-ashy-xi.vercel.app/)

## Features

- 🌤️ Real-time weather information
- 📸 City photos from Unsplash
- 🍽️ Nearby restaurants and hotels
- 🗺️ Interactive Google Maps integration
- 📱 Responsive design for all devices
- 🎨 Modern UI with Material-UI components

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm (v6 or higher)

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/weather-dashboard.git
   cd weather-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory with the following variables:
   ```
   REACT_APP_WEATHER_API_KEY=your_weather_api_key
   REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   REACT_APP_UNSPLASH_API_KEY=your_unsplash_api_key
   ```

   You'll need to obtain API keys from:
   - [OpenWeatherMap](https://openweathermap.org/api) for weather data
   - [Google Maps Platform](https://developers.google.com/maps) for maps and places
   - [Unsplash](https://unsplash.com/developers) for city photos

4. **Start the development server**
   ```bash
   npm start
   ```

   The application will be available at [http://localhost:3000](http://localhost:3000)

## Project Structure

```
weather-dashboard/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── CityInfo.tsx
│   │   ├── WeatherCard.tsx
│   │   └── ...
│   ├── pages/
│   │   └── WeatherDashboard.tsx
│   ├── App.tsx
│   ├── index.tsx
│   └── ...
├── .env
├── package.json
└── README.md
```

## Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from Create React App

## Technologies Used

- React 18
- TypeScript
- Material-UI v5
- Google Maps API
- Unsplash API
- OpenWeatherMap API
- Axios for API requests

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues or have questions, please open an issue in the GitHub repository.
