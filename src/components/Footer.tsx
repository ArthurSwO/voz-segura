
import React from 'react';
import { Shield, Heart, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="sobre" className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="h-8 w-8 text-purple-400" />
              <h3 className="text-xl font-bold">ProtegeJus</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Plataforma dedicada à proteção e apoio da comunidade LGBT+ através de denúncias seguras e orientação jurídica especializada.
            </p>
            <div className="flex items-center space-x-2 text-gray-400">
              <Heart className="h-4 w-4 text-pink-400" />
              <span className="text-sm">Feito com amor para nossa comunidade</span>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Serviços</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Denúncias Anônimas</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Orientação Jurídica</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Apoio Psicológico</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Localizar ONGs</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Recursos</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Cartilhas Educativas</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Direitos LGBT+</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Legislação</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contatos de Emergência</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-gray-400">
                <Mail className="h-4 w-4" />
                <span>contato@protegejus.org.br</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Phone className="h-4 w-4" />
                <span>0800-LGBT-100</span>
              </div>
            </div>
            
            <div className="mt-6">
              <h5 className="font-semibold mb-2">Emergência 24h</h5>
              <div className="bg-red-600 rounded-lg p-3 text-center">
                <p className="font-bold text-lg">Disque 100</p>
                <p className="text-sm">Direitos Humanos</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 ProtegeJus. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Termos de Uso
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Sobre Nós
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
