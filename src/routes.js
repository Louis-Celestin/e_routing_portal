import React from 'react'
import ProtectedRoute from './components/ProtectedRoutes'

const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

// Base
const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
const Cards = React.lazy(() => import('./views/base/cards/Cards'))
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'))
const Navs = React.lazy(() => import('./views/base/navs/Navs'))
const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'))
const Placeholders = React.lazy(() => import('./views/base/placeholders/Placeholders'))
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
const Progress = React.lazy(() => import('./views/base/progress/Progress'))
const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'))
const Tabs = React.lazy(() => import('./views/base/tabs/Tabs'))
const Tables = React.lazy(() => import('./views/base/tables/Tables'))
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))

// Buttons
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

//Forms
const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
const Range = React.lazy(() => import('./views/forms/range/Range'))
const Select = React.lazy(() => import('./views/forms/select/Select'))
const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

const Charts = React.lazy(() => import('./views/charts/Charts'))

// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

//Mes routes

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const AllRoutings = React.lazy(()=>import('./views/routing/AllRoutings/AllRoutings'))
const AllRoutines = React.lazy(()=>import('./views/routines/AllRoutines/AllRoutines'))
const MesCommerciaux = React.lazy(()=>import('./views/commerciaux/MesCommerciaux/MesCommerciaux'))
const Login = React.lazy(()=>import('./views/pages/login/Login'))
const CommercialDetails = React.lazy(()=>import('./views/dashboard/CommercialDetails'))
const DashboardAdmin = React.lazy(()=>import('./views/dashboard/DashboardAdmin'))
const AllRoutingsAdmin = React.lazy(()=>import('./views/routing/AllRoutings/AllRoutingsAdmin'))
const AllRoutinesAdmin = React.lazy(()=>import('./views/routines/AllRoutines/AllRoutinesAdmin'))


const routes = [
  { path: '/', exact: true, name: 'Home' },
  {
    path: '/dashboard',
    name: 'Dashboard',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin-dashboard',
    name: 'DashboardAdmin',
    element: (
      <ProtectedRoute>
        <DashboardAdmin />
      </ProtectedRoute>
    ),
  },
  {
    path: 'admin-routing/admin-routing',
    name: 'AllRoutingsAdmin',
    element: (
      <ProtectedRoute>
        <AllRoutingsAdmin />
      </ProtectedRoute>
    ),
  },
  {
    path: 'admin-routines/admin-routines',
    name: 'AllRoutinesAdmin',
    element: (
      <ProtectedRoute>
        <AllRoutinesAdmin />
      </ProtectedRoute>
    ),
  },
  {
    path: '/routing',
    name: 'Routings',
    element: (
      <ProtectedRoute>
        <AllRoutings />
      </ProtectedRoute>
    ),
    exact: true,
  },
  {
    path: '/routing/all-routings',
    name: 'All Routings',
    element: (
      <ProtectedRoute>
        <AllRoutings />
      </ProtectedRoute>
    ),
  },
  {
    path: '/commerciaux',
    name: 'Commerciaux',
    element: (
      <ProtectedRoute>
        <MesCommerciaux />
      </ProtectedRoute>
    ),
    exact: true,
  },
  {
    path: '/commerciaux/mes-commerciaux',
    name: 'Mes Commerciaux',
    element: (
      <ProtectedRoute>
        <MesCommerciaux />
      </ProtectedRoute>
    ),
  },
  { path: '/routines', name: 'Routines', element:<ProtectedRoute><AllRoutines/></ProtectedRoute> , exact: true },
  { path: '/routines/all-routines', name: 'All Routines', element: <ProtectedRoute><AllRoutines/></ProtectedRoute> },
  {
    path: '/login',
    name: 'Login',
    element: <Login />,
  },
  {
    path: '/details/:id',
    name: 'CommercialDetails',
    element: (
      <ProtectedRoute>
        <CommercialDetails />
      </ProtectedRoute>
    ),
  },
];

export default routes
