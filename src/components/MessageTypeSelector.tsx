import React from 'react';
import { MessageType } from '../types';

interface MessageTypeSelectorProps {
  value: MessageType;
  onChange: (value: MessageType) => void;
}

export const MessageTypeSelector: React.FC<MessageTypeSelectorProps> = ({ value, onChange }) => {
  const options: { value: MessageType; label: string; description: string }[] = [
    { 
      value: 'email', 
      label: 'E-Mail', 
      description: 'Generiere eine formelle E-Mail-Antwort mit Anrede und Signatur' 
    },
    { 
      value: 'review', 
      label: 'Bewertung', 
      description: 'Erstelle eine präzise Antwort auf eine Produkt- oder Servicebewertung' 
    },
    { 
      value: 'social', 
      label: 'Social Media', 
      description: 'Verfasse eine lockere aber professionelle Antwort für soziale Plattformen' 
    },
    { 
      value: 'other', 
      label: 'Sonstiges', 
      description: 'Allgemeine Kundenservice-Antwort für jeden anderen Kontext' 
    },
  ];

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-slate-700 mb-2">
        Nachrichtentyp <span className="text-red-500">*</span>
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`text-left p-4 rounded-md transition-all duration-200 border ${
              value === option.value
                ? 'border-blue-500 bg-blue-50 shadow-sm'
                : 'border-slate-200 hover:border-blue-300 hover:bg-blue-50/50'
            }`}
          >
            <div className="font-medium text-slate-800">{option.label}</div>
            <div className="text-xs text-slate-500 mt-1">{option.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
};