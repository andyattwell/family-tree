import React, { Component } from 'react';
import 'whatwg-fetch'
import api from '../api';

class Persona extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      persona : null,
      modal_p : null
    }

    // this.handleDelete = this.handleDelete.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    // // Evento de mouse
    this.toggleEnter = this.toggleEnter.bind(this);
    this.toggleLeave = this.toggleLeave.bind(this);
    this.handleSelected = this.handleSelected.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  static getDerivedStateFromProps(props, state){
    return {
      persona: props.persona
    }
  }

  toggleEnter(){
    this.setState({ hover: true })
  }

  toggleLeave(){
    this.setState({ hover: false })
  }
  /*
  * Eliminar persona de bd
  * params 
  *   Persona p
  */

  eliminarPersona(p){
    api.delete('persona/'+p.id)
      .then((response) => {
        console.log("Elimado");
      })
      .catch((err) => {
        console.log("Error al eliminar")
        console.log(err);
      })
  }

  /*
    Decidir estrategia de eliminado
    params 
      Persona p - persona a eliminar
      String target - persona / pareja
      Number i - indice en array
  */

  handleDelete(p, target, index){
    this.props.onDelete(p, target, index);
    this.setState({p});

  }

  handleUpdate(newPersona){
    console.log(newPersona);
    this.setState({persona:newPersona, modal:false})
  }

  handleSelected(persona){
    this.props.onSelected(persona)
    this.setState( { modal:true } )
  }

  handleClose(){
    this.setState( { modal: null} );
  }

  render(){
    var persona = this.props.persona;
    
    if(!persona){
      return ''
    }

    const Detalle = <Detalles 
      toggleEnter={ this.toggleEnter }
      toggleLeave={ this.toggleLeave }
      onSelected={ this.handleSelected }
      onUpdate={ this.handleUpdate }
      onClose={ this.handleClose }
      persona={ persona }
      show={ this.state.modal }
    />;

    return this.props.es_pareja === true ? 

    Detalle

     : <PersonaWrap active={ this.state.hover }>
        
        <div className={ 'detalles' }>

          { Detalle }

          {/* { (persona && persona.pareja) ? <Persona key={persona.pareja.id} onDelete={this.handleDelete } persona={ persona.pareja } onSelected={ this.handleSelected } es_pareja={true} />: '' } */}
        </div>

        { (persona.childeren && persona.childeren.length > 0)  ? 
          <ul> {persona.childeren.map((p, i) => {
            return <Persona key={p.id} onDelete={this.handleDelete } persona={ p } onSelected={ this.handleSelected }/>
          }) }
          </ul> 
        : '' }
    </PersonaWrap>
      
  }

}

function Detalles(props){

  var fecha = () => {
    var n = props.persona.birthdate ? props.persona.birthdate : '?';
    var f = props.persona.dod ? props.persona.dod : '?';
    return '(' + new Date(n).toLocaleDateString() + ' - ' + new Date(f).toLocaleDateString() + ')';
  }

  const handleClick = () => {
    props.onSelected(props.persona)
  }

  return <div className='persona'>
    <div 
      className="name"  
      onMouseLeave={ props.toggleLeave  }
      onMouseEnter={ props.toggleEnter  }
    >
      <div onClick={ handleClick }>
        <span>{ props.persona.name }</span>
        <small>{ fecha() }</small>
      </div>
    </div>
  </div>
}

function PersonaWrap(props){
  return <li className={ 'nodo ' + (props.active ? 'active' : '') }>
    <div>
      { props.children }
    </div>
  </li>
}

export default Persona;