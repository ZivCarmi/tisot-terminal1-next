# Terminal 1 Flights - Ben Gurion Airport

A real-time flight information website for Terminal 1 at Ben Gurion Airport, Israel. This application displays departure and arrival information for flights operating from Terminal 1, using data from the Israeli government's open flight API.

## Features

- **Real-time Flight Data**: Fetches flight information from the Israeli government CSV API
- **Terminal 1 Filtering**: Automatically filters flights to show only Terminal 1 operations
- **Departures & Arrivals**: Separate pages for departures and arrivals
- **Responsive Design**: Modern, mobile-friendly interface
- **Auto-refresh**: Data updates every 15 minutes
- **Error Handling**: Graceful error handling with retry mechanisms

## Technology Stack

- **React 18** with TypeScript
- **Next.js** for SEO optimization
- **Tailwind CSS** for styling
- **Modern ES6+** features

## Project Structure

```
src/
├── api/           # API functions for data fetching
├── app/           # Router folder based
├── components/    # React components
├── i18n/          # Internationalization related code
├── types/         # TypeScript type definitions
├── utils/         # Utility functions
└── App.tsx        # Main application component
```

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd tisot-terminal-1
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

## Data Source

The application fetches flight data from the Israeli government's open data API:

- **CSV Endpoint**: https://data.gov.il/dataset/flydata/resource/e83f763b-b7d7-479e-b172-ae981ddc6de5/download/datafile.csv
- **Data Source**: https://data.gov.il/dataset/flydata
- **Update Frequency**: Every 15 minutes

## Features in Detail

### Flight Information Display

- Flight number and airline
- Origin and destination
- Scheduled and actual times
- Flight status (Scheduled, Delayed, Canceled, etc.)
- Gate and check-in information
- Delay information when applicable

### Filtering Options

- **Departures**: Outbound flights from Terminal 1
- **Arrivals**: Inbound flights to Terminal 1

### Statistics Dashboard

- Flights data update every 15 minutes

## Development

### Adding New Features

1. **New API Functions**: Add to `src/api/`
2. **New Hooks**: Add to `src/hooks/`
3. **New Components**: Add to `src/components/`
4. **New Types**: Add to `src/types/`

### Code Organization

- **API Layer**: Pure data fetching functions
- **Component Layer**: Reusable UI components
- **Type Safety**: Comprehensive TypeScript types

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

For questions or issues, please open an issue on the GitHub repository.
