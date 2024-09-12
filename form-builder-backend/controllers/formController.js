const Form = require('../models/formModel');

const saveForm = async (req, res) => {
  const { title, description, elements } = req.body;

  if (!title || !elements) {
    return res.status(400).json({ message: 'Title and elements are required' });
  }

  try {
    const form = new Form({
      title,
      description,
      elements,
    });

    await form.save();
    res.status(201).json({ message: 'Form saved successfully', form });
  } catch (error) {
    res.status(500).json({ message: 'Error saving form', error: error.message });
  }
};

module.exports = { saveForm };
