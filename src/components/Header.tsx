
import React from 'react';
import { Shield, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const handleEmergencyExit = () => {
    // Redirect to a neutral site for safety
    window.location.href = 'https://www.google.com';
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-purple-600" />
            <h1 className="text-xl font-bold text-gray-900">ProtegeJus</h1>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#inicio" className="text-gray-700 hover:text-purple-600 transition-colors">
              Início
            </a>
            <a href="#recursos" className="text-gray-700 hover:text-purple-600 transition-colors">
              Recursos
            </a>
            <a href="#apoio" className="text-gray-700 hover:text-purple-600 transition-colors">
              Encontrar Apoio
            </a>
            <a href="#sobre" className="text-gray-700 hover:text-purple-600 transition-colors">
              Sobre
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <Button
              onClick={handleEmergencyExit}
              variant="outline"
              size="sm"
              className="border-red-300 text-red-600 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Saída Rápida
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700">
              Entrar
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
