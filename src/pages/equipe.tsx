import React from 'react';

const equipe = [
  {
    nom: 'Corentin Robert',
    role: 'Chercheur de logements atypiques',
    photo: 'https://media.licdn.com/dms/image/v2/D5603AQESSE6JRs8Zag/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1714420313845?e=1755129600&v=beta&t=A7I3ZMHn4qRYB8SqjxJkWrP2KLK3SZTpEqzAuCWGbmw',
    bio: "Je pars à la recherche des lieux les plus fous et je papote avec les hôtes pour préparer nos aventures. On fait tout ça pour le fun et pour partager nos découvertes !",
    linkedin: 'https://fr.linkedin.com/in/robertcorentin'
  },
  {
    nom: 'Siméon Robert',
    role: 'Filmmaker',
    photo: 'https://media.licdn.com/dms/image/v2/D4E03AQGvoRbc2ipCbw/profile-displayphoto-shrink_800_800/B4EZbFVc7GHYAc-/0/1747067457874?e=1755129600&v=beta&t=_ZMx1u2ccXQkTEDR35BmgJcmlcukCYF5MA-GjJNsUAQ',
    bio: "Je filme, je pilote le drone, je fais des images qui claquent et je m'amuse à raconter nos trips en vidéo. On est là pour s'éclater et faire rêver !",
    linkedin: 'https://www.linkedin.com/in/boostez-votre-profil-simeon-robert/'
  }
];

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0,0,256,256" className="h-5 w-5" fill="currentColor">
    <g fill="#6d6965" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{mixBlendMode: 'normal'}}>
      <g transform="scale(5.12,5.12)">
        <path d="M41,4h-32c-2.76,0 -5,2.24 -5,5v32c0,2.76 2.24,5 5,5h32c2.76,0 5,-2.24 5,-5v-32c0,-2.76 -2.24,-5 -5,-5zM17,20v19h-6v-19zM11,14.47c0,-1.4 1.2,-2.47 3,-2.47c1.8,0 2.93,1.07 3,2.47c0,1.4 -1.12,2.53 -3,2.53c-1.8,0 -3,-1.13 -3,-2.53zM39,39h-6c0,0 0,-9.26 0,-10c0,-2 -1,-4 -3.5,-4.04h-0.08c-2.42,0 -3.42,2.06 -3.42,4.04c0,0.91 0,10 0,10h-6v-19h6v2.56c0,0 1.93,-2.56 5.81,-2.56c3.97,0 7.19,2.73 7.19,8.26z"></path>
      </g>
    </g>
  </svg>
);

const Equipe = () => (
  <main className="pt-40 pb-16 px-4 max-w-4xl mx-auto">
    <section className="mb-12 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-6">Notre équipe</h1>
      <p className="text-xl text-muted-foreground mb-6">Deux frères passionnés qui voyagent en France pour mettre en avant des logements atypiques (et surtout pour s'amuser !)</p>
    </section>
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {equipe.map((membre) => (
        <div key={membre.nom} className="bg-background border border-border rounded-xl shadow p-6 flex flex-col items-center">
          <img src={membre.photo} alt={membre.nom} className="w-24 h-24 rounded-full object-cover mb-4" />
          <h3 className="text-xl font-bold mb-1">{membre.nom}</h3>
          <span className="text-primary font-semibold mb-2">{membre.role}</span>
          <p className="text-muted-foreground text-sm text-center mb-3">{membre.bio}</p>
          <a href={membre.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline flex items-center gap-1">
            <LinkedInIcon />
          </a>
        </div>
      ))}
    </section>
  </main>
);

export default Equipe; 