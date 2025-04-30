import React, { useState } from 'react';
import { PrivacyWarning } from './PrivacyWarning';
import { MessageTypeSelector } from './MessageTypeSelector';
import { ResponseDisplay } from './ResponseDisplay';
import { Loader } from './Loader';
import { generateAiResponse } from '../utils/apiService';
import { MessageHistory } from './MessageHistory';
import { MessageType, HistoryItem } from '../types';

export const MessageGenerator: React.FC = () => {
  const [messageType, setMessageType] = useState<MessageType>('email');
  const [instructions, setInstructions] = useState('');
  const [customerMessage, setCustomerMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customerMessage.trim()) {
      setError('Bitte geben Sie eine Kundennachricht ein');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const aiResponse = await generateAiResponse(messageType, instructions, customerMessage);
      setResponse(aiResponse);
      
      setHistory(prev => [
        {
          id: Date.now().toString(),
          messageType,
          customerMessage,
          instructions,
          response: aiResponse,
          timestamp: new Date()
        },
        ...prev.slice(0, 9)
      ]);
      
    } catch (err) {
      setError('Fehler beim Generieren der Antwort. Bitte versuchen Sie es erneut.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const clearForm = () => {
    setInstructions('');
    setCustomerMessage('');
    setResponse('');
    setError(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-slate-800 mb-6">Professionelle Kundenantworten generieren</h2>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <form onSubmit={handleSubmit}>
          <MessageTypeSelector value={messageType} onChange={setMessageType} />
          
          <div className="mb-4">
            <label htmlFor="instructions" className="block text-sm font-medium text-slate-700 mb-1">
              Anweisungen für die Antwort (Optional)
            </label>
            <textarea
              id="instructions"
              placeholder="z.B.: Höflich aber bestimmt antworten, auf unsere 30-Tage-Rückgabe hinweisen, erklären dass wir nicht in dieses Land versenden, etc."
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors min-h-[80px]"
            />
            <p className="text-xs text-slate-500 mt-1">
              Geben Sie spezifische Richtlinien für die KI-Antwort an
            </p>
          </div>
          
          <div className="mb-4">
            <PrivacyWarning />
            
            <label htmlFor="customerMessage" className="block text-sm font-medium text-slate-700 mb-1">
              Kundennachricht <span className="text-red-500">*</span>
            </label>
            <textarea
              id="customerMessage"
              placeholder="Fügen Sie hier die Kundennachricht, Bewertung oder E-Mail ein"
              value={customerMessage}
              onChange={(e) => setCustomerMessage(e.target.value)}
              required
              className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors min-h-[120px]"
            />
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
              {error}
            </div>
          )}
          
          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={clearForm}
              className="px-4 py-2 text-slate-700 bg-slate-100 rounded-md hover:bg-slate-200 transition-colors"
            >
              Zurücksetzen
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? <Loader size="sm" /> : null}
              {loading ? 'Generiere...' : 'Antwort generieren'}
            </button>
          </div>
        </form>
      </div>
      
      {loading ? (
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center h-[200px]">
          <Loader size="lg" />
          <p className="mt-4 text-slate-700">Generiere die perfekte Antwort...</p>
        </div>
      ) : response ? (
        <ResponseDisplay response={response} />
      ) : null}
      
      {history.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-slate-800 mb-4">Letzte Antworten</h3>
          <MessageHistory history={history} />
        </div>
      )}
    </div>
  );
};