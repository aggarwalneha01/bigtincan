import React from "react";

const Checkbox = (props) =>  {
        return (
            <input
                type={props.type}
                name={props.name}
                checked={props.checked}
                onChange={props.onChange}
            />
        );
    
}

export default Checkbox;