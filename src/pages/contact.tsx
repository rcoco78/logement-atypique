import React from 'react';
import { Button } from '@/components/ui/button';

const Contact = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center py-32 px-4">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
        Contactez-nous
      </h1>
      <p className="text-xl text-muted-foreground text-center mb-8 max-w-xl">
        Vous souhaitez échanger&nbsp;? Prenons quelques minutes pour discuter sur WhatsApp ou par email.
      </p>
      <div className="flex flex-col md:flex-row items-center gap-4 w-full max-w-xs md:max-w-2xl">
        <a
          href="https://wa.me/33665761711?text=Bonjour%2C%20je%20souhaite%20obtenir%20plus%20d'informations%20sur%20vos%20logements%20atypiques."
          target="_blank"
          rel="noopener noreferrer"
          className="w-full md:w-1/2"
        >
          <Button
            size="lg"
            className="w-full font-bold text-lg flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white"
          >
            <span className="inline-flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0,0,256,256" className="mr-2">
                <g fill="#ffffff" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{mixBlendMode: 'normal'}}><g transform="scale(5.12,5.12)"><path d="M25,2c-12.682,0 -23,10.318 -23,23c0,3.96 1.023,7.854 2.963,11.29l-2.926,10.44c-0.096,0.343 -0.003,0.711 0.245,0.966c0.191,0.197 0.451,0.304 0.718,0.304c0.08,0 0.161,-0.01 0.24,-0.029l10.896,-2.699c3.327,1.786 7.074,2.728 10.864,2.728c12.682,0 23,-10.318 23,-23c0,-12.682 -10.318,-23 -23,-23zM36.57,33.116c-0.492,1.362 -2.852,2.605 -3.986,2.772c-1.018,0.149 -2.306,0.213 -3.72,-0.231c-0.857,-0.27 -1.957,-0.628 -3.366,-1.229c-5.923,-2.526 -9.791,-8.415 -10.087,-8.804c-0.295,-0.389 -2.411,-3.161 -2.411,-6.03c0,-2.869 1.525,-4.28 2.067,-4.864c0.542,-0.584 1.181,-0.73 1.575,-0.73c0.394,0 0.787,0.005 1.132,0.021c0.363,0.018 0.85,-0.137 1.329,1.001c0.492,1.168 1.673,4.037 1.819,4.33c0.148,0.292 0.246,0.633 0.05,1.022c-0.196,0.389 -0.294,0.632 -0.59,0.973c-0.296,0.341 -0.62,0.76 -0.886,1.022c-0.296,0.291 -0.603,0.606 -0.259,1.19c0.344,0.584 1.529,2.493 3.285,4.039c2.255,1.986 4.158,2.602 4.748,2.894c0.59,0.292 0.935,0.243 1.279,-0.146c0.344,-0.39 1.476,-1.703 1.869,-2.286c0.393,-0.583 0.787,-0.487 1.329,-0.292c0.542,0.194 3.445,1.604 4.035,1.896c0.59,0.292 0.984,0.438 1.132,0.681c0.148,0.242 0.148,1.41 -0.344,2.771z"></path></g></g>
              </svg>
              Échanger sur WhatsApp
            </span>
          </Button>
        </a>
        <a
          href="mailto:contact@logement-atypique.fr?subject=Demande%20d'information%20-%20Logement%20Atypique&body=Bonjour%2C%0A%0AJe%20souhaite%20obtenir%20plus%20d'informations%20sur%20vos%20logements%20atypiques.%0A%0ACordialement%2C"
          className="w-full md:w-1/2"
        >
          <Button
            size="lg"
            variant="outline"
            className="w-full font-bold text-lg flex items-center justify-center gap-2"
          >
            <span className="inline-flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              Échanger par email
            </span>
          </Button>
        </a>
      </div>
    </div>
  );
};

export default Contact; 