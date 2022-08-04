import React, { useEffect, useRef } from 'react'
import Select from 'react-select';

const customSelectStyle = {
  control: (provided, state) => ({
    ...provided,
    border: 0,
    borderRadius: '2px',
    backgroundColor: state.isSelected ? 'white' : 'rgb(242, 243, 245)',
    minHeight: 'auto'
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: '4px 12px',
    lineHeight: 1.5715
  }),
  input: (provided) => ({
    ...provided,
    margin: 0,
    padding: 0
  }),
  placeholder: (provided) => ({
    ...provided,
    margin: 0
  }),
  indicatorContainer: (provided) => ({
    ...provided,
    padding: '0px 8px'
  })
}

export default function CustomSelect({ options, dataLabelName, onChange, value }) {
  const ref = useRef();

  useEffect(() => {
    if (value !== undefined) return;
    ref.current.clearValue();
  }, [value]);

  return (
    <Select
      ref={ref}
      defaultValue={value}
      onChange={(opt) => onChange(opt?.value)}
      classNamePrefix="rselect"
      placeholder="Selecciona o busca"
      styles={customSelectStyle}
      options={options.map(option => ({
        label: option[dataLabelName ? dataLabelName : 'nombre'],
        value: option.id
      }))}
    />

  )
}
