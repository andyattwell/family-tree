import { Component } from 'react';
import {
  Container,
  Popover,
  Overlay,
  Navbar,
  NavDropdown,
  Nav,
} from 'react-bootstrap';

class AppNav extends Component {
  constructor() {
    super();
    this.handleAdd = this.handleAdd.bind(this);
    this.closePop = this.closePop.bind(this);
    this.state = {
      trees: [],
    };
    this.handleClick = (e) => {
      this.setState({ target: e.target, showPop: !this.state.showPop });
      // TreeActions.getTree()
    };
  }

  static getDerivedStateFromProps(props) {
    const { trees } = props;
    return { trees };
  }
  handleAdd(e) {
    e.preventDefault();
    // TreeActions.createTree({ name: this.state.name });
    this.setState({ target: null, showPop: false });
    return false;
  }

  closePop(e) {
    e.preventDefault();
    this.setState({ target: null, showPop: false });
    return false;
  }

  render() {
    const popover = (
      <Popover id="add-tree-pop" className="popover-contained">
        <form onSubmit={this.handleAdd}>
          <input
            type="text"
            className="form-control"
            name="name"
            onChange={(e) => {
              this.setState({ name: e.target.value });
            }}
          />
          <button type="submit" className="btn btn-primary">
            Guardar
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={this.closePop}
          >
            Cerrar
          </button>
        </form>
      </Popover>
    );

    return (
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>Arbol Familiar</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="Familias" id="basic-nav-dropdown">
                {this.state.trees.map((p, i) => {
                  return (
                    <NavDropdown.Item
                      onClick={() => {
                        this.props.onChangeTree(p);
                      }}
                      key={i}
                    >
                      {p.name}
                    </NavDropdown.Item>
                  );
                })}
              </NavDropdown>
              <NavDropdown.Item onClick={this.handleClick}>
                Agregar
              </NavDropdown.Item>
              <Overlay
                show={this.state.showPop}
                target={this.state.target}
                placement="bottom"
                container={this}
                containerPadding={20}
              >
                {popover}
              </Overlay>
            </Nav>
            <Nav className="float-end">
              <NavDropdown.Item
                href="#"
                onClick={() => {
                  this.props.zoomIn();
                }}
              >
                <i className="fas fa-plus" aria-valuetext="+"></i>
              </NavDropdown.Item>
              <NavDropdown.Item
                href="#"
                onClick={() => {
                  this.props.zoomOut();
                }}
              >
                <i className="fas fa-minus" aria-valuetext="+"></i>
              </NavDropdown.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default AppNav;
