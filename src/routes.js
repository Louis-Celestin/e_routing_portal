import React from 'react'
import ProtectedRoute from './components/ProtectedRoutes'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
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

const AllRoutings = React.lazy(()=>import('./views/routing/AllRoutings/AllRoutings'))
const AddNewRouting = React.lazy(()=>import('./views/routing/AddNewRouting/AddNewRouting'))
const MesCommerciaux = React.lazy(()=>import('./views/commerciaux/MesCommerciaux/MesCommerciaux'))
const Login = React.lazy(()=>import('./views/pages/login/Login'))


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
    path: '/theme',
    name: 'Theme',
    element: (
      <ProtectedRoute>
        <Colors />
      </ProtectedRoute>
    ),
    exact: true,
  },
  {
    path: '/theme/colors',
    name: 'Colors',
    element: (
      <ProtectedRoute>
        <Colors />
      </ProtectedRoute>
    ),
  },
  {
    path: '/theme/typography',
    name: 'Typography',
    element: (
      <ProtectedRoute>
        <Typography />
      </ProtectedRoute>
    ),
  },
  {
    path: '/base',
    name: 'Base',
    element: (
      <ProtectedRoute>
        <Cards />
      </ProtectedRoute>
    ),
    exact: true,
  },
  {
    path: '/base/accordion',
    name: 'Accordion',
    element: (
      <ProtectedRoute>
        <Accordion />
      </ProtectedRoute>
    ),
  },
  {
    path: '/base/breadcrumbs',
    name: 'Breadcrumbs',
    element: (
      <ProtectedRoute>
        <Breadcrumbs />
      </ProtectedRoute>
    ),
  },
  {
    path: '/base/cards',
    name: 'Cards',
    element: (
      <ProtectedRoute>
        <Cards />
      </ProtectedRoute>
    ),
  },
  {
    path: '/base/carousels',
    name: 'Carousel',
    element: (
      <ProtectedRoute>
        <Carousels />
      </ProtectedRoute>
    ),
  },
  {
    path: '/base/collapses',
    name: 'Collapse',
    element: (
      <ProtectedRoute>
        <Collapses />
      </ProtectedRoute>
    ),
  },
  {
    path: '/base/list-groups',
    name: 'List Groups',
    element: (
      <ProtectedRoute>
        <ListGroups />
      </ProtectedRoute>
    ),
  },
  {
    path: '/base/navs',
    name: 'Navs',
    element: (
      <ProtectedRoute>
        <Navs />
      </ProtectedRoute>
    ),
  },
  {
    path: '/base/paginations',
    name: 'Paginations',
    element: (
      <ProtectedRoute>
        <Paginations />
      </ProtectedRoute>
    ),
  },
  {
    path: '/base/placeholders',
    name: 'Placeholders',
    element: (
      <ProtectedRoute>
        <Placeholders />
      </ProtectedRoute>
    ),
  },
  {
    path: '/base/popovers',
    name: 'Popovers',
    element: (
      <ProtectedRoute>
        <Popovers />
      </ProtectedRoute>
    ),
  },
  {
    path: '/base/progress',
    name: 'Progress',
    element: (
      <ProtectedRoute>
        <Progress />
      </ProtectedRoute>
    ),
  },
  {
    path: '/base/spinners',
    name: 'Spinners',
    element: (
      <ProtectedRoute>
        <Spinners />
      </ProtectedRoute>
    ),
  },
  {
    path: '/base/tabs',
    name: 'Tabs',
    element: (
      <ProtectedRoute>
        <Tabs />
      </ProtectedRoute>
    ),
  },
  {
    path: '/base/tables',
    name: 'Tables',
    element: (
      <ProtectedRoute>
        <Tables />
      </ProtectedRoute>
    ),
  },
  {
    path: '/base/tooltips',
    name: 'Tooltips',
    element: (
      <ProtectedRoute>
        <Tooltips />
      </ProtectedRoute>
    ),
  },
  {
    path: '/buttons',
    name: 'Buttons',
    element: (
      <ProtectedRoute>
        <Buttons />
      </ProtectedRoute>
    ),
    exact: true,
  },
  {
    path: '/buttons/buttons',
    name: 'Buttons',
    element: (
      <ProtectedRoute>
        <Buttons />
      </ProtectedRoute>
    ),
  },
  {
    path: '/buttons/dropdowns',
    name: 'Dropdowns',
    element: (
      <ProtectedRoute>
        <Dropdowns />
      </ProtectedRoute>
    ),
  },
  {
    path: '/buttons/button-groups',
    name: 'Button Groups',
    element: (
      <ProtectedRoute>
        <ButtonGroups />
      </ProtectedRoute>
    ),
  },
  {
    path: '/charts',
    name: 'Charts',
    element: (
      <ProtectedRoute>
        <Charts />
      </ProtectedRoute>
    ),
  },
  {
    path: '/forms',
    name: 'Forms',
    element: (
      <ProtectedRoute>
        <FormControl />
      </ProtectedRoute>
    ),
    exact: true,
  },
  {
    path: '/forms/form-control',
    name: 'Form Control',
    element: (
      <ProtectedRoute>
        <FormControl />
      </ProtectedRoute>
    ),
  },
  {
    path: '/forms/select',
    name: 'Select',
    element: (
      <ProtectedRoute>
        <Select />
      </ProtectedRoute>
    ),
  },
  {
    path: '/forms/checks-radios',
    name: 'Checks & Radios',
    element: (
      <ProtectedRoute>
        <ChecksRadios />
      </ProtectedRoute>
    ),
  },
  {
    path: '/forms/range',
    name: 'Range',
    element: (
      <ProtectedRoute>
        <Range />
      </ProtectedRoute>
    ),
  },
  {
    path: '/forms/input-group',
    name: 'Input Group',
    element: (
      <ProtectedRoute>
        <InputGroup />
      </ProtectedRoute>
    ),
  },
  {
    path: '/forms/floating-labels',
    name: 'Floating Labels',
    element: (
      <ProtectedRoute>
        <FloatingLabels />
      </ProtectedRoute>
    ),
  },
  {
    path: '/forms/layout',
    name: 'Layout',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
  },
  {
    path: '/forms/validation',
    name: 'Validation',
    element: (
      <ProtectedRoute>
        <Validation />
      </ProtectedRoute>
    ),
  },
  {
    path: '/icons',
    exact: true,
    name: 'Icons',
    element: (
      <ProtectedRoute>
        <CoreUIIcons />
      </ProtectedRoute>
    ),
  },
  {
    path: '/icons/coreui-icons',
    name: 'CoreUI Icons',
    element: (
      <ProtectedRoute>
        <CoreUIIcons />
      </ProtectedRoute>
    ),
  },
  {
    path: '/icons/flags',
    name: 'Flags',
    element: (
      <ProtectedRoute>
        <Flags />
      </ProtectedRoute>
    ),
  },
  {
    path: '/icons/brands',
    name: 'Brands',
    element: (
      <ProtectedRoute>
        <Brands />
      </ProtectedRoute>
    ),
  },
  {
    path: '/notifications',
    name: 'Notifications',
    element: (
      <ProtectedRoute>
        <Alerts />
      </ProtectedRoute>
    ),
    exact: true,
  },
  {
    path: '/notifications/alerts',
    name: 'Alerts',
    element: (
      <ProtectedRoute>
        <Alerts />
      </ProtectedRoute>
    ),
  },
  {
    path: '/notifications/badges',
    name: 'Badges',
    element: (
      <ProtectedRoute>
        <Badges />
      </ProtectedRoute>
    ),
  },
  {
    path: '/notifications/modals',
    name: 'Modals',
    element: (
      <ProtectedRoute>
        <Modals />
      </ProtectedRoute>
    ),
  },
  {
    path: '/notifications/toasts',
    name: 'Toasts',
    element: (
      <ProtectedRoute>
        <Toasts />
      </ProtectedRoute>
    ),
  },
  {
    path: '/widgets',
    name: 'Widgets',
    element: (
      <ProtectedRoute>
        <Widgets />
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
    path: '/routing/add-new-routing',
    name: 'Add New Routing',
    element: (
      <ProtectedRoute>
        <AddNewRouting />
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
  {
    path: '/login',
    name: 'Login',
    element: <Login />,
  },
];

export default routes
