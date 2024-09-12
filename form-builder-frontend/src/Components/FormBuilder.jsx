import React, { useState } from 'react';

const FormBuilder = () => {
  const [formElements, setFormElements] = useState([]);
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');

  const addElement = (type) => {
    setFormElements([...formElements, { type, label: '', options: [] }]);
  };

  const handleLabelChange = (index, event) => {
    const updatedElements = [...formElements];
    updatedElements[index].label = event.target.value;
    setFormElements(updatedElements);
  };

  const handleOptionChange = (index, optionIndex, event) => {
    const updatedElements = [...formElements];
    updatedElements[index].options[optionIndex] = event.target.value;
    setFormElements(updatedElements);
  };

  const addOption = (index) => {
    const updatedElements = [...formElements];
    updatedElements[index].options.push('');
    setFormElements(updatedElements);
  };

  const handleSaveForm = () => {
    const formData = {
      title: formTitle,
      description: formDescription,
      elements: formElements,
    };

    fetch('http://localhost:5000/api/saveForm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          alert('Form saved successfully');
        } else {
          alert('Error saving form');
        }
      })
      .catch((error) => {
        alert('Error: ' + error.message);
      });
  };

  return (
    <div className="form-builder">
      <h2>Create a Form</h2>
      <input
        type="text"
        placeholder="Form Title"
        value={formTitle}
        onChange={(e) => setFormTitle(e.target.value)}
        
      />
      <textarea
        placeholder="Form Description"
        value={formDescription}
        onChange={(e) => setFormDescription(e.target.value)}
        
      />

      <div >
        <button onClick={() => addElement('text')}>Add Text Input</button>
        <button onClick={() => addElement('checkbox')}>Add Checkbox</button>
        <button onClick={() => addElement('radio')}>Add Radio Button</button>
        <button onClick={() => addElement('dropdown')}>Add Dropdown</button>
      </div>

      <div >
        <h3>Form Preview</h3>
        {formElements.map((element, index) => (
          <div key={index} className="form-element">
            <input
              type="text"
              placeholder="Label"
              value={element.label}
              onChange={(e) => handleLabelChange(index, e)}
            />
            {element.type === 'checkbox' && (
              <div>
                <input type="checkbox"  />
                <label>{element.label || 'Checkbox'}</label>
              </div>
            )}
            {element.type === 'radio' && (
              <div>
                <label>{element.label || 'Radio Button'}</label>
                {element.options.map((option, optionIndex) => (
                  <div key={optionIndex}>
                    <input type="radio"  />
                    <input
                      type="text"
                      placeholder={`Option ${optionIndex + 1}`}
                      value={option}
                      onChange={(e) => handleOptionChange(index, optionIndex, e)}
                    />
                  </div>
                ))}
                <button onClick={() => addOption(index)}>Add Option</button>
              </div>
            )}
            {element.type === 'dropdown' && (
              <div>
                <label>{element.label || 'Dropdown'}</label>
                <select >
                  {element.options.map((option, optionIndex) => (
                    <option key={optionIndex}>{option || `Option ${optionIndex + 1}`}</option>
                  ))}
                </select>
                <button onClick={() => addOption(index)}>Add Option</button>
                {element.options.map((option, optionIndex) => (
                  <input
                    key={optionIndex}
                    type="text"
                    placeholder={`Option ${optionIndex + 1}`}
                    value={option}
                    onChange={(e) => handleOptionChange(index, optionIndex, e)}
                  />
                ))}
              </div>
            )}
            {element.type === 'text' && (
              <div>
                <input type="text"  placeholder="Text Input" />
                <label>{element.label || 'Text Input'}</label>
              </div>
            )}
          </div>
        ))}
      </div>

      <button className="save-form-button" onClick={handleSaveForm}>
        Save Form
      </button>
    </div>
  );
};

export default FormBuilder;
