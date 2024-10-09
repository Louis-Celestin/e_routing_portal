import React from 'react'
import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import routes from '../routes'

import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react'

const AppBreadcrumb = () => {

  const user_type = window.sessionStorage.getItem('user_type');

  const [isDC, setDc] = useState(false)

  useEffect(() => {
    if(user_type === '9'){
      setDc(true)
    }
  },[])


  const currentLocation = useLocation().pathname

  const getRouteName = (pathname, routes) => {
    const currentRoute = routes.find((route) => route.path === pathname)
    return currentRoute ? currentRoute.name : false
  }

  const getBreadcrumbs = (location) => {
    const breadcrumbs = []
    location.split('/').reduce((prev, curr, index, array) => {
      const currentPathname = `${prev}/${curr}`
      const routeName = getRouteName(currentPathname, routes)
      routeName &&
        breadcrumbs.push({
          pathname: currentPathname,
          name: routeName,
          active: index + 1 === array.length ? true : false,
        })
      return currentPathname
    })
    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs(currentLocation)

  return (
    <>
      {/* <CBreadcrumb className="my-0">
        {isDC ? (
          <CBreadcrumbItem href="/admin-dashboard">Home</CBreadcrumbItem>
        ) : 
        (
          <CBreadcrumbItem href="/">Home</CBreadcrumbItem>
        )
        }
        
        {breadcrumbs.map((breadcrumb, index) => {
          return (
            <CBreadcrumbItem
              {...(breadcrumb.active ? { active: true } : { href: breadcrumb.pathname })}
              key={index}
            >
              {breadcrumb.name}
            </CBreadcrumbItem>
          )
        })}
      </CBreadcrumb> */}
    </>
  )
}

export default React.memo(AppBreadcrumb)
