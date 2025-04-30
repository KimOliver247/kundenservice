import React, { useState } from 'react';
import { HistoryItem } from '../types';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface MessageHistoryProps {
  history: HistoryItem[];
}

export const MessageHistory: React.FC<MessageHistoryProps> = ({ history }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('de-DE', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getMessageTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      email: 'E-Mail',
      review: 'Bewertung',
      social: 'Social Media',
      other: 'Sonstiges',
    };
    return types[type] || 'Nachricht';
  };

  return (
    <div className="space-y-3">
      {history.map((item) => (
        <div key={item.id} className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <div 
            className="px-4 py-3 flex justify-between items-center cursor-pointer hover:bg-slate-50 transition-colors"
            onClick={() => toggleExpand(item.id)}
          >
            <div>
              <div className="font-medium text-slate-800 flex items-center gap-2">
                <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">
                  {getMessageTypeLabel(item.messageType)}
                </span>
                <span className="truncate max-w-[280px] sm:max-w-md">
                  {item.customerMessage.length > 60 
                    ? `${item.customerMessage.substring(0, 60)}...` 
                    : item.customerMessage}
                </span>
              </div>
              <div className="text-xs text-slate-500 mt-1">
                {formatDate(item.timestamp)}
              </div>
            </div>
            <div>
              {expandedId === item.id ? (
                <ChevronUp className="w-5 h-5 text-slate-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-500" />
              )}
            </div>
          </div>
          
          {expandedId === item.id && (
            <div className="px-4 py-3 border-t border-slate-200 bg-slate-50">
              {item.instructions && (
                <div className="mb-3">
                  <div className="text-xs font-medium text-slate-500 mb-1">Anweisungen:</div>
                  <div className="text-sm text-slate-700 bg-white border border-slate-200 p-2 rounded">
                    {item.instructions}
                  </div>
                </div>
              )}
              
              <div className="mb-3">
                <div className="text-xs font-medium text-slate-500 mb-1">Kundennachricht:</div>
                <div className="text-sm text-slate-700 bg-white border border-slate-200 p-2 rounded">
                  {item.customerMessage}
                </div>
              </div>
              
              <div>
                <div className="text-xs font-medium text-slate-500 mb-1">KI-Antwort:</div>
                <div className="text-sm text-slate-700 bg-white border border-slate-200 p-2 rounded">
                  {item.response}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};