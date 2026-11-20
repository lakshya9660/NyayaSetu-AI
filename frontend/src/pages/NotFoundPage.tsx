import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, Home, MessageSquare } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center py-16 px-4 text-center space-y-4">
      <div className="w-16 h-16 rounded-2xl bg-teal-50 text-[#8C2839] flex items-center justify-center">
        <Scale className="w-8 h-8" />
      </div>
      <h1 className="text-4xl font-extrabold text-slate-900">404 — Page Not Found</h1>
      <p className="text-xs sm:text-sm text-slate-500 max-w-md">
        The legal information resource or page you requested could not be located.
      </p>
      <div className="flex gap-3 pt-2">
        <Link
          to="/"
          className="px-4 py-2 bg-[#9E394C] hover:bg-teal-500 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
        <Link
          to="/chat"
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Ask Question</span>
        </Link>
      </div>
    </div>
  );
};

