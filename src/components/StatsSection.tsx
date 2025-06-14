const StatsSection = () => {
  const stats = [
    {
      number: "150+",
      label: "Lieux sélectionnés",
      description: "Chaque logement est soigneusement choisi"
    },
    {
      number: "13",
      label: "Régions françaises",
      description: "De la Bretagne à la Côte d'Azur"
    },
    {
      number: "98%",
      label: "Clients satisfaits",
      description: "Des séjours mémorables garantis"
    },
    {
      number: "24/7",
      label: "Support client",
      description: "Nous sommes là pour vous accompagner"
    }
  ];

  return (
    <section className="py-16 w-full">
      <div className="w-full px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Des logements qui racontent une histoire
          </h2>
          <p className="text-xl text-muted-foreground">
            Une sélection d'hébergements atypiques que nous vous faisons découvrir en format immersif et filmé
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">8+</div>
            <div className="text-xl font-semibold mb-2">Types de logements</div>
            <div className="text-muted-foreground">Cabanes, châteaux, dômes, yourtes, hôtels particuliers</div>
          </div>

          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">150+</div>
            <div className="text-xl font-semibold mb-2">Logements uniques</div>
            <div className="text-muted-foreground">Sélectionnés après une expérience sur place</div>
          </div>

          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">100%</div>
            <div className="text-xl font-semibold mb-2">Vidéos immersives</div>
            <div className="text-muted-foreground">Photos, vidéos, drone, fpv, récit de l'hôte</div>
          </div>

          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">13</div>
            <div className="text-xl font-semibold mb-2">Régions françaises</div>
            <div className="text-muted-foreground">Île-de-France, Bretagne, Provence, Alsace, Normandie</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
