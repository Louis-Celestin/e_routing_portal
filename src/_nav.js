import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Tableau de bord',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'commerciaux',
  },
  {
    component: CNavItem,
    name: 'Liste des commerciaux',
    to: '/theme/colors',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'routings',
  },
  {
    component: CNavGroup,
    name: 'Routing commercial',
    to: '/base',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Liste',
        to: '/base/accordion',
      },
      {
        component: CNavItem,
        name: 'Création',
        to: '/base/accordion',
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'routines',
  },
  {
    component: CNavGroup,
    name: 'Routines commerciales',
    to: '/base',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Liste',
        to: '/base/accordion',
      },
    ],
  },
]

export default _nav
