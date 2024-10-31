export function PrivacyPolicyContent() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h1>Privacy Policy</h1>
      <p className="text-muted-foreground">
        Last updated: {new Date().toLocaleDateString()}
      </p>

      <section className="mt-8">
        <h2>Introduction</h2>
        <p>
          At Hirepod, we take your privacy seriously. This Privacy Policy
          explains how we collect, use, disclose, and safeguard your information
          when you use our website and services.
        </p>
      </section>

      <section className="mt-8">
        <h2>Information We Collect</h2>
        <h3>Personal Information</h3>
        <ul>
          <li>Email address</li>
          <li>Name (if provided)</li>
          <li>Professional information (resume, work history)</li>
          <li>Account credentials</li>
        </ul>

        <h3>Usage Information</h3>
        <ul>
          <li>Browser type and version</li>
          <li>Operating system</li>
          <li>Pages visited and interaction with content</li>
          <li>IP address and device information</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2>How We Use Your Information</h2>
        <ul>
          <li>To provide and maintain our service</li>
          <li>To notify you about changes to our service</li>
          <li>To provide customer support</li>
          <li>
            To gather analysis or valuable information to improve our service
          </li>
          <li>To detect, prevent and address technical issues</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2>Data Security</h2>
        <p>
          We implement appropriate technical and organizational security
          measures to protect your personal information. However, no method of
          transmission over the Internet is 100% secure, and we cannot guarantee
          absolute security.
        </p>
      </section>

      <section className="mt-8">
        <h2>Third-Party Services</h2>
        <p>
          We may employ third-party companies and individuals to facilitate our
          service, provide service-related services, or assist us in analyzing
          how our service is used. These third parties have access to your
          personal information only to perform these tasks on our behalf.
        </p>
      </section>

      <section className="mt-8">
        <h2>Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access your personal information</li>
          <li>Correct inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Object to our processing of your information</li>
          <li>Request data portability</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2>Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us
          at:
          <br />
          <a
            href="mailto:privacy@hirepod.com"
            className="text-primary hover:underline"
          >
            privacy@hirepod.com
          </a>
        </p>
      </section>
    </div>
  );
}
