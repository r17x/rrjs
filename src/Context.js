import React, {
  createContext,
  PureComponent,
} from 'react'

const AppContext = createContext()

export const {Provider, Consumer} = AppContext

export const withContext = (Components) =>
  class GetContext extends PureComponent {
    /**
     * @return {object} ContextAPI.Consumer in Children Component
     */
    render() {
      return (
        <AppContext.Consumer>
          { (data) =>{
            return (
              <Components {...data}/>
            )
          }
          }
        </AppContext.Consumer>
      )
    }
  }

export default AppContext
