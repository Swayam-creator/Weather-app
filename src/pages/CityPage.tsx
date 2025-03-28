import CurrentWeather from "@/components/current-weather";
import HourlyTemperature from "@/components/hourly-temperature";
import WeatherSkeleton from "@/components/loading-skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import WeatherDetails from "@/components/weather-details";
import WeatherForecast from "@/components/weather-forecast";
import { useForecastQuery, useWeatherQuery } from "@/hooks/use-weather";
import { AlertCircle} from "lucide-react";
import { useParams, useSearchParams } from "react-router"

const CityPage = () => {
  const [searchParams]=useSearchParams();
  const params=useParams();
  console.log(params)
  const lat=parseFloat(searchParams.get("lat")||"0");
  const lon=parseFloat(searchParams.get("lon")||"0");
  const coordinates ={lat,lon};
  const weatherQuery=useWeatherQuery(coordinates);
  const forecastQuery=useForecastQuery(coordinates);
  if(weatherQuery.error || forecastQuery.error  ){
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle> Error</AlertTitle>
      <AlertDescription className="flex flex-col gap-4" >
        <p>Failed to fetch weather data</p>
        {/* <Button  onClick={handleRefresh} variant={"outline"} className="w-fit"  >
          <RefreshCw className=" mr-2 h-4 w-4" />
          retry
        </Button> */}
      </AlertDescription>
    </Alert>
  }
  if(!weatherQuery.data || !forecastQuery.data||!params.id){
    return <WeatherSkeleton/>
  }
  return (
    <div className="space-y-4">
      <div className="flex justify-between  items-center " >
        <h1 className="text-3xl font-bold tracking-tight font-['UtBoldOnsedemoregular']" >{params.id}, &nbsp; {weatherQuery.data.sys.country}</h1>
        
          
      </div>
      {/* Hourly Data */}
      <div className="grid gap-6" >
        <div className="flex flex-col gap-5">
          <CurrentWeather
           data={weatherQuery.data}
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

export default CityPage
