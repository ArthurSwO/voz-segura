
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Resources from '@/components/Resources';
import Support from '@/components/Support';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Features />
      <Resources />
      <Support />
      <Footer />
    </div>
  );
};

export default Index;
