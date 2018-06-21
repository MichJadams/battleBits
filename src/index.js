import React from 'react';
import {BrowserRouter as Router,Switch, Route} from 'react-router-dom'
import {render} from 'react-dom'
import Play from './components/Play';
import App from './components/App.js'
import battleBits from './components/battleBits'
render(
    <div>
        <Router>
            
                <Switch>
                    <Route exact path="/" component={App} />
                    <Route exact path="/play" component={Play} />
                    <Route exact path="/battleBits" component={battleBits} />
                </Switch>
            
        </Router>
    </div>,
    document.getElementById('root'))
