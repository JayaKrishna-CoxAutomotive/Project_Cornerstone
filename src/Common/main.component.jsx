import React, {Component} from 'react';
import { Link } from 'react-router';

class Main extends Component {
    render(){
        return(
            <div>
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#">Cox Automotive</a>
                        </div>
                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav">
                                {/* Change from a to Link */}
                                <li><Link to="/" activeClassName="active">Home</Link></li>
                                <li><Link to="/cars" activeClassName="active">View Process</Link></li>
                                <li><Link to="/about" activeClassName="active">Environment</Link></li>
                                 <li><Link to="/businessUnit" activeClassName="active">Business Unit</Link></li>
                                 <li><Link to="/register" activeClassName="active">Register</Link></li>
                                 <li><Link to="/Login" activeClassName="active">Login</Link></li>
                                  <li><Link to="/dataset" activeClassName="active">Dataset</Link></li>

                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="container">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Main