const services = [
  {
    key: "cut",
    title: "CUT",
    image: "/assets/service-cut.jpg",
    desc: "顔周りや骨格に合わせた、自然な印象の仕上がりを目指します。",
  },
  {
    key: "color",
    title: "COLOR",
    image: "/assets/hair-salon-photo06.png",
    desc: "髪の状態に合わせて、透明感と扱いやすさを両立させる色味をご提案。",
  },
  {
    key: "treatment",
    title: "TREATMENT",
    image: "/assets/service-treatment.jpg",
    desc: "ダメージケアとまとまりを重視し、日常のヘアケアまで考えた施術です。",
  },
];

export default function Service() {
  return (
    <section id="service" className="section services-section">
      <div className="section-heading">
        <p className="eyebrow">Service</p>
        <h2>最近、髪が扱いにくくなった「何をしてもまとまらない」そんなお悩みはありませんか？</h2>
      </div>
      <div className="services-list">
        {services.map((s) => (
          <div
            key={s.key}
            className="service-item"
            style={{ backgroundImage: `url('${s.image}')` }}
            tabIndex={0}
          >
            <div className="service-item-text">
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="photo-credit">
        Photos: Candace McDaniel /{" "}
        <a href="https://stocksnap.io/" target="_blank" rel="noreferrer">
          StockSnap
        </a>{" "}
        (CC0) [CUT], 出典未確認 [COLOR], geehairimages /{" "}
        <a
          href="https://commons.wikimedia.org/wiki/File:Hair_Oil_Treatment_at_Hair_Salon.jpg"
          target="_blank"
          rel="noreferrer"
        >
          Wikimedia Commons
        </a>{" "}
        (CC BY 2.0) [TREATMENT]
      </p>
    </section>
  );
}
