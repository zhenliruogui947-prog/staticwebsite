import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { deleteBooking, getBookings } from "../lib/bookings";

// 簡易的な合言葉です。実際の運用では本物の認証に置き換えてください。
const PASSCODE = "uru2026";

function formatCreatedAt(iso) {
  return new Date(iso).toLocaleString("ja-JP");
}

export default function OwnerPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    document.title = "予約管理 | hair salon URU by charmant";
  }, []);

  const refresh = () => {
    const sorted = getBookings().sort((a, b) => {
      if (a.date !== b.date) return a.date < b.date ? -1 : 1;
      return a.time < b.time ? -1 : 1;
    });
    setBookings(sorted);
  };

  const handleGateSubmit = (e) => {
    e.preventDefault();
    if (passcode === PASSCODE) {
      setAuthenticated(true);
      refresh();
    } else {
      alert("合言葉が違います。");
    }
  };

  const handleDelete = (id) => {
    deleteBooking(id);
    refresh();
  };

  return (
    <>
      <Header showNav={false} />
      <main className="section owner-section">
        <div className="section-heading">
          <p className="eyebrow">Owner Only</p>
          <h2>予約管理ページ</h2>
        </div>

        {!authenticated && (
          <div className="contact-card">
            <p>このページはオーナー専用です。合言葉を入力してください。</p>
            <form className="owner-gate-form" onSubmit={handleGateSubmit}>
              <input
                type="password"
                placeholder="合言葉"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">
                表示する
              </button>
            </form>
            <p className="booking-note-small">
              ※このロックは簡易的なものです。ブラウザの開発者ツールなどで内容を見られる可能性があるため、実運用では本物の認証基盤の導入をおすすめします。
            </p>
          </div>
        )}

        {authenticated && (
          <div>
            <div className="owner-toolbar">
              <p>予約件数: {bookings.length}件</p>
              <button type="button" className="btn btn-secondary" onClick={refresh}>
                更新
              </button>
            </div>
            <div className="owner-table-wrap">
              <table className="owner-table">
                <thead>
                  <tr>
                    <th>日付</th>
                    <th>時間</th>
                    <th>お名前</th>
                    <th>連絡先</th>
                    <th>ご要望</th>
                    <th>受付日時</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr key={b.id}>
                      <td>{b.date.replaceAll("-", "/")}</td>
                      <td>{b.time}</td>
                      <td>{b.name}</td>
                      <td>{b.contact}</td>
                      <td>{b.memo || "-"}</td>
                      <td>{formatCreatedAt(b.createdAt)}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-secondary owner-delete-btn"
                          onClick={() => handleDelete(b.id)}
                        >
                          削除
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {bookings.length === 0 && <p className="booking-placeholder">現在、予約はありません。</p>}
            <p className="booking-note-small">
              ※この一覧は、お客様が予約フォームを送信したブラウザに保存されたデータのみを表示するデモです。実際の運用では、全端末で共有されるサーバー側のデータベースが必要です。
            </p>
          </div>
        )}
      </main>
      <Footer showLinks={false} />
    </>
  );
}
