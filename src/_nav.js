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
  cilPeople,
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
    component: CNavGroup,
    name: 'Routings',
    to: '/routing',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Tous les Routings',
        to: '/routing/all-routings',
      },   
    ],
  },
  {
    component: CNavGroup,
    name: 'Routines',
    to: '/routines',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Toutes les routines',
        to: '/routines/all-routines',
      },
   
    ],
  },
  {
    component: CNavItem,
    name: 'Mes Commerciaux',
    to: '/commerciaux/mes-commerciaux',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
]

export default _nav
