import React, { useState } from 'react';

const faqs = [
  {
    question: "Comment fonctionne logement-atypique.fr ?",
    answer: "Nous sélectionnons des logements uniques partout en France, les filmons en vidéo, et les présentons sur notre plateforme. Vous contactez ensuite directement l'hôte pour réserver."
  },
  {
    question: "Comment proposer mon logement ?",
    answer: "Cliquez sur 'Proposer un logement' et remplissez le formulaire. Nous vous recontactons rapidement pour organiser le tournage vidéo."
  },
  {
    question: "Est-ce que c'est payant pour les propriétaires ?",
    answer: "Non, la mise en avant et le tournage vidéo sont gratuits pour les 50 premiers propriétaires sélectionnés. Nous nous réservons ensuite le droit de demander une participation, notamment pour le référencement. Aujourd'hui, nous demandons simplement une nuit sur place si nécessaire pour le déplacement et pour nous immerger durablement dans le lieu."
  },
  {
    question: "Comment réserver un logement ?",
    answer: "Nous ne gérons pas la réservation directe. Une fois le logement trouvé, contactez l'hôte via les informations fournies."
  },
  {
    question: "Quels types de logements sont acceptés ?",
    answer: "Nous recherchons des lieux atypiques, insolites, ou avec une histoire à raconter, partout en France. Nous voulons de l'atypique dans les logements, mais nous croyons également que l'humain peut avoir des choses à raconter."
  },
  {
    question: "Comment se passe le tournage vidéo ?",
    answer: "Notre équipe se déplace chez vous, filme le logement en format vertical (type reel/TikTok), et met en avant les points forts de votre lieu. Ensuite, nous vous renvoyons également l'ensemble des vidéos et photos, et vous pouvez en faire ce que vous souhaitez."
  },
];

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <main className="pt-40 pb-16 px-4 max-w-2xl mx-auto">
      <section className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">FAQ / Comment ça marche</h1>
      </section>
      <div className="space-y-6">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className={`rounded-xl border border-primary bg-transparent transition-shadow ${open === i ? 'shadow-lg' : ''}`}
          >
            <button
              className="w-full text-left px-6 py-4 font-semibold text-lg text-primary flex items-center justify-between focus:outline-none"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
            >
              {faq.question}
              <span className={`ml-2 transition-transform ${open === i ? 'rotate-90' : ''}`}>▶</span>
            </button>
            {open === i && (
              <div className="px-6 pb-4 text-muted-foreground text-base animate-fade-in">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
};

export default FAQ; 