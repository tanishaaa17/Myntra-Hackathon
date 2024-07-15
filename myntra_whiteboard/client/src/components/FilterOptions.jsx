import React from 'react';
import { useSnapshot } from 'valtio';
import state from '../store';
import "./Filter.scss";

const FilterOptions = ({ isLogo }) => {
  const snap = useSnapshot(state);

  const handleOptionChange = (option) => {
    if (isLogo) {
      state.logoDecal = option;
    } else {
      state.fullDecal = option;
    }
  };
  const handleLogoPositionChange = (axis, value) => {
    state.logoPosition[axis] = parseFloat(value);
  };

  const handleScaleChange = (e) => {
    if (isLogo) {
      state.logoScale = parseFloat(e.target.value);
    } else {
      state.fullScale = parseFloat(e.target.value);
    }
  };
if(isLogo){
  return (
    <div className="filter-options">
  <h3>{isLogo ? 'Logo Options' : 'Full Texture Options'}</h3>
  <div className="option-grid">
    {(isLogo ? snap.logoOptions : snap.fullOptions).map((option, index) => (
      <img
        key={index}
        src={option}
        alt={`Option ${index + 1}`}
        onClick={() => handleOptionChange(option)}
        className={`option-image ${option === (isLogo ? snap.logoDecal : snap.fullDecal) ? 'selected' : ''}`}
      />
    ))}
  </div>
      <div>
          <label>X Position:</label>
          <input 
            type="range" 
            min="-0.5" 
            max="0.5" 
            step="0.01" 
            value={snap.logoPosition[0]} 
            onChange={(e) => handleLogoPositionChange(0, e.target.value)} 
          />
        </div>
        <div>
          <label>Y Position:</label>
          <input 
            type="range" 
            min="-0.5" 
            max="0.5" 
            step="0.01" 
            value={snap.logoPosition[1]} 
            onChange={(e) => handleLogoPositionChange(1, e.target.value)} 
          />
        </div>
      <div className="scale-control">
        <label htmlFor={isLogo ? 'logo-scale' : 'full-scale'}>Scale:</label>
        <input
          type="range"
          id={isLogo ? 'logo-scale' : 'full-scale'}
          min="0.1"
          max={isLogo ? "0.5" : "2"}
          step="0.01"
          value={isLogo ? snap.logoScale : snap.fullScale}
          onChange={handleScaleChange}
        />
      </div>
    </div>
  );
}
else{
    return (
        <><div className="filter-options">
        <h3>{isLogo ? 'Logo Options' : 'Full Texture Options'}</h3>
        <div className="option-grid">
          {(isLogo ? snap.logoOptions : snap.fullOptions).map((option, index) => (
            <img
              key={index}
              src={option}
              alt={`Option ${index + 1}`}
              onClick={() => handleOptionChange(option)}
              className={`option-image ${option === (isLogo ? snap.logoDecal : snap.fullDecal) ? 'selected' : ''}`}
            />
          ))}
        </div>
        </div><div className="scale-control">
                <label htmlFor={'full-scale'}>Scale:</label>
                <input
                    type="range"
                    id={'full-scale'}
                    min="0.1"
                    max={"2"}
                    step="0.01"
                    value={snap.fullScale}
                    onChange={handleScaleChange} />
            </div></>
      );
}
};

export default FilterOptions;