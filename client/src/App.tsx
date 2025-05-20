import { Route, Switch } from "wouter"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import ProtectedRoutes from "./components/ProtectedRoutes"
import PrivateRoutes from "./routes/PrivateRoutes"

function App() {
  return (
    <>
      <Switch>
        <Route path='/login' component={LoginPage} />
        <Route path='/register' component={RegisterPage} />

        <Route>
          <ProtectedRoutes isAuthenticated={false}>
            <PrivateRoutes />
          </ProtectedRoutes>
        </Route>
      </Switch>
    </>
  )
}

export default App
