import { Loadable } from '../components'

const DashboardPage = Loadable(async () => import('../pages/Dashboard'))

const PUBLIC_ROUTES = [
  {
    exact: true,
    title: 'Dashboard',
    path: '/',
    Element: DashboardPage
  }
]

export { PUBLIC_ROUTES }
