import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function TermsPage() {
  return (
    <div className="w-full min-h-screen bg-black dark:bg-black light:bg-background-light text-white dark:text-white light:text-gray-900 overflow-x-hidden">
      {/* <div className="fixed inset-0 pointer-events-none z-0 dot-grid opacity-20" /> */}
      {/* <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-secondary-accent/10 blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px] pointer-events-none z-0" /> */}

      <Navbar />

      <main className="relative z-10 flex flex-col items-center w-full pt-32 pb-20 px-4 md:px-10">
        <div className="w-full max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-black mb-8">Terms of Service</h1>
          <p className="text-gray-400 dark:text-gray-400 light:text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

          <div className="prose prose-invert dark:prose-invert light:prose prose-gray max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white dark:text-white light:text-gray-900 mb-4">1. Agreement to Terms</h2>
              <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 leading-relaxed">
                By accessing or using Bridgemark&apos;s services, you agree to be bound by these Terms of Service. 
                If you do not agree to these terms, please do not use our platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white dark:text-white light:text-gray-900 mb-4">2. Description of Service</h2>
              <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 leading-relaxed">
                Bridgemark is a marketplace platform that connects businesses with marketing agencies. 
                We provide tools for discovery, matching, and communication between parties but do not 
                directly provide marketing services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white dark:text-white light:text-gray-900 mb-4">3. User Accounts</h2>
              <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 leading-relaxed">
                You are responsible for maintaining the confidentiality of your account credentials and 
                for all activities that occur under your account. You must provide accurate and complete 
                information when creating an account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white dark:text-white light:text-gray-900 mb-4">4. Agency Listings</h2>
              <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 leading-relaxed">
                Agencies listed on our platform must provide accurate information about their services, 
                capabilities, and pricing. Bridgemark reserves the right to verify information and remove 
                listings that violate our guidelines.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white dark:text-white light:text-gray-900 mb-4">5. Fees and Payments</h2>
              <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 leading-relaxed">
                Listing fees are non-refundable once an agency profile is published. All fees are clearly 
                disclosed before payment. We use secure third-party payment processors to handle transactions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white dark:text-white light:text-gray-900 mb-4">6. Limitation of Liability</h2>
              <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 leading-relaxed">
                Bridgemark is not responsible for the quality, timing, or outcome of work performed by 
                agencies found through our platform. We facilitate connections but are not party to 
                agreements between businesses and agencies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white dark:text-white light:text-gray-900 mb-4">7. Modifications</h2>
              <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 leading-relaxed">
                We reserve the right to modify these terms at any time. Continued use of our services 
                after changes constitutes acceptance of the modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white dark:text-white light:text-gray-900 mb-4">8. Contact</h2>
              <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 leading-relaxed">
                For questions about these Terms of Service, please contact us at legal@bridgemark.io
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
