
import React, { Component } from 'react';

class Sidebar extends Component {
        
    render(){

        return <div>
            <div id="sidebar" className={ this.props.show ? 'open' : ''}>
                <a href="" className="closebtn" onClick={(e) => { this.props.onClose(); e.preventDefault() }}>&times;</a>
                <div className="sidebar-title">
                    <h3>Editar / Crear</h3>
                </div>
                <div className="sidebar-content">
                    { this.props.children }
                </div>
            </div>
            <div className="sidebar-back" onClick={() => {this.props.onClose();}}></div>
        </div>
    }
}



export default Sidebar;
