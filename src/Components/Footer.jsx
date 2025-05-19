import React from 'react';
import { Instagram, Linkedin } from 'lucide-react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-400 text-sm py-6 px-4 text-center">
      <div className="flex flex-col sm:flex-row sm:justify-center sm:items-center gap-2 mb-2">
        <span>&copy; {currentYear} ProphetSays. Created by</span>

        <a
          href="https://www.linkedin.com/in/mohammed-jawad018/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1 justify-center"
        >
          <Linkedin size={16} />
          <span>Jawad</span>
        </a>

        <span className="hidden sm:inline">|</span>

        <a
          href="https://www.instagram.com/jawad_0018"
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1 justify-center"
        >
          <Instagram size={16} />
          <span>@jawad</span>
        </a>
      </div>

      <p className="text-xs">
        Powered by{' '}
        <a
          href="https://github.com/fawazahmed0/hadith-api"
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-400 hover:text-emerald-300"
        >
          Hadith API
        </a>.
      </p>
    </footer>
  );
}

export default Footer;
