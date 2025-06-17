import React, { useState } from 'react';
import { doPasswordReset } from '../../firebase/auth';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setSending(true);
    try {
      await doPasswordReset(email);
      setMessage('Password reset email sent! Check your inbox.');
    } catch (err) {
      if (err.code === 'auth/user-not-found') {
        setError('No account found with this email.');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="w-full h-screen flex justify-center items-center">
      <div className="w-96 p-6 rounded-xl border shadow-md">
        <h2 className="text-xl font-bold text-center mb-4">Reset your password</h2>
        {message && <div className="text-green-600 font-medium">{message}</div>}
        {error && <div className="text-red-600 font-medium">{error}</div>}
        <form onSubmit={onSubmit} className="space-y-4 mt-4">
          <div>
            <label className="text-sm font-semibold">Email address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded-md outline-none focus:border-indigo-600"
            />
          </div>
          <button
            type="submit"
            disabled={sending}
            className={`w-full px-4 py-2 text-white font-semibold rounded-md ${
              sending ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {sending ? 'Sending...' : 'Send Reset Email'}
          </button>
        </form>
        <div className="text-center mt-4 text-sm">
          <Link to="/login" className="text-indigo-600 hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ForgotPassword;
