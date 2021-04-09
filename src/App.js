import React, {Component} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';

import Layout from './layout/Layout';
import AboutPage from './pages/AboutPage';
import CalculatorsPage from './pages/CalculatorsPage';
import CarLoanCalculatorPage from './pages/CarLoanCalculatorPage';
import LeaseCalculatorPage from './pages/LeaseCalculatorPage';
import MortgageCalculatorPage from './pages/MortgageCalculatorPage';
import NotFoundPage from './pages/NotFoundPage';
import SimpleLoanCalculatorPage from './pages/SimpleLoanCalculatorPage';

class App extends Component{
  render(){
    const home = () => <Redirect to="/calculators" />;
    const calculators = (routeProps) => <CalculatorsPage routeProps={routeProps} />;
    const about = () => <AboutPage />;
    const noMatch = (routeProps) => <NotFoundPage routeProps={routeProps} />;
    const page1 = (routeProps) => <LeaseCalculatorPage routeProps={routeProps} />;
    const page2 = (routeProps) => <SimpleLoanCalculatorPage routeProps={routeProps}/>;
    const page3 = (routeProps) => <MortgageCalculatorPage routeProps={routeProps} />;
    const page4 = (routeProps) => <CarLoanCalculatorPage routeProps={routeProps}/>;
    return(
      <Layout>
         <Switch>
         <Route exact path="/" component={home} />
            <Route path="/about" component={about} />
            <Route exact path="/calculators" component={calculators} />
            <Route path="/calculators/simple-loan-calculator" component={page2} />
            <Route path="/calculators/lease-calculator" component={page1} />
            <Route path="/calculators/mortgage-calculator" component={page3} />
            <Route path="/calculators/car-loan" component={page4}/>
            <Route render={noMatch} />
         </Switch>
      </Layout>
    )
  }
}

export default App;
