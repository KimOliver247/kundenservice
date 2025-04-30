import React from 'react';
import { MessageSquare } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-slate-200">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="text-blue-600 h-6 w-6" />
          <h1 className="text-xl font-semibold text-slate-800">Kundenservice Helfer KI</h1>
        </div>
        <div className="text-sm text-slate-600">
          KI-gestützte professionelle Kundenantworten
        </div>
      </div>
    </header>
  );
};