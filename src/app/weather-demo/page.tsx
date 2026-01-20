import { TokyoWeatherTime } from "@/components/tokyo-weather-time";

export default async function WeatherDemo() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="space-y-4 text-center">
        <h1 className="text-2xl font-bold">Tokyo Weather & Time</h1>
        <div className="rounded-lg border p-4">
          <TokyoWeatherTime />
        </div>
        <p className="text-muted-foreground text-sm">
          Data cached for 5 minutes • Time updates on each page load
        </p>
      </div>
    </div>
  );
}
