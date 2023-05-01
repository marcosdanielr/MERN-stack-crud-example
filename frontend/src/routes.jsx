import { BrowserRouter, Route, Routes as AppRoutes } from 'react-router-dom'
import { Home } from './pages/Home'
import { User } from './pages/User'

export function Routes() {
  return (
    <BrowserRouter>
      <AppRoutes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<User />} />
      </AppRoutes>
    </BrowserRouter>
  )
}
