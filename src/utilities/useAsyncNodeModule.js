import * as React from "react"

const Context = React.createContext()

export const AsyncNodeModulesProvider = (props) => {
  const [loadedModules, setLoadedModules] = React.useState({})

  const addLoadedModule = (path, module) => {
    if (!loadedModules[path]) {
      setLoadedModules((state) => ({ ...state, [path]: module }))
    }
  }

  const getLoadedModule = (path) => {
    return loadedModules[path]
  }

  return (
    <Context.Provider value={{ loadedModules, addLoadedModule, getLoadedModule }}>
      {props.children}
    </Context.Provider>
  )
}

export const useAsyncNodeModule = ({ import: pathImport, path, exportName }) => {
  const asyncNodeModules = React.useContext(Context)
  const loadedModule = asyncNodeModules.getLoadedModule(path)

  React.useEffect(() => {
    if (!loadedModule) {
      pathImport.then((component) => {
        const module = exportName ? component[exportName] : component
        asyncNodeModules.addLoadedModule(path, module)
      })
    }
  }, [])

  return loadedModule
}
