import React from 'react'
import { useRoutes } from 'react-router'
import App from '../App'
import Result from '../components/Result'
function Routes() {
    const AllRoutes = useRoutes([
        {
          path: "/",
          element: <App />,
        },
        {
          path: "/result",
          element: <Result />,
        }])

  return AllRoutes
  
}

export default Routes