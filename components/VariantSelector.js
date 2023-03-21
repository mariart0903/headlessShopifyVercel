import React from "react";

function VariantSelector (props) {
    const { option, handleOptionChange } = props;

    return <>
        { option.name !== 'Title' &&
            <div>
                <label htmlFor={'Option__' + option.name}> Select { option.name } </label>
                <select
                    className="Product__option select_styles"
                    name={option.name}
                    key={option.name}
                    id={'Option__' + option.name}
                    onChange={handleOptionChange}
                >
                    {option.values.map((value) => {
                        return (
                            <option value={value} key={`${option.name}-${value}`}>{`${value}`}</option>
                        )
                    })}
                </select>
            </div>
        }
    </>
}

export default VariantSelector;
