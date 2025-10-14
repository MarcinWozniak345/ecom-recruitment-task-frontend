import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FootballerTable from './FootballerTable';
import CreateFootballer from './CreateFootballer';
import EditFootballer from './EditFootballer';
import ViewDetails from './ViewDetails';

function App() {
  return (
      <>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<FootballerTable />}></Route>
                  <Route path="/footballer/create" element={<CreateFootballer />}></Route>
                  <Route path="/footballer/edit/:guid" element={<EditFootballer />}></Route>
                  <Route path="/footballer/details/:guid" element={<ViewDetails />}></Route>
              </Routes>
          </BrowserRouter>
      <div>
      </div>
      
    </>
  )
}

export default App
