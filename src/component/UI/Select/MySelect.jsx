import React from 'react'

export default function MySelect({defaultValue, options, value, onChange }) {
  return (
    <select
        value={value}
        onChange={event => onChange(event.target.value)}
    >
        <option disabled value="">{defaultValue}</option>
        {options.map((option) => {
            return(
                <option key={option.value} value={option.value}>
                    {option.name}
                </option>
            )
        }) }
    </select>
  )
}
