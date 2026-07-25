export default function Gallery() {
  return (
    <section id="gallery" className="section gallery-section">
      <div className="section-heading">
        <p className="eyebrow">Gallery</p>
        <h2>サロンの雰囲気をご覧ください。</h2>
      </div>
      <div className="photo-gallery">
        <img src="/assets/photo-color.jpg" alt="カラーリング施術の様子" loading="lazy" />
        <img
          src="/assets/hair-item2.png"
          alt="シャンプー・コンディショナー・トリートメント・ヘアオイルのボトル"
          loading="lazy"
        />
        <img src="/assets/photo-interior.jpg" alt="サロンの内装イメージ" loading="lazy" />
      </div>
      <p className="photo-credit">
        Photos:{" "}
        <a href="https://hairspies.com/" target="_blank" rel="noreferrer">
          Hair Spies
        </a>{" "}
        (CC BY 2.0), 出典未確認,{" "}
        <a
          href="https://commons.wikimedia.org/wiki/File:Hair_Salon_Stations.jpg"
          target="_blank"
          rel="noreferrer"
        >
          Wikimedia Commons
        </a>{" "}
        (CC BY-SA 4.0)
      </p>
    </section>
  );
}
