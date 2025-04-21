import {Routes, Route} from 'react-router-dom';
import {LoginPage, RegisterPage, DashboardPage, MovementsPage} from '../pages';
import {ProtectedLayout} from '../components';

const AppRouter = () => {
  return (
    
        <Routes>
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage/>} />    
          <Route element={<ProtectedLayout/>}>
            <Route path="/dashboard" element={<DashboardPage/>} />
            <Route path="/movements" element={<MovementsPage/>} />
          </Route>
        </Routes>
  )
}

export default AppRouter