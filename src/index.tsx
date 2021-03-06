import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'
import './index.css'

import { App } from './App'
import { setupMoment } from './utils'

setupMoment()

ReactDOM.render(<App />, document.getElementById('root'))
