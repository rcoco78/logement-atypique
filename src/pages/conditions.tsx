const ConditionsPage = () => {
  return (
    <main className="pt-24 md:pt-40 pb-8 md:pb-16 px-4 max-w-3xl mx-auto">
      <section className="mb-8 md:mb-12 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">Conditions générales d'utilisation</h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-4 md:mb-6">Politique de confidentialité et conditions d'utilisation de logement-atypique.fr</p>
      </section>

      <section className="space-y-6 text-muted-foreground text-sm md:text-base">
        <div>
          <h2 className="text-base md:text-lg font-semibold mb-2">1. Acceptation des conditions</h2>
          <p>
            En accédant et en utilisant le site logement-atypique.fr, vous acceptez d'être lié par les présentes 
            conditions générales d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser le site.
          </p>
        </div>

        <div>
          <h2 className="text-base md:text-lg font-semibold mb-2">2. Description du service</h2>
          <p>
            Logement-atypique.fr est une plateforme de mise en relation entre propriétaires de logements atypiques 
            et visiteurs intéressés. Le site ne gère pas directement les locations mais met en relation les parties 
            concernées.
          </p>
        </div>

        <div>
          <h2 className="text-base md:text-lg font-semibold mb-2">3. Utilisation du site</h2>
          <p>
            En tant qu'utilisateur, vous vous engagez à :
          </p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Fournir des informations exactes et complètes</li>
            <li>Ne pas utiliser le site à des fins illégales ou interdites</li>
            <li>Ne pas tenter d'accéder à des zones protégées du site</li>
            <li>Ne pas perturber le fonctionnement normal du site</li>
          </ul>
        </div>

        <div>
          <h2 className="text-base md:text-lg font-semibold mb-2">4. Politique de confidentialité</h2>
          <p>
            <strong>4.1 Collecte des données</strong><br />
            Nous collectons uniquement les données nécessaires au fonctionnement du service :
            - Pour les visiteurs : aucune donnée n'est collectée sauf en cas d'inscription à la newsletter
            - Pour les propriétaires : données nécessaires à la gestion de leur compte et de leurs annonces
          </p>
          <p className="mt-2">
            <strong>4.2 Utilisation des données</strong><br />
            Les données collectées sont utilisées uniquement pour :
            - Gérer votre compte et vos annonces
            - Vous envoyer des informations sur les nouvelles propriétés (si vous êtes inscrit à la newsletter)
            - Améliorer nos services
          </p>
          <p className="mt-2">
            <strong>4.3 Protection des données</strong><br />
            Vos données sont protégées conformément au Règlement Général sur la Protection des Données (RGPD) 
            et à la loi Informatique et Libertés.
          </p>
        </div>

        <div>
          <h2 className="text-base md:text-lg font-semibold mb-2">5. Cookies</h2>
          <p>
            Notre site utilise uniquement des cookies techniques essentiels au fonctionnement du site. 
            Nous n'utilisons pas de cookies de suivi ou de publicité.
          </p>
        </div>

        <div>
          <h2 className="text-base md:text-lg font-semibold mb-2">6. Droits des utilisateurs</h2>
          <p>
            Conformément au RGPD, vous disposez des droits suivants :
          </p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Droit d'accès à vos données</li>
            <li>Droit de rectification</li>
            <li>Droit à l'effacement</li>
            <li>Droit à la limitation du traitement</li>
            <li>Droit à la portabilité des données</li>
            <li>Droit d'opposition</li>
          </ul>
          <p className="mt-2">
            Pour exercer ces droits, contactez-nous à l'adresse email : contact@logement-atypique.fr
          </p>
        </div>

        <div>
          <h2 className="text-base md:text-lg font-semibold mb-2">7. Modifications</h2>
          <p>
            Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications prennent effet 
            dès leur publication sur le site. Nous vous invitons à consulter régulièrement cette page pour prendre 
            connaissance des éventuelles modifications.
          </p>
        </div>

        <div>
          <h2 className="text-base md:text-lg font-semibold mb-2">8. Contact</h2>
          <p>
            Pour toute question concernant ces conditions ou la politique de confidentialité, vous pouvez nous 
            contacter à l'adresse email : contact@logement-atypique.fr
          </p>
        </div>
      </section>
    </main>
  );
};

export default ConditionsPage; 