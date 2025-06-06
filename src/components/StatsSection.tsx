
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
    <section className="bg-muted/30 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Pourquoi choisir logement-atypique ?</h2>
          <p className="text-xl text-muted-foreground">
            L'expertise et la passion au service de vos escapades
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-xl font-semibold mb-2">
                {stat.label}
              </div>
              <div className="text-muted-foreground">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
