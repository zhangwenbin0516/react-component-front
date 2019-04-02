import React from 'react'
import RouterView from 'src/router/Index'

class Pages extends React.Component{
    render() {
        return(
            <div className={'pages'}>
                <RouterView/>
            </div>
        )
    }
}

export default Pages