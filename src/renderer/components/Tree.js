import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Persona from './Persona'
import $ from 'jquery';
import 'whatwg-fetch';
import 'jquery-ui/ui/widgets/draggable';

class Tree extends Component {

  constructor() {
    super();

    this.state = {
      zoom: 1,
      tree: null
    }

    this.handleDelete = this.handleDelete.bind(this)
    this.handleSelected = this.handleSelected.bind(this)
  }

  handleDelete(p, target, index){
    this.props.onDelete(p, target, index);
  }

  resetPosition() {

    var elWidth = ReactDOM.findDOMNode(this.refs.tree).getBoundingClientRect().width

    if (this.state.elWidth && this.state.elWidth !== elWidth) {

      this.setState({
        elWidth: elWidth
      })

    }

  }

  componentDidMount() {
    $("#tree").draggable()
  }

  static getDerivedStateFromProps(props, state){
    return { 
      zoom:props.zoom, 
      tree:props.tree 
    }
  }

  handleSelected(target){
    this.props.onSelected(target);
  }

  render() {

    var { selected, tree, zoom } = this.props;

    window.selected = selected;
    setTimeout(function(selected){ 
      var el = $("#tree");
      var left = $(window).outerWidth() / 2 - el.outerWidth() / 2;
      el.css({ left: left + 'px'})
      window.selected = null;
    }, 100)
    //var left = this.state.elWidth / 2;
    return (
      <div className={ 'tree-container ' + ( selected ? 'open' : '') } style={ {zoom: zoom }}>
        <div id="tree">
          <ul>
            <Persona 
              index={this.props.index} 
              persona={ tree } 
              onSelected={ this.handleSelected }
              onDeSelected={ (target) => { this.setState({selected: null }) } }
              onDelete={ this.handleDelete } 
              onFather= { (index, persona) => {this.props.onFather(index, persona)} }
              />
          </ul>
        </div>
      </div>
    );
  }
}

export default Tree;
