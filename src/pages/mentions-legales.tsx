import React from 'react';

const MentionsLegales = () => (
  <main className="pt-24 md:pt-40 pb-8 md:pb-16 px-4 max-w-3xl mx-auto">
    <section className="mb-8 md:mb-12 text-center">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">Mentions légales</h1>
      <p className="text-lg md:text-xl text-muted-foreground mb-4 md:mb-6">Informations légales du site logement-atypique.fr</p>
    </section>
    <section className="space-y-6 text-muted-foreground text-sm md:text-base">
      <div>
        <h2 className="text-base md:text-lg font-semibold mb-2">Éditeur du site</h2>
        <p>
          Outreacher SARL<br />
          SIREN : 940 287 261<br />
          SIRET : 940 287 261 00017<br />
          Numéro de TVA : FR42940287261<br />
          RCS : 940 287 261 R.C.S. Nanterre<br />
          Capital social : 1 000,00 €<br />
          Forme juridique : SARL<br />
          Date d'inscription : 03/02/2025
        </p>
      </div>
      <div>
        <h2 className="text-base md:text-lg font-semibold mb-2">Directeur de la publication</h2>
        <p>Corentin Robert</p>
      </div>
      <div>
        <h2 className="text-base md:text-lg font-semibold mb-2">Activité</h2>
        <p>
          Outreacher SARL opère une plateforme de mise en avant de logements atypiques. 
          Notre service consiste à mettre en relation les propriétaires de logements atypiques 
          avec des locataires potentiels, moyennant une rémunération des propriétaires pour 
          la mise en avant de leurs biens sur notre plateforme.
        </p>
      </div>
      <div>
        <h2 className="text-base md:text-lg font-semibold mb-2">Hébergement</h2>
        <p>Vercel Inc.<br />
        440 N Barranca Ave #4133, Covina, CA 91723, USA</p>
      </div>
      <div>
        <h2 className="text-base md:text-lg font-semibold mb-2">Données personnelles</h2>
        <p>
          Notre site ne collecte aucune donnée personnelle hormis dans le cas où un utilisateur s'inscrit 
          volontairement à notre newsletter pour être informé des nouveaux logements atypiques disponibles. 
          Dans ce cas uniquement, nous utilisons l'adresse email fournie exclusivement pour envoyer des 
          informations sur les nouveaux biens atypiques mis en ligne.
        </p>
        <p className="mt-2">
          Conformément à la loi « informatique et libertés » et au RGPD, vous pouvez à tout moment 
          exercer votre droit d'accès, de rectification et de suppression de vos données en contactant : 
          contact@logement-atypique.fr
        </p>
      </div>
      <div>
        <h2 className="text-base md:text-lg font-semibold mb-2">Propriété intellectuelle et utilisation du contenu</h2>
        <p>
          L'ensemble des éléments constituant le site (textes, graphismes, logiciels, photographies, images, vidéos, 
          sons, plans, logos, marques, etc.) ainsi que le site lui-même, relèvent des législations françaises et 
          internationales sur le droit d'auteur et la propriété intellectuelle.
        </p>
        <p className="mt-2">
          <strong>Utilisation du contenu par les propriétaires :</strong><br />
          Les propriétaires de logements atypiques dont les biens sont présentés sur notre site sont autorisés à 
          utiliser le contenu produit (textes, photographies, descriptions) à des fins professionnelles pour la 
          promotion de leur bien. Cette autorisation est strictement limitée au propriétaire concerné par le contenu.
        </p>
        <p className="mt-2">
          <strong>Utilisation par des tiers :</strong><br />
          Toute utilisation du contenu par des tiers, y compris d'autres propriétaires, est strictement interdite 
          sans accord préalable écrit de Outreacher SARL. Cela inclut, sans s'y limiter, la reproduction, la 
          modification, la distribution ou l'utilisation commerciale du contenu.
        </p>
      </div>
      <div>
        <h2 className="text-base md:text-lg font-semibold mb-2">Responsabilité</h2>
        <p>
          Les informations fournies sur ce site le sont à titre indicatif. Outreacher SARL ne saurait garantir 
          l'exactitude, la complétude, l'actualité des informations diffusées sur le site. Outreacher SARL met tout 
          en œuvre pour offrir aux utilisateurs des informations et/ou outils disponibles et vérifiés, mais ne saurait 
          être tenue pour responsable des erreurs ou omissions.
        </p>
      </div>
    </section>
  </main>
);

export default MentionsLegales; 