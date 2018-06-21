import React from 'react';
import {BrowserRouter as Router,Switch, Route} from 'react-router-dom'
import {render} from 'react-dom'
import Play from './components/Play';
import practiceSettings from './components/practiceSettings'
import battleBits from './components/battleBits'
import Landing from './components/landing.js'
import battleSettings from './components/battleSettings.js'

render(
    <div>
        <Router>
            
                <Switch>
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/practiceSettings" component={practiceSettings} />
                    <Route exact path="/play" component={Play} />
                    <Route exact path="/BattleSettings" component={battleSettings} />
                    <Route exact path="/battleBits" component={battleBits} />
                </Switch>
            
        </Router>
    </div>,
    document.getElementById('root'))
