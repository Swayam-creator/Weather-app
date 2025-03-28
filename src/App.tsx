import { ThemeProvider } from './components/context/theme-provider';
import Layout from './components/layout';
import {BrowserRouter, Route, Routes} from 'react-router';
import Weatherdashboard from './pages/Weatherdashboard';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import CityPage from './pages/CityPage';
const queryClient=new QueryClient(
  {
    defaultOptions:{
      queries:{
        staleTime:5*60*1000,//5min
        gcTime:10*60*1000,//10 min
        retry:false,
        refetchOnWindowFocus:false,
      },
    },
  }
);

function App() { 
 return (
  <QueryClientProvider client={queryClient} >
    <BrowserRouter>
    <ThemeProvider defaultTheme='dark' >
   <Layout>
    <Routes>
      <Route path='/' element={<Weatherdashboard/>}/>
      <Route path='/city/:id' element={<CityPage/>} />
    </Routes>
   </Layout>
    </ThemeProvider>
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false}/>
  </QueryClientProvider>
  )
}

export default App
