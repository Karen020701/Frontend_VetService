import React, { useState } from 'react';
import { createSuggestion } from '../../Services/SuggestionService';

const SuggestionCRUD = () => {
  const [suggestion, setSuggestion] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!suggestion) {
      setMessage('Suggestion is required');
      return;
    }

    try {
      await createSuggestion(suggestion);
      setSuggestion('');
      setMessage('Suggestion submitted successfully');
    } catch (error) {
      setMessage('Failed to submit suggestion');
    }
  };

  return (
    <div>
      <h1>Dejanos tus sugerencias</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="suggestion">Suggestion:</label>
          <input
            id="suggestion"
            type="text"
            value={suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SuggestionCRUD;
