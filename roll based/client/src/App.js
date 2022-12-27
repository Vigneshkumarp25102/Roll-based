import {BrowserRouter, Route,Routes } from 'react-router-dom';
import {Login_Form} from './components/Login_Form';
import {Registration_Form} from './components/Registration_Form';
import {Dashboard} from './components/Dashboard';
import {Update} from './components/update';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
           <Route path='/' element={<Login_Form/>}></Route> 
          <Route path='/Registration_Form' element={<Registration_Form/>}></Route>
          <Route path='/Dashboard/:Id' element={<Dashboard/>}></Route>
          <Route path='/Update/:Id' element={<Update/>}></Route>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
