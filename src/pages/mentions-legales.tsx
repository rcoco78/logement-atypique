import React from 'react';

const MentionsLegales = () => (
  <main className="pt-40 pb-16 px-4 max-w-3xl mx-auto">
    <section className="mb-12 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-6">Mentions légales</h1>
      <p className="text-xl text-muted-foreground mb-6">Informations légales du site logement-atypique.fr</p>
    </section>
    <section className="space-y-6 text-muted-foreground text-base">
      <div>
        <h2 className="text-lg font-semibold mb-2">Éditeur du site</h2>
        <p>Logement Atypique SAS<br />
        123 rue de l'Insolite, 75000 Paris<br />
        contact@logement-atypique.fr</p>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2">Directeur de la publication</h2>
        <p>Corentin Robert</p>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2">Hébergement</h2>
        <p>Vercel Inc.<br />
        440 N Barranca Ave #4133, Covina, CA 91723, USA</p>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2">Données personnelles</h2>
        <p>Les informations recueillies font l'objet d'un traitement informatique destiné à la gestion des utilisateurs. Conformément à la loi « informatique et libertés », vous pouvez exercer votre droit d'accès aux données vous concernant et les faire rectifier en contactant : contact@logement-atypique.fr</p>
      </div>
    </section>
  </main>
);

export default MentionsLegales; 