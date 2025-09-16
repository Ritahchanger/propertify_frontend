import AppRoute from "./AppRouter/AppRouter"

import ErrorBoundary from "./ErrorHandler/ErrorBoundry"


const App = () => {
  return (
    <ErrorBoundary>
      <AppRoute />
    </ErrorBoundary>
  )
}

export default App