const FlightListTableBodySkeleton = () => {
  return (
    <tbody className="bg-white divide-y divide-gray-100">
      {Array.from({ length: 6 }).map((_, index) => (
        <tr key={index} className="rounded-lg shadow-md p-4 animate-pulse">
          <td className="h-16 px-4 py-3 rounded mb-2">
            <div className="h-4 bg-gray-200 rounded" />
          </td>
          <td className="h-16 px-4 py-3 rounded mb-2">
            <div className="h-4 bg-gray-200 rounded" />
          </td>
          <td className="h-16 px-4 py-3 rounded mb-2">
            <div className="h-4 bg-gray-200 rounded" />
          </td>
          <td className="h-16 px-4 py-3 rounded mb-2">
            <div className="h-4 bg-gray-200 rounded" />
          </td>
          <td className="h-16 px-4 py-3 rounded mb-2">
            <div className="h-4 bg-gray-200 rounded" />
          </td>
          <td className="h-16 px-4 py-3 rounded mb-2">
            <div className="h-4 bg-gray-200 rounded" />
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default FlightListTableBodySkeleton;
