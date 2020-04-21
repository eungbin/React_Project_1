import React from 'react';
import './Form.css';

const Form = ({value, onChange, onCreate, onKeyPress}) => {
    return (
        <div className="form">
            <input type="text" placeholder="경로를 입력해주세요." value={value} onChange={onChange} onKeyPress={onKeyPress} />
            <div className="create-button" onClick={onCreate}>
                추가
            </div>
        </div>
    );
};

export default Form;