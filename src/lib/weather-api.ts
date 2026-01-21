export interface TokyoWeatherData {
  city: string;
  temperature: number;
  time: string;
}

export async function fetchTokyoWeatherTime(): Promise<TokyoWeatherData> {
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

    // Generate current Tokyo time on client
    const currentTime = new Date().toLocaleTimeString("en-US", {
      timeZone: "Asia/Tokyo",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return {
      city: "Tokyo, Japan",
      temperature: weatherData.current_weather.temperature,
      time: currentTime,
    };
  } catch (error) {
    console.warn("Weather API failed", error);
    throw new Error("Failed to fetch Tokyo weather time");
  }
}
