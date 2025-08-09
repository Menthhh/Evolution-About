export default function Page() {
  return (
    <main className="min-h-screen bg-white text-slate-800">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 text-xl font-bold tracking-tight">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500 text-white font-black">EV</span>
            <span>Evbolution</span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#about" className="hover:text-sky-600">About</a>
            <a href="#articles" className="hover:text-sky-600">Articles</a>
            <a href="#faq" className="hover:text-sky-600">FAQ</a>
            <a href="#contact" className="hover:text-sky-600">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-60" aria-hidden>
          <div className="absolute -top-24 right-0 h-80 w-80 rounded-full bg-sky-200 blur-3xl" />
          <div className="absolute -bottom-24 -left-10 h-80 w-80 rounded-full bg-indigo-200 blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              Islamic Knowledge — Responding to Evolutionary Theory
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              A concise resource hub offering Islamic perspectives that critique, clarify, or respond to the theory of evolution — with references, articles, and FAQs.
            </p>
            <div className="mt-8 flex gap-3">
              <a href="#articles" className="inline-flex items-center rounded-xl bg-sky-600 px-4 py-2 text-white font-medium shadow hover:bg-sky-700">
                Read Articles
              </a>
              <a href="#faq" className="inline-flex items-center rounded-xl border px-4 py-2 font-medium hover:bg-slate-50">
                Common Questions
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-16 border-t">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-2xl font-bold">About Evbolution</h2>
              <p className="mt-4 text-slate-700">
                Evbolution is a static website that curates Islamic scholarship and educational materials addressing questions about human origins and biological change. The aim is respectful engagement: to explain classical and contemporary views, highlight methodological differences, and clarify where evolutionary claims intersect — or conflict — with Islamic creed (\n<strong>ʿaqīdah</strong>\n).
              </p>
              <ul className="mt-6 space-y-3 text-slate-700 list-disc pl-5">
                <li>Summaries of key positions from scholars and institutions</li>
                <li>Concepts glossary (fitrah, creation, Adam (AS), causality)</li>
                <li>FAQs for students and educators (EN/ไทย)</li>
              </ul>
            </div>
            <div className="rounded-2xl border p-6 shadow-sm bg-white">
              <h3 className="font-semibold">ภาษาไทย (Thai blurb)</h3>
              <p className="mt-2 text-slate-700">
                เว็บไซต์นี้รวบรวมองค์ความรู้และมุมมองของอิสลามที่\nตอบโต้/ทบทวน/อธิบายทฤษฎีวิวัฒนาการ โดยคงความสุภาพและเน้นการศึกษาจากหลักฐาน\nทั้งคัมภีร์และผลงานวิชาการ เพื่อให้ผู้อ่านเข้าใจประเด็นที่สอดคล้องหรือขัดแย้งกับอากีดะฮ์\nและจริยธรรมอิสลาม
              </p>
              <div className="mt-4 text-xs text-slate-500">
                หมายเหตุ: เนื้อหาเป็นการให้ความรู้ทั่วไป ไม่ใช่คำวินิจฉัยทางศาสนา (fatwa)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles (placeholder) */}
      <section id="articles" className="py-16 border-t bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold">Featured Topics</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Creation of Adam vs. Common Ancestry",
                desc: "Key theological commitments and why Adam’s creation is treated as exceptional in many Islamic views.",
              },
              {
                title: "What Muslims Mean by ‘Cause’ and ‘Law of Nature’",
                desc: "Occasionalism, secondary causes, and how metaphysics shapes readings of biology.",
              },
              {
                title: "Reading Texts and Reading Nature",
                desc: "Usul al-tafsir and epistemology: limits of empirical claims and scriptural hermeneutics.",
              },
            ].map((card, i) => (
              <article key={i} className="rounded-2xl border bg-white p-6 shadow-sm">
                <h3 className="font-semibold">{card.title}</h3>
                <p className="mt-2 text-slate-700">{card.desc}</p>
                <a href="#contact" className="mt-4 inline-block text-sky-700 hover:underline">Request full article</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 border-t">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold">FAQ</h2>
          <div className="mt-6 space-y-4">
            <details className="group rounded-2xl border p-5 bg-white shadow-sm">
              <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                How does RLS (Row Level Security) relate to public content?
                <span className="ml-4 transition-transform group-open:rotate-180">▾</span>
              </summary>
              <p className="mt-3 text-slate-700">
                This site is static and doesn’t require authentication. If you later add Supabase for comments or submissions, enable RLS and write policies to protect private data.
              </p>
            </details>
            <details className="group rounded-2xl border p-5 bg-white shadow-sm">
              <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                Is this site anti-science?
                <span className="ml-4 transition-transform group-open:rotate-180">▾</span>
              </summary>
              <p className="mt-3 text-slate-700">
                No. The goal is to clarify philosophical and theological boundaries, and to present critiques where claims are seen to exceed empirical support or intersect with creed.
              </p>
            </details>
            <details className="group rounded-2xl border p-5 bg-white shadow-sm">
              <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                ภาษาไทย: จุดยืนของเว็บไซต์คืออะไร?
                <span className="ml-4 transition-transform group-open:rotate-180">▾</span>
              </summary>
              <p className="mt-3 text-slate-700">
                มุ่งอธิบายและรวบรวมทรรศนะของอิสลามต่อประเด็นวิวัฒนาการด้วยความเคารพต่อผู้เห็นต่าง\nและเน้นหลักฐานจากแหล่งความรู้ที่น่าเชื่อถือ
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Call to action / Contact */}
      <section id="contact" className="py-16 border-t bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold">Contribute or Ask a Question</h2>
            <p className="mt-2 text-slate-700">
              Have a resource to suggest, or want a topic covered? Add your request. For a static site, you can link this button to a mailto or a form service.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="mailto:hello@evbolution.example" className="inline-flex items-center rounded-xl bg-sky-600 px-4 py-2 text-white font-medium shadow hover:bg-sky-700">Email Us</a>
              <a href="#" className="inline-flex items-center rounded-xl border px-4 py-2 font-medium hover:bg-slate-50">View Submission Guide</a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-sm text-slate-600 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Evbolution. All rights reserved.</p>
          <nav className="flex items-center gap-6">
            <a href="#about" className="hover:text-slate-900">About</a>
            <a href="#articles" className="hover:text-slate-900">Articles</a>
            <a href="#faq" className="hover:text-slate-900">FAQ</a>
          </nav>
        </div>
      </footer>
    </main>
  );
}
