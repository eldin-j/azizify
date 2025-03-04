import React, {useState, useRef, useEffect} from 'react';
import './custom-select.scss';

function CustomSelect({options, value, onChange}) {
    const [open, setOpen] = useState(false);
    const selectRef = useRef(null);

    const handleToggle = () => setOpen(!open);

    const handleOptionClick = (option) => {
        onChange && onChange(option);
        setOpen(false);
    };

    const handleClickOutside = (event) => {
        if (selectRef.current && !selectRef.current.contains(event.target)) {
            setOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectedOption = options.find(o => o.value === value) || options[0];

    return (
        <div className="custom-select" ref={selectRef}>
            <div className="custom-select__selected" onClick={handleToggle}>
                {selectedOption.label}
            </div>
            {open && (
                <ul className="custom-select__options">
                    {options.map((option) => (
                        <li
                            key={option.value}
                            className="custom-select__option"
                            onClick={() => handleOptionClick(option.value)}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default CustomSelect;