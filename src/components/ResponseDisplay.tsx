import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface ResponseDisplayProps {
  response: string;
}

export const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ response }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="border-b border-slate-200 px-6 py-3 flex justify-between items-center bg-slate-50">
        <h3 className="font-medium text-slate-800">KI-generierte Antwort</h3>
        <button
          onClick={handleCopy}
          className="text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-1 text-sm"
          aria-label="In die Zwischenablage kopieren"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              <span>Kopiert!</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              <span>Kopieren</span>
            </>
          )}
        </button>
      </div>
      <div className="p-6">
        <div className="bg-slate-50 border border-slate-200 rounded-md p-4 whitespace-pre-wrap">
          {response}
        </div>
      </div>
    </div>
  );
};