export default function Location() {
  return (
    <section id="location" className="section location-section">
      <div className="section-heading">
        <p className="eyebrow">Location</p>
        <h2>心地よい時間を過ごせる、上質な空間へ。</h2>
      </div>
      <div className="location-grid">
        <dl className="location-info">
          <div>
            <dt>住所</dt>
            <dd>東京都渋谷区〇〇1-2-3 〇〇ビル2F</dd>
          </div>
          <div>
            <dt>アクセス</dt>
            <dd>渋谷駅より徒歩5分</dd>
          </div>
          <div>
            <dt>営業時間</dt>
            <dd>10:00 - 19:00</dd>
          </div>
          <div>
            <dt>定休日</dt>
            <dd>毎週月曜日</dd>
          </div>
          <div>
            <dt>電話番号</dt>
            <dd>03-1234-5678</dd>
          </div>
        </dl>
        <div className="location-map" aria-hidden="true">
          MAP
        </div>
      </div>
    </section>
  );
}
