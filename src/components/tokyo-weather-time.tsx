"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchTokyoWeatherTime } from "@/lib/weather-api";

export function TokyoWeatherTime() {
  const { data } = useQuery({
    queryKey: ["tokyo-weather-time"],
    queryFn: fetchTokyoWeatherTime,
    refetchInterval: 60000, // Update every minute
    staleTime: 60000, // Consider data stale after 1 minute
    gcTime: 900000, // Keep in cache for 15 minutes (15 * 60 * 1000)
  });

  if (!data) {
    return null;
  }

  return (
    <div className="text-accent text-sm">
      {data.city} · {data.temperature}°C · {data.time}
    </div>
  );
}
