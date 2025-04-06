import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
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
          <h1>Privacy Policy</h1>
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
            <p>Welcome to E-Waste Recycling. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.</p>
          </section>

          <section className="policy-section">
            <h2>2. Data We Collect</h2>
            <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
            <ul>
              <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
              <li><strong>Contact Data</strong> includes email address, telephone numbers, and address.</li>
              <li><strong>Technical Data</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
              <li><strong>Usage Data</strong> includes information about how you use our website, products and services.</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>3. How We Use Your Data</h2>
            <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
            <ul>
              <li>To register you as a new customer.</li>
              <li>To process and deliver your order.</li>
              <li>To manage our relationship with you.</li>
              <li>To improve our website, products/services, marketing or customer relationships.</li>
              <li>To recommend products or services that may be of interest to you.</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>4. Data Security</h2>
            <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.</p>
          </section>

          <section className="policy-section">
            <h2>5. Data Retention</h2>
            <p>We will only retain your personal data for as long as necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements.</p>
          </section>

          <section className="policy-section">
            <h2>6. Your Legal Rights</h2>
            <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:</p>
            <ul>
              <li>Request access to your personal data.</li>
              <li>Request correction of your personal data.</li>
              <li>Request erasure of your personal data.</li>
              <li>Object to processing of your personal data.</li>
              <li>Request restriction of processing your personal data.</li>
              <li>Request transfer of your personal data.</li>
              <li>Right to withdraw consent.</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>7. Changes to This Privacy Policy</h2>
            <p>We may update our privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "Last Updated" date at the top of this policy.</p>
          </section>
        </motion.div>

        <div className="policy-footer">
          <p>&copy; 2023 E-Waste Recycling. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 