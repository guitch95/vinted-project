import React from 'react';
import {Range} from 'react-range';

const SliderRange = ({values, setValues}) => {
  return (
    <Range
      label="Select your value"
      step={0.1}
      min={0}
      max={1000}
      values={values}
      onChange={(values) => {
        console.log(values);
        return setValues(values);
      }}
      renderTrack={({props, children}) => (
        <div
          {...props}
          style={{
            ...props.style,
            height: '3px',
            width: '50%',
            backgroundColor: '#2cb1ba',
          }}>
          {children}
        </div>
      )}
      renderThumb={({props}) => (
        <div
          {...props}
          key={props.key}
          style={{
            ...props.style,
            height: '16px',
            width: '16px',
            borderRadius: '50%',
            backgroundColor: '#2cb1ba',
          }}
        />
      )}
    />
  );
};

export default SliderRange;
