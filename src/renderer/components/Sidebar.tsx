interface Props {
  show: boolean;
  onClose: (arg?: any) => void;
  children: any;
}

function Sidebar({ show, onClose, children }: Props) {
  return (
    <div>
      <div id="sidebar" className={show ? 'open' : ''}>
        <button
          type="button"
          className="closebtn"
          onClick={(e) => {
            onClose();
            e.preventDefault();
          }}
        >
          &times;
        </button>
        <div className="sidebar-title">
          <h3>Editar / Crear</h3>
        </div>
        <div className="sidebar-content">{children}</div>
      </div>
    </div>
  );
}

export default Sidebar;
