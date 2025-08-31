import type { Flight } from '../types/flight';

interface StatsProps {
  flights: Flight[];
}

export function Stats({ flights }: StatsProps) {
  const totalFlights = flights.length;
  const departures = flights.filter(flight => flight.CHAORD === 'D').length;
  const arrivals = flights.filter(flight => flight.CHAORD === 'A').length;
  const delayedFlights = flights.filter(flight => flight.CHRMINE.toLowerCase() === 'delayed').length;
  const cancelledFlights = flights.filter(flight => flight.CHRMINE.toLowerCase() === 'canceled').length;

  const stats = [
    { label: 'Total Flights', value: totalFlights, color: 'bg-blue-500' },
    { label: 'Departures', value: departures, color: 'bg-green-500' },
    { label: 'Arrivals', value: arrivals, color: 'bg-purple-500' },
    { label: 'Delayed', value: delayedFlights, color: 'bg-yellow-500' },
    { label: 'Cancelled', value: cancelledFlights, color: 'bg-red-500' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Flight Statistics</h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className={`w-12 h-12 rounded-full ${stat.color} flex items-center justify-center mx-auto mb-2`}>
              <span className="text-white font-bold text-lg">{stat.value}</span>
            </div>
            <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
} 