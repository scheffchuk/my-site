"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchTokyoWeatherTime } from "@/lib/weather-api";

export function TokyoWeatherTime() {
  const { data } = useQuery({
    queryKey: ["tokyo-weather-time"],
    queryFn: fetchTokyoWeatherTime,
    refetchInterval: 60000,
    staleTime: 60000,
    gcTime: 900000,
  });

  if (!data)
    return (
      <div className="text-accent-chrome-muted text-sm opacity-50">
        Loading weather...
      </div>
    );

  return (
    <div className="text-accent-chrome-muted text-sm">
      {data.city} · {data.temperature}°C · {data.time}
    </div>
  );
}
