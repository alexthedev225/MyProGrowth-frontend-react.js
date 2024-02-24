import banner_img from "../../assets/banner.jpeg";
import ConseilDuJour from "../../components/ConseilDuJour";

const HomePage = () => {
  return (
    <div>
      <section className="text-center mb-6 ">
        <h2 className="text-pink-500 text-3xl font-bold mb-4">
          Bienvenue sur MyProGrowth
        </h2>
        <p className="text-lg">
        Découvre un parcours de développement personnel à travers la gestion et les conseils sur l&apos;amélioration des compétences, le bien-être physique, le style de vie et l&apos;équilibre émotionnel.
        </p>
      </section>
      <ConseilDuJour />
      {/* Bannière Principale */}
      <section className="banner relative">
        <div
          className="w-full h-96 max-h-screen rounded-lg bg-cover bg-center"
          style={{
            backgroundImage: `url(${banner_img})`,
          }}
        />
        <p className="bg-pink-500 flex items-center justify-center rounded-lg text-white px-2 mt-2 mb-2 pt-4 pb-4 text-center">
          Observe cette fleur, malgré les conditions hostiles de la montagne.
          <br />
          <br />
          Elle as trouvé un moyen de s&apos;epanouir ! <br />
          Elle s&apos;est adaptée à son environnement ! <br />
          Elle as découvert sa propre voie pour prospérer !
          <br />
          <br /> De la même manière, tu dois apprendre a te soumettre aux défis
          de la vie et t&apos;y adapter pour trouver ton épanouissement.
        </p>
      </section>

      {/* Fonctionnalités Mises en Avant */}
      <section className="features">
        {/* Sections dédiées aux fonctionnalités principales */}
        {/* ... */}
      </section>

      {/* Graphiques de Progression */}
      <section className="progress-charts">
        {/* Affichage visuel des progrès réalisés par les utilisateurs */}
        {/* ... */}
      </section>
    </div>
  );
};

export default HomePage;
