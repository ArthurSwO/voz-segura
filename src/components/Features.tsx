
import React from 'react';
import { FileText, MapPin, MessageCircle, Scale, Phone, Lock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Features = () => {
  const features = [
    {
      icon: FileText,
      title: "Denúncias Seguras",
      description: "Relate violações de direitos de forma anônima ou identificada, com total proteção de dados.",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      icon: Scale,
      title: "Orientação Jurídica",
      description: "Acesse informações sobre seus direitos e orientações de profissionais especializados.",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: MapPin,
      title: "Apoio Local",
      description: "Encontre ONGs, advogados e centros de apoio próximos à sua localização.",
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      icon: MessageCircle,
      title: "Chat de Apoio",
      description: "Converse com voluntários treinados em um ambiente seguro e confidencial.",
      color: "text-pink-600",
      bgColor: "bg-pink-50"
    },
    {
      icon: Phone,
      title: "Linha Direta",
      description: "Acesso a linha telefônica 24h para situações de emergência.",
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      icon: Lock,
      title: "Privacidade Total",
      description: "Criptografia end-to-end e opção de navegação anônima para sua segurança.",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Como podemos te ajudar
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Nossa plataforma oferece múltiplas formas de apoio e proteção para a comunidade LGBT+
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className={`${feature.bgColor} rounded-lg p-3 w-fit`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
