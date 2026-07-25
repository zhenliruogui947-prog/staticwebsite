export default function Hero() {
  return (
    <section
      className="hero"
      style={{ backgroundImage: "url('/assets/1747600151-PTUWjC86hVZ0RXGi5Orxa2Yn.webp')" }}
    >
      <div className="hero-copy">
        <p className="eyebrow">個々の髪質に寄り添う、上質なヘアケア</p>
        <h1>髪の悩みを、あなたらしい美しさへ。</h1>
        <p className="lead">
          カウンセリングから施術、仕上がりまで丁寧に。髪質や悩みに合わせたご提案を通じて、
          毎日の自分らしさを支えます。
        </p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#booking">
            予約する
          </a>
          <a className="btn btn-secondary" href="#concept">
            コンセプトを見る
          </a>
        </div>
      </div>
    </section>
  );
}
