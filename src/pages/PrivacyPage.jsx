import { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function PrivacyPage() {
  useEffect(() => {
    document.title = "プライバシーポリシー | hair salon URU by charmant";
  }, []);

  return (
    <>
      <Header onHomePage={false} />
      <main>
        <section className="section policy-section">
          <div className="section-heading">
            <p className="eyebrow">Privacy Policy</p>
            <h1>プライバシーポリシー</h1>
          </div>

          <div className="policy-body">
            <p>
              hair salon URU by
              charmant(以下「当サロン」といいます)は、お客様の個人情報を適切に取り扱うことが社会的責務であると考え、以下のとおりプライバシーポリシーを定めます。
            </p>

            <h2>1. 取得する情報</h2>
            <p>
              当サロンは、ご予約・お問い合わせの際に、お名前、電話番号、メールアドレス、SNSアカウント等の情報をお客様よりご提供いただく場合があります。
            </p>

            <h2>2. 利用目的</h2>
            <p>取得した個人情報は、以下の目的の範囲内で利用します。</p>
            <ul>
              <li>ご予約の確認・管理、施術に関するご案内のため</li>
              <li>お問い合わせへの対応のため</li>
              <li>サービス向上のための分析・検討のため</li>
            </ul>

            <h2>3. 外部サービスの利用</h2>
            <p>
              ご予約は外部の予約プラットフォーム(HotPepper Beauty等)を通じて承っております。これらのサービスにおける個人情報の取り扱いについては、各サービスのプライバシーポリシーが適用されます。また、当サイトからはInstagram等のSNSへのリンクを設置していますが、リンク先での情報の取り扱いについては各サービスの規定に従います。
            </p>

            <h2>4. 第三者提供</h2>
            <p>当サロンは、法令に基づく場合を除き、お客様の同意なく個人情報を第三者に提供することはありません。</p>

            <h2>5. 個人情報の管理</h2>
            <p>
              当サロンは、お預かりした個人情報の紛失、破壊、改ざん及び漏えいを防止するため、適切な安全管理措置を講じます。
            </p>

            <h2>6. 開示・訂正・削除等のご請求</h2>
            <p>
              お客様ご本人からの個人情報の開示・訂正・削除等のご請求については、本人確認のうえ、合理的な期間内に対応いたします。ご希望の場合は、下記お問い合わせ先までご連絡ください。
            </p>

            <h2>7. プライバシーポリシーの変更</h2>
            <p>
              本ポリシーの内容は、法令の変更やサービス内容の変更等に応じて、予告なく変更することがあります。変更後のプライバシーポリシーは、本ページに掲載した時点から効力を生じるものとします。
            </p>

            <h2>8. お問い合わせ窓口</h2>
            <p>
              本ポリシーに関するお問い合わせは、下記までご連絡ください。
              <br />
              hair salon URU by charmant
              <br />
              電話番号:03-1234-5678
            </p>

            <p className="policy-updated">制定日:2026年7月19日</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
