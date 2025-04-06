import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';
import './PrivacyPolicy.css'; // Reusing the same styles

const TermsOfService = () => {
  const handleHomeNavigation = () => {
    window.location.href = '/';
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="policy-page">
      <div className="shape shape1"></div>
      <div className="shape shape2"></div>
      <div className="shape shape3"></div>

      <div className="container">
        <a href="#" className="back-link" onClick={(e) => { e.preventDefault(); handleHomeNavigation(); }}>
          <FaArrowLeft /> Back to Home
        </a>

        <motion.div 
          className="policy-header"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h1>Terms of Service</h1>
          <p>Last updated: June 2023</p>
        </motion.div>

        <motion.div 
          className="policy-content"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <section className="policy-section">
            <h2>1. Introduction</h2>
            <p>Welcome to E-Waste Recycling. These Terms of Service govern your use of our website and the services we offer. By accessing or using our services, you agree to be bound by these Terms.</p>
          </section>

          <section className="policy-section">
            <h2>2. Definitions</h2>
            <p>Throughout these Terms of Service, the terms "we", "us", and "our" refer to E-Waste Recycling. "Service" refers to our website and all services provided by E-Waste Recycling. "You" refers to you, as a user of our Service.</p>
          </section>

          <section className="policy-section">
            <h2>3. Use of Service</h2>
            <p>You agree to use our Service only for purposes that are permitted by:</p>
            <ul>
              <li>These Terms of Service</li>
              <li>Any applicable law, regulation, or generally accepted practices or guidelines in the relevant jurisdictions</li>
            </ul>
            <p>You may not engage in any activity that interferes with or disrupts the Service (or the servers and networks which are connected to the Service).</p>
          </section>

          <section className="policy-section">
            <h2>4. E-Waste Collection and Recycling</h2>
            <p>Our service includes the collection and recycling of electronic waste. By using our services, you agree that:</p>
            <ul>
              <li>All electronic devices and components submitted for recycling must be legally owned by you or you have authorization to recycle them.</li>
              <li>You are responsible for removing all personal data from devices before submitting them for recycling.</li>
              <li>We are not responsible for any data left on devices submitted for recycling.</li>
              <li>Hazardous materials must be properly disclosed during the submission process.</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>5. Intellectual Property</h2>
            <p>The Service and its original content, features, and functionality are and will remain the exclusive property of E-Waste Recycling. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of E-Waste Recycling.</p>
          </section>

          <section className="policy-section">
            <h2>6. Limitation of Liability</h2>
            <p>In no event shall E-Waste Recycling, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:</p>
            <ul>
              <li>Your access to or use of or inability to access or use the Service;</li>
              <li>Any conduct or content of any third party on the Service;</li>
              <li>Any content obtained from the Service; and</li>
              <li>Unauthorized access, use or alteration of your transmissions or content.</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>7. Governing Law</h2>
            <p>These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.</p>
            <p>Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.</p>
          </section>

          <section className="policy-section">
            <h2>8. Changes to Terms</h2>
            <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the Service.</p>
          </section>
        </motion.div>

        <div className="policy-footer">
          <p>&copy; 2023 E-Waste Recycling. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService; 