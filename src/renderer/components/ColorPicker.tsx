import { useEffect, useState } from 'react';
import { HexColorPicker } from 'react-colorful';

interface Props {
  defaultColor: string;
  show: boolean;
  onShow: () => void;
  onChange: (newColor: string) => void;
  onCancel: () => void;
}
export default function ColorPicker(props: Props) {
  const { defaultColor, show, onChange, onCancel, onShow } = props;
  const [color, setColor] = useState(defaultColor);

  useEffect(() => {
    setColor(defaultColor);
  }, [defaultColor]);

  return show ? (
    <>
      <HexColorPicker color={color} onChange={setColor} />
      <button
        className="btn btn-sm btn-primary"
        onClick={() => {
          onChange(color);
        }}
        type="button"
      >
        Aceptar
      </button>
      <button
        className="btn btn-sm btn-secondary"
        onClick={onCancel}
        type="button"
      >
        Cancelar
      </button>
    </>
  ) : (
    <span
      className="color-preview"
      style={{ backgroundColor: color }}
      onClick={onShow}
    >
      {color}
    </span>
  );
}
