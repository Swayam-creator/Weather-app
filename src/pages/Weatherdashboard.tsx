import CurrentWeather from "@/components/current-weather";
import HourlyTemperature from "@/components/hourly-temperature";
import WeatherSkeleton from "@/components/loading-skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import WeatherDetails from "@/components/weather-details";
import WeatherForecast from "@/components/weather-forecast";
import { useGeolocation } from "@/hooks/use-geolocation"
import { useForecastQuery, useReverseGeocodeQuery, useWeatherQuery } from "@/hooks/use-weather";
import {  AlertCircle, MapPin, RefreshCw } from "lucide-react"

const Weatherdashboard = () => {
  const {coordinates,error:locationError,getLocation,isloading:locationLoading}=useGeolocation();
  console.log(coordinates);
 
  
  const weatherQuery=useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);
  const locationQuery=useReverseGeocodeQuery(coordinates);
  console.log(weatherQuery)
  console.log(forecastQuery)
  console.log(locationQuery)
  const handleRefresh=()=>{
    getLocation();
    if(coordinates){
       weatherQuery.refetch();
       forecastQuery.refetch();
       locationQuery.refetch();
    }
  };
  if(locationLoading){
    return <WeatherSkeleton/>;
  }
  if(locationError){
  return (  <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Location Error</AlertTitle>
      <AlertDescription className="flex flex-col gap-4" >
        <p>{locationError}</p>
        <Button  onClick={getLocation} variant={"outline"} className="w-fit"  >
          <MapPin className=" mr-2 h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>)
  }
  if(!coordinates){
    return (  <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Location Required</AlertTitle>
      <AlertDescription className="flex flex-col gap-4" >
        <p>Please enable location access to see your local weather.</p>
        <Button  onClick={getLocation} variant={"outline"} className="w-fit"  >
          <MapPin className=" mr-2 h-4 w-4" />
          Enable Location
        </Button>
      </AlertDescription>
    </Alert>);
  }
  const locationName=locationQuery.data?.[0];
  if(weatherQuery.error || forecastQuery.error){
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle> Error</AlertTitle>
      <AlertDescription className="flex flex-col gap-4" >
        <p>Failed to fetch weather data</p>
        <Button  onClick={handleRefresh} variant={"outline"} className="w-fit"  >
          <RefreshCw className=" mr-2 h-4 w-4" />
          retry
        </Button>
      </AlertDescription>
    </Alert>
  }
  if(!weatherQuery.data || !forecastQuery.data){
    return <WeatherSkeleton/>
  }
  return (
    // favorite Cities
    <div className="space-y-4">
      <div className="flex justify-between  items-center " >
        <h1 className="text-2xl font-bold tracking-tight font-['UtBoldOnsedemoregular']" >My Location</h1>
        <Button variant="destructive"
         size={"icon"}
         onClick={handleRefresh}
         disabled={weatherQuery.isFetching || forecastQuery.isFetching}
        >
          <RefreshCw className={`h-4 w-4 ${weatherQuery.isFetching ? "animate-spin":""}`} />
        </Button>
      </div>
      {/* Hourly Data */}
      <div className="grid gap-6" >
        <div className="flex flex-col lg:flex-row gap-5">
          <CurrentWeather
           data={weatherQuery.data}
           locationName={locationName}
          />
          {/* current weather */}
          <HourlyTemperature 
         data={forecastQuery.data}
          />
          {/* ḥourly temperature */}
          
        </div>
        <div className="grid grid-cols-2 gap-2" >
          {/* details */}
          <WeatherDetails data={weatherQuery.data}   />
          {/* forecast */}
          <WeatherForecast data={forecastQuery.data} />
        </div>

      </div>
    </div>
  )
}

export default Weatherdashboard
