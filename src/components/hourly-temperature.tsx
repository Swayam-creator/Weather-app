import { ForecastData } from "@/api/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ResponsiveContainer, XAxis, YAxis, LineChart, Line, Tooltip } from "recharts";
import { format } from "date-fns";

interface HourlyTemperatureProps {
  data: ForecastData;
}

const HourlyTemperature = ({ data }: HourlyTemperatureProps) => {
  const chartData = data.list.slice(0, 8).map((item) => ({
    time: format(new Date(item.dt * 1000), "ha"),
    temp: Math.round(item.main.temp),
    feels_like: Math.round(item.main.feels_like),
  }));

  return (
    <Card className="w-[55rem] h-[20rem]">
      <CardHeader>
        <CardTitle>Hourly Temperature</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis
                dataKey="time"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                dataKey="temp"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}°`}
              />
            <Tooltip 
             content={({active,payload})=>{
              if(active && payload && payload.length){
                return (
                  <div>
                    <div>
                      <div>
                        <span>Temperature</span>
                        <span>{payload[0].value}°</span>
                      </div>
                      <div>
                        <span>Feels Like</span>
                        <span>{payload[1].value}°</span>
                      </div>
                    </div>
                  </div>
                )
              }
                return null;
             } }
            />
              <Line type="monotone" dataKey="temp" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="feels_like" stroke="#3b82f6" strokeWidth={2} 
              strokeDasharray="5 5"
              />
             
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default HourlyTemperature;
