import React from 'react';

interface OptionsFilterProps {
    options: {
      code: string,
      name: string,
      active: boolean,
      selected: boolean
    }[],
    onChangeSelection: (code: string, selected: boolean) => void
}

function OptionsFilter(props: OptionsFilterProps) {
  return (
    <ul>
      {
        props.options.map((x, index) =>
          <li key={index} id={x.code}>
            <span className={x.selected ? 'option-selected' : 'option-deselected'}>{x.name}</span>
            <input type="checkbox"
              checked={x.selected}
              disabled={!x.active}
              onChange={e => props.onChangeSelection(x.code, !x.selected)} />
          </li>
        )
      }
    </ul>
  );
}

export default OptionsFilter;
