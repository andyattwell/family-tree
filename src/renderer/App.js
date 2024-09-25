import React, { Component } from 'react';
// import Tree from './components/Tree';
import AppNav from './components/AppNav';
import Sidebar from './components/Sidebar';
import PersonaForm from './components/PersonaForm';
import Animation from './components/Animation';

class App extends Component {
  constructor() {
    super();
    this.handeChange = this.handeChange.bind(this);
    this.handleZoomOut = this.handleZoomOut.bind(this);
    this.handleZoomIn = this.handleZoomIn.bind(this);
    this.closeSidebar = this.closeSidebar.bind(this);
    this.showPersona = this.showPersona.bind(this);

    this.state = {
      trees: [
        {
          id: 1,
          nivel: 1,
          birthdate: '02-22-1942',
          dod: '12-10-2001',
          photo: 'foto.jpg',
          childeren: [],
          description: '',
          name: 'Big Dog',
          parents: [],
        },
      ],
      tree: null,
      zoom: 1,
      showSidebar: false,
      persona: null,
    };
  }

  handleZoomOut() {
    const { zoom } = this.state;
    if (zoom > 0.1) {
      this.setState({ zoom: zoom - 0.1 });
    }
  }

  handleZoomIn() {
    const { zoom } = this.state;
    if (zoom < 10) {
      this.setState({ zoom: zoom + 0.1 });
    }
  }

  handeChange(tree) {
    this.setState({ tree });
  }

  closeSidebar() {
    this.setState({ showSidebar: false, persona: null });
  }

  showPersona(persona) {
    this.setState({ showSidebar: true, persona });
  }

  render() {
    const { trees, tree, showSidebar, persona } = this.state;
    return (
      <div id="app">
        <AppNav
          zoomOut={this.handleZoomOut}
          zoomIn={this.handleZoomIn}
          onChangeTree={this.handeChange}
          trees={trees}
        />

        <div className="main-container">
          {showSidebar && persona ? (
            <Sidebar onClose={this.closeSidebar} show={showSidebar}>
              <PersonaForm persona={persona} onUpdate={this.closeSidebar} />
            </Sidebar>
          ) : (
            ''
          )}
          <Animation tree={tree} />
          {/* <Tree tree={this.state.tree} zoom={ this.state.zoom } onSelected={ this.showPersona }/> */}
        </div>
      </div>
    );
  }
}

export default App;
