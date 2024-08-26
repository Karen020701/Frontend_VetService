import React, { useState } from 'react';
import { createSuggestion } from '../../Services/SuggestionService';

const SuggestionUser = () => {
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
      <h1>Sugerencias</h1>
      <form onSubmit={handleSubmit}>
        <div>
        <div class="suggestion-container">
  <label htmlFor="suggestion" class="suggestion-label">Dejanos sugerencias:</label>
  <input
    id="suggestion"
    type="text"
    value={suggestion}
    onChange={(e) => setSuggestion(e.target.value)}
    class="suggestion-input"
  />
</div>
        </div>
        <button type="submit">Enviar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SuggestionUser;
