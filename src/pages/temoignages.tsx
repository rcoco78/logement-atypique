import React from 'react';
import { Button } from '@/components/ui/button';

const testimonials = [
  { id: 1, video: 'https://www.youtube.com/embed/jW1dy9ZCyRk', name: 'Sophie, hôte en Bretagne', ratio: 'aspect-[9/16]' },
  { id: 2, video: 'https://www.w3schools.com/html/movie.mp4', name: 'Jean, hôte en Provence', ratio: 'aspect-[4/5]' },
  { id: 3, video: 'https://www.youtube.com/embed/1La4QzGeaaQ', name: 'Claire, hôte en Alsace', ratio: 'aspect-[3/4]' },
  { id: 4, video: 'https://www.w3schools.com/html/movie.mp4', name: 'Marc, hôte en Île-de-France', ratio: 'aspect-[2/3]' },
  { id: 5, video: 'https://www.youtube.com/embed/2Vv-BfVoq4g', name: 'Lucie, hôte en Dordogne', ratio: 'aspect-[9/16]' },
  { id: 6, video: 'https://www.w3schools.com/html/movie.mp4', name: 'Paul, hôte en Savoie', ratio: 'aspect-[4/5]' },
  { id: 7, video: 'https://www.youtube.com/embed/3JZ_D3ELwOQ', name: 'Emma, hôte en Bretagne', ratio: 'aspect-[3/4]' },
  { id: 8, video: 'https://www.w3schools.com/html/movie.mp4', name: 'Julien, hôte en Normandie', ratio: 'aspect-[2/3]' },
  { id: 9, video: 'https://www.youtube.com/embed/4NRXx6U8ABQ', name: 'Amandine, hôte en Ardèche', ratio: 'aspect-[9/16]' },
  { id: 10, video: 'https://www.w3schools.com/html/movie.mp4', name: 'Hugo, hôte en Gironde', ratio: 'aspect-[4/5]' },
  { id: 11, video: 'https://www.youtube.com/embed/5qap5aO4i9A', name: 'Nina, hôte en Corse', ratio: 'aspect-[3/4]' },
  { id: 12, video: 'https://www.w3schools.com/html/movie.mp4', name: 'Louis, hôte en Auvergne', ratio: 'aspect-[2/3]' },
];

const isYoutube = (url: string) => url.includes('youtube.com/embed');

const Temoignages = () => {
  return (
    <main className="pt-40 pb-16 px-4 max-w-7xl mx-auto">
      <section className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Témoignages de propriétaires</h1>
        <p className="text-xl text-muted-foreground mb-6">Ils ont fait confiance à logement-atypique pour mettre en lumière leur lieu. Découvrez leurs retours d'expérience en vidéo.</p>
      </section>
      <section className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
        {testimonials.map((t, idx) => {
          const ratioClass = `aspect-[4/5] md:${t.ratio}`;
          if (idx === Math.floor(testimonials.length / 2)) {
            return (
              <a
                key="google-reviews"
                href="https://www.google.com/maps/place/logement-atypique"
                target="_blank"
                rel="noopener noreferrer"
                className="break-inside-avoid mb-6 relative overflow-hidden rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary flex flex-col items-center justify-center min-h-[340px] p-6 transition-transform hover:scale-105 cursor-pointer"
                style={{ textDecoration: 'none' }}
              >
                <div className={`flex flex-col items-center justify-center h-full w-full ${ratioClass}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0,0,256,256" className="h-12 w-12 text-primary mb-2">
                    <g fill="#885c3f" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{mixBlendMode: 'normal'}}><g transform="scale(5.12,5.12)"><path d="M 26 2 C 13.308594 2 3 12.308594 3 25 C 3 37.691406 13.308594 48 26 48 C 35.917969 48 41.972656 43.4375 45.125 37.78125 C 48.277344 32.125 48.675781 25.480469 47.71875 20.9375 L 47.53125 20.15625 L 46.75 20.15625 L 26 20.125 L 25 20.125 L 25 30.53125 L 36.4375 30.53125 C 34.710938 34.53125 31.195313 37.28125 26 37.28125 C 19.210938 37.28125 13.71875 31.789063 13.71875 25 C 13.71875 18.210938 19.210938 12.71875 26 12.71875 C 29.050781 12.71875 31.820313 13.847656 33.96875 15.6875 L 34.6875 16.28125 L 41.53125 9.4375 L 42.25 8.6875 L 41.5 8 C 37.414063 4.277344 31.960938 2 26 2 Z M 26 4 C 31.074219 4 35.652344 5.855469 39.28125 8.84375 L 34.46875 13.65625 C 32.089844 11.878906 29.199219 10.71875 26 10.71875 C 18.128906 10.71875 11.71875 17.128906 11.71875 25 C 11.71875 32.871094 18.128906 39.28125 26 39.28125 C 32.550781 39.28125 37.261719 35.265625 38.9375 29.8125 L 39.34375 28.53125 L 27 28.53125 L 27 22.125 L 45.84375 22.15625 C 46.507813 26.191406 46.066406 31.984375 43.375 36.8125 C 40.515625 41.9375 35.320313 46 26 46 C 14.386719 46 5 36.609375 5 25 C 5 13.390625 14.386719 4 26 4 Z"></path></g></g>
                  </svg>
                  <h3 className="font-bold text-xl mb-1 text-primary text-center">Google Reviews</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-yellow-400 text-lg">★★★★★</span>
                    <span className="text-lg text-foreground">4.9/5</span>
                    <span className="text-muted-foreground text-base">(37 avis)</span>
                  </div>
                  <div className="w-full flex flex-col gap-2 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">La vidéo&nbsp;:</span>
                      <span className="text-yellow-400">★★★★★</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">L'organisation&nbsp;:</span>
                      <span className="text-yellow-400">★★★★★</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Impact business&nbsp;:</span>
                      <span className="text-yellow-400">★★★★★</span>
                    </div>
                  </div>
                  <div className="text-muted-foreground text-center text-base max-w-xs">Après chaque tournage, les propriétaires nous laissent une note sur leur expérience.</div>
                </div>
              </a>
            );
          }
          return (
            <div key={t.id} className={`break-inside-avoid mb-6 rounded-xl p-0`}>
              <div className={`relative overflow-hidden rounded-lg mb-2 ${ratioClass}`}>
                {isYoutube(t.video) ? (
                  <iframe
                    src={t.video}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full rounded-lg"
                    title={t.name}
                  />
                ) : (
                  <video
                    src={t.video}
                    controls
                    playsInline
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 rounded-lg"
                    style={{ border: 'none', boxShadow: 'none' }}
                  />
                )}
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1 text-primary text-center">{t.name}</h3>
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
};

export default Temoignages; 