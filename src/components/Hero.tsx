
import React from 'react';
import { Heart, Shield, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section id="inicio" className="bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Sua <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">voz</span> importa,
            <br />
            seus <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">direitos</span> são protegidos
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Uma plataforma segura para denúncias, orientação jurídica e apoio à comunidade LGBT+. 
            Conectamos você aos recursos e profissionais que podem te ajudar.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 px-8 py-3">
              Fazer Denúncia
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-3">
              Buscar Orientação
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">100% Seguro</h3>
              <p className="text-gray-600 text-sm">
                Seus dados são protegidos com criptografia de ponta
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-pink-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Heart className="h-8 w-8 text-pink-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Apoio Especializado</h3>
              <p className="text-gray-600 text-sm">
                Profissionais capacitados para questões LGBT+
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Comunidade Forte</h3>
              <p className="text-gray-600 text-sm">
                Conecte-se com outros e compartilhe experiências
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
