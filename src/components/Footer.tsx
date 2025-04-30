import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 py-4 px-4">
      <div className="container mx-auto text-center text-slate-500 text-sm">
        <p>© {new Date().getFullYear()} Kundenservice Helfer KI. Alle Rechte vorbehalten.</p>
        <p className="mt-1">Wir speichern keine Kundendaten. Alle Nachrichten werden sicher verarbeitet.</p>
        <p className="mt-2">
          <a 
            href="https://www.ihk-muenchen.de/de/Service/Recht-und-Steuern/Datenschutz/ki/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            IHK München - KI und Datenschutz
          </a>
        </p>
      </div>
    </footer>
  );
};