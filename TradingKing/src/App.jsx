import StockDetails from "./pages/StockDetails"
import {BrowserRouter , Route, Routes} from "react-router-dom"
import StockOverview from "./pages/StockOverview"
import AppContext from "./context/AppContext"


const App=()=>{
  return (
    <main className="container">
      <AppContext>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<StockOverview/>} />
            <Route path="/detail/:symbol" element={<StockDetails/>}></Route>
          </Routes>
        </BrowserRouter>
      </AppContext>
    </main>
  )
}

export default App
