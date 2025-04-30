import React from 'react';
import { AlertTriangle } from 'lucide-react';

export const PrivacyWarning: React.FC = () => {
  return (
    <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-md text-amber-700 text-sm flex gap-2">
      <AlertTriangle className="h-5 w-5 shrink-0" />
      <div>
        <strong className="font-medium">Datenschutzhinweis:</strong> Geben Sie keine persönlichen Informationen wie 
        E-Mail-Adressen, Telefonnummern oder andere identifizierende Details ein. Entfernen oder 
        schwärzen Sie sensible Informationen vor der Übermittlung.
      </div>
    </div>
  );
};