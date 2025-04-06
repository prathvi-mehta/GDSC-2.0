import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Components/HomePageComponents/nav";
import Footer from "../Components/HomePageComponents/footer";
import { useAuth } from '../contexts/AuthContext';
import Alert from '../Components/AuthComponents/Alert';
// Inline CSS styles to avoid path resolution issues
const styles = `
.signup-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xl);
  background: linear-gradient(135deg, var(--neutral-200) 0%, var(--neutral-300) 100%);
}

.signup-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--color-black);
}

.signup-content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  margin-top: 80px; /* Space for fixed navbar */
}

.signup-box {
  background: var(--color-light-black);
  border-radius: 20px;
  padding: 3rem;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  text-align: center;
  border: 1px solid rgba(76, 175, 80, 0.1);
}

.signup-box h2 {
  font-size: 2.5rem;
  color: var(--color-white);
  margin-bottom: 0.5rem;
}

.signup-box p {
  color: var(--color-light-gray);
  margin-bottom: 2rem;
}

.signup-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--color-white);
}

.form-group input {
  width: 100%;
  padding: 1rem;
  border: 1px solid rgba(76, 175, 80, 0.2);
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
  background: var(--color-dark-black);
  color: var(--color-white);
}

.form-group input:focus {
  outline: none;
  border-color: var(--color-green);
  box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
}

.form-group input.error {
  border-color: var(--accent-error);
}

.error-message {
  color: var(--accent-error);
  font-size: 0.875rem;
}

.signup-button {
  background: var(--color-green);
  color: var(--color-white);
  border: none;
  padding: 1rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
}

.signup-button:hover {
  background: var(--color-dark-green);
}

.signup-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.signup-footer {
  margin-top: 2rem;
}

.signup-footer p {
  margin: 0;
  color: var(--color-light-gray);
}

.signup-footer a {
  color: var(--color-green);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.signup-footer a:hover {
  color: var(--color-light-green);
  text-decoration: underline;
}
`;

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  
  const navigate = useNavigate();
  const { signup, currentUser, updateUserProfile } = useAuth();
  
  useEffect(() => {
    // If user is already logged in, redirect to homepage
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }
    
    // Validate password strength
    if (formData.password.length < 6) {
      return setError('Password should be at least 6 characters');
    }
    
    setLoading(true);
    
    try {
      // Create user with email and password
      const userCredential = await signup(formData.email, formData.password);
      
      // Update user profile with display name
      if (userCredential?.user) {
        await updateUserProfile({ displayName: formData.name });
      }
      
      setMessage('Account created successfully!');
      // Navigate after a short delay to show success message
      setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      console.error('Signup error:', error);
      setError(error.message || 'Failed to create account.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <style>{styles}</style>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="signup-container"
      >
        <Navbar />
        
        {/* Alert component for showing messages */}
        {(error || message) && (
          <Alert 
            error={error} 
            message={message} 
            onClose={() => {
              setError('');
              setMessage('');
            }}
          />
        )}
        
        <div className="signup-content">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="signup-box"
          >
            <h2>Create Account</h2>
            <p>Join our e-waste recycling community</p>
            
            <form onSubmit={handleSubmit} className="signup-form">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                  disabled={loading}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                  disabled={loading}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Create a password"
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Confirm your password"
                  disabled={loading}
                />
              </div>

              <motion.button
                type="submit"
                className="signup-button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </motion.button>
            </form>

            <div className="signup-footer">
              <p>Already have an account? <Link to="/login">Login</Link></p>
            </div>
          </motion.div>
        </div>

        <Footer />
      </motion.div>
    </>
  );
};

export default SignUpPage;
