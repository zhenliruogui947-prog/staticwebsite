const menuItems = [
  { name: "カット", price: "¥6,600〜" },
  { name: "カラー", price: "¥8,800〜" },
  { name: "トリートメント", price: "¥4,400〜" },
  { name: "パーマ", price: "¥9,900〜" },
  { name: "縮毛矯正", price: "¥13,200〜" },
];

export default function Menu() {
  return (
    <section id="menu" className="section menu-section">
      <div className="section-heading">
        <p className="eyebrow">Menu</p>
        <h2>メニュー・料金</h2>
      </div>
      <ul className="menu-list">
        {menuItems.map((item) => (
          <li key={item.name}>
            <span className="menu-name">{item.name}</span>
            <span className="menu-price">{item.price}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
