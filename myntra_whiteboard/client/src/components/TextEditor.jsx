import React, { useState } from "react";
import { useSnapshot } from "valtio";
import state from "../store";
import "./TextEditor.scss"; // Import the CSS file for TextEditor styles

const TextEditor = () => {
  const snap = useSnapshot(state);
  const [text, setText] = useState("");
  const [fontSize, setFontSize] = useState(16);
  const [color, setColor] = useState("#000000");
  const [fontFamily, setFontFamily] = useState("Arial");
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0.15 });

  const handleAddText = () => {
    state.text = text;
    state.fontSize = fontSize * 0.3;
    state.textColor = color;
    state.fontFamily = fontFamily;
    state.textPosition = position;
    state.isTextVisible = true; // Add this line
  };

  const handlePositionChange = (axis, value) => {
    setPosition(prev => ({ ...prev, [axis]: parseFloat(value) }));
  };

  return (
    <div className="absolute left-full ml-3 text-editor">
      <div className="input-group">
        <label>Text:</label>
        <input
          type="text"
          placeholder="Enter text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="text-input"
        />
      </div>
      <div className="input-group">
        <label>Font Size:</label>
        <input
          type="number"
          placeholder="Font size"
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
          className="font-size-input"
        />
      </div>
      <div className="input-group">
        <label>Color:</label>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="color-picker"
        />
      </div>
      <div className="input-group">
        <label>Font Family:</label>
          <select
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value)}
              className="font-family-select"
          >
              <option value="Arial">Arial</option>
              <option value="Courier New">Courier New</option>
              <option value="Georgia">Georgia</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Verdana">Verdana</option>
              <option value="Helvetica">Helvetica</option>
              <option value="Tahoma">Tahoma</option>
              <option value="Trebuchet MS">Trebuchet MS</option>
              <option value="Lucida Sans Unicode">Lucida Sans Unicode</option>
              <option value="Palatino Linotype">Palatino Linotype</option>
              <option value="Impact">Impact</option>
              <option value="Comic Sans MS">Comic Sans MS</option>
              <option value="Garamond">Garamond</option>
              <option value="Bookman">Bookman</option>
              <option value="Arial Black">Arial Black</option>
              <option value="Gill Sans">Gill Sans</option>
              <option value="Century Gothic">Century Gothic</option>
              <option value="Lucida Console">Lucida Console</option>
              <option value="Franklin Gothic Medium">Franklin Gothic Medium</option>

          </select>
      </div>
        <div className="position-controls">
            <label>X:
                <input
                    type="range"
                    min="-1"
                    max="1"
                    step="0.01"
                    value={position.x}
                    onChange={(e) => handlePositionChange('x', e.target.value)}
                />
            </label>
            <br></br>
            <label>Y:
                <input
                    type="range"
                    min="-1"
                    max="1"
                    step="0.01"
                    value={position.y}
                    onChange={(e) => handlePositionChange('y', e.target.value)}
                />
            </label>

        </div>
        <button onClick={handleAddText} className="add-text-button">
            Add Text
        </button>
    </div>
  );
};

export default TextEditor;
