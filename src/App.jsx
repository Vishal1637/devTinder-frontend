import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import Body from "./Components/Body";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import { Provider, useSelector } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./Components/Feed";
import Connections from "./Components/Connections";
import Requests from "./Components/Requests";
import ErrorBoundary from "./Components/ErrorBoundary";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const user = useSelector((store) => store?.user);
  return user ? children : <Navigate to="/login" replace />;
};

// Public Route Component (only for login)
const PublicRoute = ({ children }) => {
  const user = useSelector((store) => store?.user);
  return !user ? children : <Navigate to="/" replace />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired
};

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired
};

function App() {
  return (
    <ErrorBoundary>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/login" element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } />
            <Route path="/" element={
              <ProtectedRoute>
                <Body />
              </ProtectedRoute>
            }>
              <Route index element={<Feed />} />
              <Route path="profile" element={<Profile />} />
              <Route path="connections" element={<Connections />} />
              <Route path="requests" element={<Requests />} />
            </Route>
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
