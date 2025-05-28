
import React from 'react';
import { Book, Download, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Resources = () => {
  const resources = [
    {
      title: "Lei Maria da Penha para LGBT+",
      description: "Entenda como a Lei 11.340/2006 se aplica à violência doméstica em relacionamentos LGBT+",
      type: "Guia Legal",
      downloadUrl: "#"
    },
    {
      title: "Direitos no Ambiente de Trabalho",
      description: "Conheça seus direitos contra discriminação e assédio no local de trabalho",
      type: "Cartilha",
      downloadUrl: "#"
    },
    {
      title: "Processo de Retificação de Nome",
      description: "Passo a passo para alteração de nome e gênero em documentos oficiais",
      type: "Tutorial",
      downloadUrl: "#"
    },
    {
      title: "Criminalização da LGBTfobia",
      description: "Lei 7.716/89 e a equiparação da LGBTfobia ao crime de racismo",
      type: "Informativo",
      downloadUrl: "#"
    }
  ];

  const emergencyContacts = [
    { name: "Disque 100", number: "100", description: "Direitos Humanos" },
    { name: "Disque 180", number: "180", description: "Central da Mulher" },
    { name: "ANTRA", number: "(85) 3224-9876", description: "Apoio à população trans" }
  ];

  return (
    <section id="recursos" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Recursos e Orientações
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Materiais informativos e contatos essenciais para conhecer e exercer seus direitos
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Materiais Informativos</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {resources.map((resource, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <Book className="h-5 w-5 text-purple-600" />
                        <span className="text-sm font-medium text-purple-600">{resource.type}</span>
                      </div>
                      <Button size="sm" variant="ghost" className="p-1">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 mb-4">
                      {resource.description}
                    </CardDescription>
                    <Button size="sm" variant="outline" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Baixar Material
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Contatos de Emergência</h3>
            <div className="space-y-4">
              {emergencyContacts.map((contact, index) => (
                <Card key={index} className="bg-red-50 border-red-200">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold text-gray-900">{contact.name}</h4>
                      <span className="text-2xl font-bold text-red-600">{contact.number}</span>
                    </div>
                    <p className="text-sm text-gray-600">{contact.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <CardContent className="p-6 text-center">
                <h4 className="font-bold text-lg mb-2">Precisa de ajuda imediata?</h4>
                <p className="text-sm mb-4 opacity-90">
                  Em situações de emergência, não hesite em procurar ajuda
                </p>
                <Button className="bg-white text-purple-600 hover:bg-gray-100 w-full">
                  Denunciar Agora
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resources;
