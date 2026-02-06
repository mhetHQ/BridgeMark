import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <div className="w-full min-h-screen bg-black dark:bg-black light:bg-background-light text-white dark:text-white light:text-gray-900 overflow-x-hidden">
      {/* <div className="fixed inset-0 pointer-events-none z-0 dot-grid opacity-20" />
      <div className="fixed top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-secondary-accent/10 blur-[120px] pointer-events-none z-0" /> */}

      <Navbar />

      <main className="relative z-10 flex flex-col items-center w-full pt-32 pb-20 px-4 md:px-10">
        <div className="w-full max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-black mb-8">Privacy Policy</h1>
          <p className="text-gray-400 dark:text-gray-400 light:text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

          <div className="prose prose-invert dark:prose-invert light:prose prose-gray max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white dark:text-white light:text-gray-900 mb-4">1. Information We Collect</h2>
              <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 leading-relaxed mb-4">
                We collect information you provide directly to us, including:
              </p>
              <ul className="list-disc list-inside text-gray-400 dark:text-gray-400 light:text-gray-600 space-y-2 ml-4">
                <li>Name and contact information</li>
                <li>Company and business details</li>
                <li>Payment information (processed securely by third parties)</li>
                <li>Communications with us or through our platform</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white dark:text-white light:text-gray-900 mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-gray-400 dark:text-gray-400 light:text-gray-600 space-y-2 ml-4">
                <li>Provide, maintain, and improve our services</li>
                <li>Match businesses with suitable agencies</li>
                <li>Process transactions and send related information</li>
                <li>Send promotional communications (with your consent)</li>
                <li>Respond to your comments and questions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white dark:text-white light:text-gray-900 mb-4">3. Information Sharing</h2>
              <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 leading-relaxed">
                We do not sell your personal information. We may share information with third parties 
                only to provide our services (e.g., payment processors), comply with legal obligations, 
                or protect our rights and the safety of our users.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white dark:text-white light:text-gray-900 mb-4">4. Data Security</h2>
              <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal 
                information against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white dark:text-white light:text-gray-900 mb-4">5. Cookies and Tracking</h2>
              <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 leading-relaxed">
                We use cookies and similar technologies to enhance your experience, analyze usage patterns, 
                and deliver personalized content. You can manage cookie preferences through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white dark:text-white light:text-gray-900 mb-4">6. Your Rights</h2>
              <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 leading-relaxed mb-4">
                Depending on your location, you may have the right to:
              </p>
              <ul className="list-disc list-inside text-gray-400 dark:text-gray-400 light:text-gray-600 space-y-2 ml-4">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt out of marketing communications</li>
                <li>Data portability</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white dark:text-white light:text-gray-900 mb-4">7. Data Retention</h2>
              <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 leading-relaxed">
                We retain your information for as long as necessary to provide our services and fulfill 
                the purposes described in this policy, unless a longer retention period is required by law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white dark:text-white light:text-gray-900 mb-4">8. Contact Us</h2>
              <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 leading-relaxed">
                If you have questions about this Privacy Policy or wish to exercise your rights, 
                please contact us at privacy@bridgemark.tech
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
