import { Button } from 'react-bootstrap';

interface Props {
  show: boolean;
  onClose: (arg?: any) => void;
  children: any;
}

function Sidebar({ show, onClose, children }: Props) {
  return (
    <div id="sidebar" className={show ? 'open' : ''}>
      <Button
        type="button"
        className="sm float-end me-3 mt-2"
        variant="outline-secondary"
        onClick={(e) => {
          onClose();
          e.preventDefault();
        }}
      >
        &times;
      </Button>
      <div className="sidebar-content">{children}</div>
    </div>
  );
}

export default Sidebar;
