import { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description:
    "CryptoNavi（仮想通貨ナビ）のプライバシーポリシーです。個人情報の取り扱い、Cookie、アクセス解析、広告配信について説明しています。",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-10 py-4">
      {/* Page Title */}
      <div className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight">
          プライバシーポリシー
        </h1>
        <p className="text-sm text-muted-foreground">
          最終更新日: 2026年1月1日
        </p>
      </div>

      <div className="space-y-10 text-sm leading-relaxed text-slate-300">
        {/* ---------------------------------------------------------------- */}
        {/* Section 1 */}
        {/* ---------------------------------------------------------------- */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            個人情報の取り扱いについて
          </h2>
          <p>
            CryptoNavi - 仮想通貨ナビ（以下「当サイト」といいます）は、ユーザーの個人情報の重要性を認識し、
            個人情報の保護に関する法律（個人情報保護法）および関連する法令・ガイドラインを遵守し、
            ユーザーの個人情報を適切に取り扱います。
          </p>
          <p>
            当サイトでは、お問い合わせフォーム等を通じてお名前、メールアドレスなどの個人情報をご提供いただく場合があります。
            取得した個人情報は、お問い合わせへの対応およびサービス改善の目的でのみ使用し、
            これらの目的以外での利用はいたしません。
          </p>
          <p>
            取得した個人情報は適切に管理し、法令に基づく場合を除き、ユーザーの同意なく第三者に開示・提供することはありません。
            また、個人情報の漏洩、紛失、改ざん等を防止するため、適切なセキュリティ対策を講じています。
          </p>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Section 2 */}
        {/* ---------------------------------------------------------------- */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            Cookieの利用
          </h2>
          <p>
            当サイトでは、ユーザーの利便性向上、アクセス解析、および広告配信のためにCookieを使用しています。
            Cookieとは、Webサイトからユーザーのブラウザに送信される小さなデータファイルで、
            ユーザーのコンピュータに保存されます。
          </p>
          <p>
            Cookieにより収集される情報は、個人を特定するものではありません。
            また、ユーザーはブラウザの設定によりCookieの受け入れを拒否することができますが、
            一部のサービスが正常に機能しなくなる可能性があります。
          </p>
          <h3 className="text-base font-medium text-slate-200">
            当サイトで使用するCookieの種類
          </h3>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <span className="font-medium text-slate-200">
                必須Cookie:
              </span>{" "}
              サイトの基本的な機能を提供するために必要なCookieです。
            </li>
            <li>
              <span className="font-medium text-slate-200">
                分析Cookie:
              </span>{" "}
              アクセス解析のために使用され、サイトの改善に役立てています。
            </li>
            <li>
              <span className="font-medium text-slate-200">
                広告Cookie:
              </span>{" "}
              ユーザーに関連性の高い広告を表示するために使用されます。
            </li>
          </ul>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Section 3 */}
        {/* ---------------------------------------------------------------- */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            アクセス解析ツール
          </h2>
          <p>
            当サイトでは、サイトの利用状況を把握し改善するために、
            Google LLC が提供する「Google Analytics」を利用しています。
          </p>
          <p>
            Google Analyticsは、Cookieを使用してユーザーのアクセス情報を収集します。
            このデータは匿名で収集されており、個人を特定するものではありません。
            収集されるデータには、以下のような情報が含まれます:
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>閲覧ページ・アクセス回数</li>
            <li>滞在時間</li>
            <li>利用環境（ブラウザ、OS、デバイスの種類）</li>
            <li>参照元（流入元URL）</li>
            <li>おおまかな地理的位置（国・地域レベル）</li>
          </ul>
          <p>
            Google Analyticsのデータ収集・処理の仕組みについては、
            <a
              href="https://policies.google.com/technologies/partner-sites"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline hover:text-blue-300"
            >
              Google のプライバシーポリシー
            </a>
            をご確認ください。
          </p>
          <p>
            Google Analyticsによるデータ収集を無効にしたい場合は、
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline hover:text-blue-300"
            >
              Google Analytics オプトアウトアドオン
            </a>
            をインストールしてください。
          </p>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Section 4 */}
        {/* ---------------------------------------------------------------- */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            広告配信について
          </h2>
          <p>
            当サイトでは、第三者配信の広告サービスおよびアフィリエイトプログラムを利用しています。
            これらのサービスでは、ユーザーの興味に応じた商品やサービスの広告を表示するために、
            Cookieが使用されることがあります。
          </p>
          <h3 className="text-base font-medium text-slate-200">
            利用しているアフィリエイトプログラム
          </h3>
          <p>当サイトは、以下のASP（アフィリエイト・サービス・プロバイダ）と提携しています:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>A8.net</li>
            <li>AccessTrade（アクセストレード）</li>
            <li>TCSアフィリエイト</li>
            <li>各取引所の直接アフィリエイトプログラム</li>
          </ul>
          <p>
            当サイトに掲載されているリンクの一部はアフィリエイトリンクであり、
            ユーザーがリンクを経由して商品・サービスを購入または申し込みされた場合、
            当サイトに紹介料が支払われることがあります。
            これによりユーザーに追加の費用が発生することはありません。
          </p>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Section 5 */}
        {/* ---------------------------------------------------------------- */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">免責事項</h2>
          <p>
            当サイトに掲載されている情報は、できる限り正確な情報を提供するよう努めておりますが、
            その正確性、完全性、有用性を保証するものではありません。
          </p>
          <p>
            当サイトの情報を利用したことにより生じたいかなる損害についても、
            当サイトおよび運営者は一切の責任を負いません。
            暗号資産への投資は価格変動リスクが伴い、元本を失う可能性がありますので、
            投資判断はご自身の責任において行ってください。
          </p>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Section 6 */}
        {/* ---------------------------------------------------------------- */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">お問い合わせ</h2>
          <p>
            プライバシーポリシーに関するご質問やお問い合わせ、
            個人情報の開示・訂正・削除等のご請求については、
            以下のメールアドレスまでご連絡ください。
          </p>
          <div className="rounded-lg border border-slate-700/40 bg-slate-800/30 p-4">
            <p className="text-slate-200">
              <span className="font-medium">サイト名:</span> CryptoNavi -
              仮想通貨ナビ
            </p>
            <p className="mt-1 text-slate-200">
              <span className="font-medium">URL:</span>{" "}
              <a
                href="https://cryptonavi.jp"
                className="text-blue-400 underline hover:text-blue-300"
              >
                https://cryptonavi.jp
              </a>
            </p>
            <p className="mt-1 text-slate-200">
              <span className="font-medium">お問い合わせ:</span>{" "}
              info@cryptonavi.jp
            </p>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Policy changes */}
        {/* ---------------------------------------------------------------- */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            プライバシーポリシーの変更
          </h2>
          <p>
            当サイトは、必要に応じて本プライバシーポリシーを変更することがあります。
            変更後のプライバシーポリシーは、当ページに掲載された時点で効力を生じるものとします。
            重要な変更がある場合は、当サイト上でお知らせいたします。
          </p>
        </section>
      </div>
    </div>
  );
}
