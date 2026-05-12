// ==================== FOOTER ====================
function Footer() {
    return (
        <footer className="bg-white dark:bg-br-card border-t border-gray-200 dark:border-gray-800 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-br-green to-br-gold rounded-xl flex items-center justify-center shadow-lg">
                            <i className="fa-solid fa-binoculars text-white"></i>
                        </div>
                        <div>
                            <h3 className="font-black text-lg text-gray-900 dark:text-white">BR<span className="text-br-green">Scout</span></h3>
                            <p className="text-xs text-gray-500">Scouting Inteligente do Brasileirão</p>
                        </div>
                    </div>
                    <div className="flex gap-6 text-sm text-gray-500 dark:text-gray-400">
                        <a href="#" className="hover:text-br-green transition-colors">Sobre</a>
                        <a href="#" className="hover:text-br-green transition-colors">API Docs</a>
                        <a href="#" className="hover:text-br-green transition-colors">Contato</a>
                        <a href="#" className="hover:text-br-green transition-colors">Termos</a>
                    </div>
                    <p className="text-xs text-gray-400">© 2026 BRScout. Dados para fins de scouting e análise.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
