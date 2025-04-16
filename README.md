# Weather Dashboard

A modern weather dashboard application built with React and TypeScript that allows users to view weather information for their current location or search for weather in different cities.

## Features

- Get weather information for current location using GPS
- Search for weather in any city
- Display current temperature, humidity, and pressure
- Modern and responsive UI using Material-UI

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenWeatherMap API key

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your OpenWeatherMap API key:
   ```
   REACT_APP_WEATHER_API_KEY=your_api_key_here
   ```
4. Start the development server:
   ```bash
   npm start
   ```

## Usage

1. The application will automatically request your location to show weather for your current position
2. You can also search for weather in any city using the search bar
3. Click the "Get Current Location Weather" button to refresh weather for your current location

## API

This application uses the [OpenWeatherMap API](https://openweathermap.org/api) to fetch weather data.

## License

MIT
