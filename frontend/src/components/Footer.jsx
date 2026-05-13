import { useLanguage } from '../context/LanguageContext';

function Footer({ t }) {
  return (
    <footer className="bg-white dark:bg-br-card border-t border-gray-200 dark:border-gray-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-br-green to-br-gold rounded-xl flex items-center justify-center shadow-lg">
              <i className="fa-solid fa-binoculars text-white"></i>
            </div>
            <div>
              <h3 className="font-black text-gray-900 dark:text-white">BR<span className="text-br-green">Scout</span></h3>
              <p className="text-xs text-gray-500">SCOUTING BRASILEIRÃO</p>
            </div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">© 2024 BRScout. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
