"use client";

import { useTabs } from "./TabsProvider";

const FlightListTitle = () => {
  const { title } = useTabs();

  return (
    <h2 className="text-balance text-xl font-semibold text-gray-900">
      {title}
    </h2>
  );
};

export default FlightListTitle;
