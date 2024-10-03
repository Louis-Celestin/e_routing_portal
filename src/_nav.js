import React, { useState, useEffect } from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
  cilPuzzle,
  cilPeople,
} from '@coreui/icons'
import { CNavGroup, CNavItem } from '@coreui/react'

const NavBar = () => {
  const [navItems, setNavItems] = useState([]);

  useEffect(() => {
    const user_type = window.sessionStorage.getItem('user_type');
    console.log(user_type);

    if (user_type === '9') {
      setNavItems([
        {
          component: CNavItem,
          name: 'Tableau de bord Admin',
          to: '/admin-dashboard',
          icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
        },
        {
          component: CNavGroup,
          name: 'Routings Généraux',
          to: '/admin-routing',
          icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
          items: [
            {
              component: CNavItem,
              name: 'Tous les Routings',
              to: '/admin-routing/admin-routing',
            },
          ],
        },
        {
          component: CNavGroup,
          name: 'Interventions Générales',
          to: '/admin-routines',
          icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
          items: [
            {
              component: CNavItem,
              name: 'Toutes les interventions',
              to: '/admin-routines/admin-routines',
            },
          ],
        },
      ]);
    } else {
      setNavItems([
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
          name: 'Interventions',
          to: '/routines',
          icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
          items: [
            {
              component: CNavItem,
              name: 'Toutes les interventions',
              to: '/routines/all-routines',
            },
          ],
        },
      ]);
    }
  }, []);

  return navItems;
};

export default NavBar;
