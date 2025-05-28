
import React, { useState } from 'react';
import { MapPin, Phone, Globe, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Support = () => {
  const [location, setLocation] = useState('');

  const supportOrganizations = [
    {
      name: "ANTRA - Associação Nacional de Travestis e Transexuais",
      type: "Organização Nacional",
      address: "São Paulo, SP",
      phone: "(11) 3284-2266",
      website: "antrabrasil.org",
      services: ["Apoio jurídico", "Acompanhamento psicológico", "Capacitação profissional"],
      hours: "Seg-Sex: 9h às 17h"
    },
    {
      name: "Grupo Dignidade",
      type: "ONG",
      address: "Curitiba, PR",
      phone: "(41) 3232-4730",
      website: "grupodignidade.org.br",
      services: ["Orientação jurídica", "Apoio social", "Ativismo"],
      hours: "Seg-Sex: 8h às 18h"
    },
    {
      name: "Casa 1",
      type: "Centro de Acolhimento",
      address: "São Paulo, SP",
      phone: "(11) 3562-1575",
      website: "casa1.org.br",
      services: ["Abrigo temporário", "Apoio psicológico", "Inserção social"],
      hours: "24 horas"
    },
    {
      name: "Instituto Brasileiro de Diversidade Sexual",
      type: "Instituto",
      address: "Rio de Janeiro, RJ",
      phone: "(21) 2240-8894",
      website: "ibdsex.org.br",
      services: ["Pesquisa", "Advocacia", "Formação"],
      hours: "Seg-Sex: 9h às 17h"
    }
  ];

  return (
    <section id="apoio" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Encontre Apoio Próximo a Você
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Localize organizações, advogados especializados e centros de apoio em sua região
          </p>
          
          <div className="max-w-md mx-auto flex space-x-2">
            <Input
              placeholder="Digite sua cidade ou CEP"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="flex-1"
            />
            <Button className="bg-purple-600 hover:bg-purple-700">
              <MapPin className="h-4 w-4 mr-2" />
              Buscar
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {supportOrganizations.map((org, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl text-gray-900">{org.name}</CardTitle>
                    <p className="text-purple-600 font-medium">{org.type}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Globe className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{org.address}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>{org.phone}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{org.hours}</span>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Serviços oferecidos:</h4>
                    <div className="flex flex-wrap gap-2">
                      {org.services.map((service, serviceIndex) => (
                        <span
                          key={serviceIndex}
                          className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
                    Entrar em Contato
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Ver Todas as Organizações
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Support;
