async function getTokyoWeather() {
  try {
    const weatherResponse = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=35.6762&longitude=139.6503&current_weather=true&temperature_unit=celsius",
    );

    if (!weatherResponse.ok) {
      throw new Error(
        `Weather API responded with status: ${weatherResponse.status}`,
      );
    }

    const weatherData = await weatherResponse.json();

    return {
      city: "Tokyo, Japan",
      temperature: weatherData.current_weather.temperature,
      time: weatherData.current_weather.time.toLocaleTimeString("en-US", {
        timeZone: "Asia/Tokyo",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    };
  } catch (error) {
    console.warn("Weather API failed", error);
    return null;
  }
}

export async function TokyoWeatherTime() {
  const data = await getTokyoWeather();

  if (!data) {
    return null;
  }

  return (
    <div className="text-accent text-sm">
      {data.city} · {data.temperature}°C · {data.time}
    </div>
  );
}
