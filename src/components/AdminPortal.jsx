import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { profile } from '../data/profile';

export default function AdminPortal({ isOpen, onClose, currentStatus, onStatusUpdated }) {
  const [session, setSession] = useState(null);
  const [authMode, setAuthMode] = useState('signin'); // 'signin' | 'signup'
  const [email, setEmail] = useState(profile.contact.email);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Dashboard state
  const [activeTab, setActiveTab] = useState('inbox'); // 'inbox' | 'status'
  const [messages, setMessages] = useState([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [messageFilter, setMessageFilter] = useState('all'); // 'all' | 'new' | 'read'
  const [statusInput, setStatusInput] = useState(currentStatus || '');
  const [statusSaving, setStatusSaving] = useState(false);
  const [statusSuccess, setStatusSuccess] = useState(false);
  const [statusError, setStatusError] = useState('');

  // Sync statusInput when currentStatus changes
  useEffect(() => {
    if (currentStatus) setStatusInput(currentStatus);
  }, [currentStatus]);

  // Check auth session
  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return;

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch messages when authenticated and tab is inbox
  const fetchMessages = useCallback(async () => {
    if (!session || !isSupabaseConfigured || !supabase) return;

    try {
      setMessagesLoading(true);
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching messages:', error);
      } else {
        setMessages(data || []);
      }
    } catch (err) {
      console.error('Error loading messages:', err);
    } finally {
      setMessagesLoading(false);
    }
  }, [session]);

  useEffect(() => {
    if (isOpen && session) {
      fetchMessages();
    }
  }, [isOpen, session, fetchMessages]);

  // Handle ESC key to close
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Auth Submit
  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);

    try {
      if (authMode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email: email.trim(),
          password: password.trim(),
        });
        if (error) throw error;
        setAuthError('Sign up successful! If confirmation is required, check your email, or sign in now.');
        setAuthMode('signin');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password.trim(),
        });
        if (error) throw error;
      }
    } catch (err) {
      setAuthError(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    if (supabase) {
      await supabase.auth.signOut();
      setSession(null);
    }
  };

  // Update Message Status
  const handleUpdateMessageStatus = async (id, newStatus) => {
    if (!supabase) return;
    try {
      const { error } = await supabase
        .from('messages')
        .update({ status: newStatus })
        .eq('id', id);

      if (!error) {
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, status: newStatus } : m))
        );
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  // Delete Message
  const handleDeleteMessage = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    if (!supabase) return;

    try {
      const { error } = await supabase.from('messages').delete().eq('id', id);
      if (!error) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
      }
    } catch (err) {
      console.error('Error deleting message:', err);
    }
  };

  // Save Status to site_settings
  const handleSaveStatus = async (e) => {
    e.preventDefault();
    setStatusSaving(true);
    setStatusError('');
    setStatusSuccess(false);

    try {
      await onStatusUpdated(statusInput);
      setStatusSuccess(true);
      setTimeout(() => setStatusSuccess(false), 4000);
    } catch (err) {
      setStatusError(err.message || 'Failed to update status.');
    } finally {
      setStatusSaving(false);
    }
  };

  if (!isOpen) return null;

  const unreadCount = messages.filter((m) => m.status === 'new').length;
  const filteredMessages = messages.filter((m) => {
    if (messageFilter === 'new') return m.status === 'new';
    if (messageFilter === 'read') return m.status === 'read' || m.status === 'replied';
    return true;
  });

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-portal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
    >
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl bg-[#14161B] border border-[#292C32] shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#292C32] bg-[#101114]">
          <div className="flex items-center gap-3">
            <div className="h-8 w-12 rounded overflow-hidden border border-[#D6AD63]/40 bg-black flex items-center justify-center shrink-0 p-0.5">
              <img src="/images/logo.jpg" alt="ARD" className="w-full h-full object-contain" />
            </div>
            <div>
              <h2 id="admin-portal-title" className="font-display font-bold text-base text-[#F2F0EB]">
                ARD Dev Studio Portal
              </h2>
              <span className="font-mono text-[10px] text-[#A1A1AA] uppercase tracking-wider block">
                Private Management Console
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {session && (
              <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded bg-[#17191E] border border-[#292C32] text-xs font-mono text-[#A1A1AA]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="truncate max-w-[160px]">{session.user.email}</span>
              </div>
            )}

            {session && (
              <button
                type="button"
                onClick={handleSignOut}
                className="text-xs font-mono px-3 py-1.5 rounded bg-[#1E2127] border border-[#292C32] text-[#A1A1AA] hover:text-[#F2F0EB] hover:border-red-500/50 transition-colors"
              >
                Sign Out
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              aria-label="Close portal"
              className="p-1.5 rounded-lg text-[#A1A1AA] hover:text-[#F2F0EB] hover:bg-[#1E2127] transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        {/* Unauthenticated View: Sign In */}
        {!session ? (
          <div className="p-6 sm:p-12 overflow-y-auto max-w-md mx-auto w-full">
            <div className="text-center mb-8">
              <div className="w-12 h-12 rounded-xl bg-[#1E2127] border border-[#D6AD63]/40 flex items-center justify-center mx-auto mb-4 text-[#D6AD63]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <h3 className="font-display text-xl font-bold text-[#F2F0EB] mb-2">
                {authMode === 'signin' ? 'Studio Owner Sign In' : 'Create Admin Credentials'}
              </h3>
              <p className="text-xs text-[#A1A1AA]">
                Enter your Supabase credentials to access inquiries and manage site availability.
              </p>
            </div>

            {authError && (
              <div className="mb-6 p-3 rounded-lg bg-red-950/40 border border-red-500/40 text-xs text-red-200">
                {authError}
              </div>
            )}

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#A1A1AA] mb-1.5">
                  Admin Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#101114] border border-[#292C32] text-sm text-[#F2F0EB] focus:outline-none focus:border-[#D6AD63] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#A1A1AA] mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#101114] border border-[#292C32] text-sm text-[#F2F0EB] focus:outline-none focus:border-[#D6AD63] transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="btn-gold-primary w-full py-3 text-sm font-semibold justify-center"
              >
                {authLoading ? 'Verifying...' : authMode === 'signin' ? 'Authenticate' : 'Create Account'}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-[#292C32] text-center">
              <button
                type="button"
                onClick={() => {
                  setAuthMode(authMode === 'signin' ? 'signup' : 'signin');
                  setAuthError('');
                }}
                className="text-xs text-[#D6AD63] hover:underline"
              >
                {authMode === 'signin'
                  ? 'First time setting password? Click here'
                  : 'Already have credentials? Sign in here'}
              </button>
            </div>
          </div>
        ) : (
          /* Authenticated Dashboard View */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Tabs Bar */}
            <div className="flex items-center gap-2 px-6 pt-3 border-b border-[#292C32] bg-[#101114]">
              <button
                type="button"
                onClick={() => setActiveTab('inbox')}
                className={`flex items-center gap-2 px-4 py-3 text-xs font-mono uppercase tracking-wider font-semibold border-b-2 transition-colors ${
                  activeTab === 'inbox'
                    ? 'border-[#D6AD63] text-[#D6AD63]'
                    : 'border-transparent text-[#A1A1AA] hover:text-[#F2F0EB]'
                }`}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span>Inquiries Inbox</span>
                {unreadCount > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-[#D6AD63] text-black font-bold">
                    {unreadCount}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('status')}
                className={`flex items-center gap-2 px-4 py-3 text-xs font-mono uppercase tracking-wider font-semibold border-b-2 transition-colors ${
                  activeTab === 'status'
                    ? 'border-[#D6AD63] text-[#D6AD63]'
                    : 'border-transparent text-[#A1A1AA] hover:text-[#F2F0EB]'
                }`}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span>Live Availability Status</span>
              </button>
            </div>

            {/* Tab 1: Inbox Content */}
            {activeTab === 'inbox' && (
              <div className="flex-1 flex flex-col overflow-hidden p-6">
                
                {/* Inbox Sub-header & Controls */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
                  <div className="flex items-center gap-2">
                    {[
                      { key: 'all', label: `All (${messages.length})` },
                      { key: 'new', label: `New (${unreadCount})` },
                      { key: 'read', label: 'Archived / Read' },
                    ].map((f) => (
                      <button
                        key={f.key}
                        type="button"
                        onClick={() => setMessageFilter(f.key)}
                        className={`px-3 py-1.5 rounded-md text-xs font-mono transition-colors ${
                          messageFilter === f.key
                            ? 'bg-[#D6AD63] text-black font-semibold'
                            : 'bg-[#17191E] border border-[#292C32] text-[#A1A1AA] hover:text-[#F2F0EB]'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={fetchMessages}
                    disabled={messagesLoading}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#1E2127] border border-[#292C32] text-xs font-mono text-[#A1A1AA] hover:text-[#F2F0EB] transition-colors"
                  >
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={messagesLoading ? 'animate-spin' : ''}
                    >
                      <polyline points="23 4 23 10 17 10"></polyline>
                      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
                    </svg>
                    <span>Refresh</span>
                  </button>
                </div>

                {/* Message List */}
                <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                  {messagesLoading && messages.length === 0 ? (
                    <div className="text-center py-16 text-xs font-mono text-[#A1A1AA]">
                      Loading inquiries from database...
                    </div>
                  ) : filteredMessages.length === 0 ? (
                    <div className="text-center py-16 border border-dashed border-[#292C32] rounded-xl">
                      <p className="text-sm font-medium text-[#F2F0EB] mb-1">No messages found</p>
                      <p className="text-xs text-[#71717A]">
                        {messageFilter === 'all'
                          ? 'Visitor inquiries submitted through the contact form will appear here.'
                          : `No messages match the "${messageFilter}" filter.`}
                      </p>
                    </div>
                  ) : (
                    filteredMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`p-5 rounded-xl border transition-colors ${
                          msg.status === 'new'
                            ? 'bg-[#17191E] border-[#D6AD63]/40'
                            : 'bg-[#101114] border-[#292C32]'
                        }`}
                      >
                        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-display font-bold text-sm text-[#F2F0EB]">
                                {msg.name}
                              </span>
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider font-semibold ${
                                  msg.status === 'new'
                                    ? 'bg-[#D6AD63]/20 text-[#D6AD63]'
                                    : 'bg-white/10 text-[#A1A1AA]'
                                }`}
                              >
                                {msg.status}
                              </span>
                            </div>
                            <span className="text-xs font-mono text-[#A1A1AA] block mt-0.5">
                              {msg.email}
                            </span>
                          </div>

                          <span className="text-[11px] font-mono text-[#71717A]">
                            {new Date(msg.created_at).toLocaleString()}
                          </span>
                        </div>

                        {/* Message Text */}
                        <div className="p-3.5 rounded-lg bg-black/40 border border-[#292C32]/60 text-xs text-[#F2F0EB] whitespace-pre-wrap leading-relaxed font-sans mb-3">
                          {msg.message}
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
                          <div className="flex items-center gap-2">
                            <a
                              href={`mailto:${msg.email}?subject=Re:%20Inquiry%20from%20${encodeURIComponent(msg.name)}`}
                              onClick={() => handleUpdateMessageStatus(msg.id, 'replied')}
                              className="px-3 py-1.5 rounded bg-[#D6AD63] text-black font-semibold hover:bg-[#E5BE75] transition-colors"
                            >
                              Reply via Email ↗
                            </a>
                            <button
                              type="button"
                              onClick={() => {
                                navigator.clipboard.writeText(msg.email);
                                alert(`Copied ${msg.email} to clipboard!`);
                              }}
                              className="px-2.5 py-1.5 rounded bg-[#1E2127] border border-[#292C32] text-[#A1A1AA] hover:text-[#F2F0EB]"
                            >
                              Copy Email
                            </button>
                          </div>

                          <div className="flex items-center gap-2">
                            {msg.status === 'new' ? (
                              <button
                                type="button"
                                onClick={() => handleUpdateMessageStatus(msg.id, 'read')}
                                className="px-2.5 py-1 rounded text-xs font-mono text-[#A1A1AA] hover:text-[#D6AD63]"
                              >
                                Mark as Read
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => handleUpdateMessageStatus(msg.id, 'new')}
                                className="px-2.5 py-1 rounded text-xs font-mono text-[#A1A1AA] hover:text-[#D6AD63]"
                              >
                                Mark as Unread
                              </button>
                            )}

                            <button
                              type="button"
                              onClick={() => handleDeleteMessage(msg.id)}
                              className="px-2.5 py-1 rounded text-xs font-mono text-red-400 hover:text-red-300"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Tab 2: Availability Status Content */}
            {activeTab === 'status' && (
              <div className="flex-1 overflow-y-auto p-6 max-w-2xl">
                <div className="mb-6">
                  <h3 className="font-display font-bold text-lg text-[#F2F0EB] mb-1">
                    Live Availability Status
                  </h3>
                  <p className="text-xs text-[#A1A1AA]">
                    Update your current operational status. When saved, this updates your live website in real time without editing code or redeploying.
                  </p>
                </div>

                {/* Current Live Preview */}
                <div className="mb-6 p-4 rounded-xl bg-[#101114] border border-[#292C32]">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#71717A] block mb-2">
                    Current Public Preview
                  </span>
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-semibold">{currentStatus}</span>
                  </div>
                </div>

                {statusSuccess && (
                  <div className="mb-4 p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-200 flex items-center gap-2">
                    <span>✓</span>
                    <span>Status successfully updated live on your website!</span>
                  </div>
                )}

                {statusError && (
                  <div className="mb-4 p-3 rounded-lg bg-red-950/40 border border-red-500/40 text-xs text-red-200">
                    {statusError}
                  </div>
                )}

                <form onSubmit={handleSaveStatus} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#A1A1AA] mb-2">
                      Edit Status Text
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={statusInput}
                      onChange={(e) => setStatusInput(e.target.value)}
                      placeholder="e.g. Project-based, freelance, part-time, or full-time remote roles"
                      className="w-full px-4 py-3 rounded-lg bg-[#101114] border border-[#292C32] text-sm text-[#F2F0EB] focus:outline-none focus:border-[#D6AD63] transition-colors leading-relaxed"
                    />
                  </div>

                  {/* Preset Pills */}
                  <div>
                    <span className="text-[11px] font-mono text-[#71717A] block mb-2">
                      Quick Presets:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {[
                        'Project-based, freelance, part-time, or full-time remote roles',
                        'Available for freelance web development & consulting',
                        'Open for full-time remote engineering positions',
                        'Currently booked — Inquiries open for Q2 2027',
                      ].map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setStatusInput(preset)}
                          className="px-2.5 py-1 rounded bg-[#17191E] border border-[#292C32] text-[11px] text-[#A1A1AA] hover:text-[#D6AD63] hover:border-[#D6AD63]/40 transition-colors text-left"
                        >
                          {preset}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#292C32]">
                    <button
                      type="submit"
                      disabled={statusSaving}
                      className="btn-gold-primary px-6 py-2.5 text-xs font-mono font-semibold"
                    >
                      {statusSaving ? 'Updating...' : 'Publish Live Status'}
                    </button>
                  </div>
                </form>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
