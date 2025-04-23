import './App.css';
import { Routes, Route, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './Pages/Main';
import SignUp from './Pages/SignUp';
import SignIn from './Pages/SignIn';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import Home from './Pages/Home';
import PrivateRoute from './components/PrivateRoute';
import NotFound from './Pages/NotFound';
import Deposit from './Pages/Deposit';
import Withdraw from './Pages/Withdraw';
import WithdrawSuccess from './Pages/WithdrawSuccess';
import Team from './Pages/Team';
import MyTeam from './Pages/MyTeam';
import TeamDetail from './Pages/TeamDetail';
import Detail from './Pages/Detail';
import Invest from './Pages/Invest';
import InvestSuccess from './Pages/InvestSuccess';
import Progress from './Pages/Progress';
import Notification from './Pages/Notification';
import ForgotPassword from './Pages/ForgotPassword';
import Dashboard from './Pages/Dashboard';
import DepositHistory from './Pages/DepositHistory';
import WithdrawHistory from './Pages/WithdrawHistory';
import Profile from './Pages/Profile';
import EditPassword from './Pages/EditPassword';
import About from './Pages/About';
import Contact from './Pages/Contact';
import { pageTitles } from './Assets/Data';
import Offers from './Pages/Offers';
import Transactions from './Pages/Transactions';
import TransactionDetail from './Pages/TransactionDetail';
import AdminPanel from './Pages/AdminPanel';
import PromoCode from './Pages/PromoCode';
import UserDetails from './components/UserDetails';
import Splash from './Pages/Splash';
import AdminLogin from './Pages/AdminLogin';
import AdminRoute from './Pages/AdminRoute';
import UpdatePassword from './components/UpdatePassword';

function App() {


  const location = useLocation();
  const showHeaderRoutes = ["/home", "/", "/deposit", "/withdraw", "/invite", "/my-team", "/team-detail", "/progress", "/dashboard", "/offers", "/transactions", "/promo-code"];
  const showBottomNavRoutes = ["/home", "/", "/invite", "/my-team", "/team-detail", "/progress"];
  const shouldShowBottomNav = showBottomNavRoutes.includes(location.pathname);
  const shouldShowHeader = showHeaderRoutes.includes(location.pathname);




  return (
    <>
      {shouldShowHeader && <Header />}
      <main className={shouldShowHeader ? 'pt-[10%]' : ''}>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signup/:id" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/deposit" element={<Deposit />} />
            <Route path="/withdraw" element={<Withdraw />} />
            <Route path="/withdraw-sucess" element={<WithdrawSuccess />} />
            <Route path="/invite" element={<Team />} />
            <Route path="/my-team" element={<MyTeam />} />
            <Route path="/team-detail" element={<TeamDetail />} />
            <Route path="/detail" element={<Detail />} />
            <Route path="/invest/:id" element={<Invest />} />
            <Route path="/invest-success" element={<InvestSuccess />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/notification" element={<Notification />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/deposit-history" element={<DepositHistory />} />
            <Route path="/withdraw-history" element={<WithdrawHistory />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/edit-password/:email" element={<EditPassword />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/transactions/:type" element={<Transactions />} />
            <Route path="/transaction-detail/:type/:id" element={<TransactionDetail />} />
            <Route path="/promo-code" element={<PromoCode />} />
          </Route>
          <Route element={<AdminRoute />}>
            <Route path="/sajidkhan" element={<AdminPanel />} />
            <Route path="/splash/:id" element={<Splash />} />
            <Route path="/user-detail/:id" element={<UserDetails />} />
            <Route path="/admin-password" element={<UpdatePassword />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {shouldShowBottomNav && <BottomNav />}
    </>
  );
}

export default App;
