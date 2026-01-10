import { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../services/api';
import { User, Mail, Camera, Trash2, Save, Loader2, AlertCircle, CheckCircle, ArrowUpRight, CreditCard, Phone, MapPin, Youtube, Tag, Eye, X } from 'lucide-react';
import FadeIn from '../components/ui/FadeIn';
import ConfirmModal from '../components/ui/ConfirmModal';

const Profile = () => {
    const { user, updateUser, logout } = useAuth();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [formData, setFormData] = useState({
        full_name: user?.full_name || '',
        username: user?.username || '',
        phone_number: user?.phone_number || '',
        location: user?.location || '',
        channel_url: user?.channel_url || '',
        content_niche: user?.content_niche || ''
    });
    const [loading, setLoading] = useState(false);
    const [uploadingAvatar, setUploadingAvatar] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [showDeleteAvatarModal, setShowDeleteAvatarModal] = useState(false);
    const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
    const [showAvatarOptions, setShowAvatarOptions] = useState(false);
    const [viewAvatar, setViewAvatar] = useState(false);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const updatedUser = await authApi.updateProfile(formData);
            updateUser(updatedUser);
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
        } catch (error) {
            setMessage({
                type: 'error',
                text: error.response?.data?.detail || 'Failed to update profile'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleAvatarUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            setMessage({ type: 'error', text: 'Please select an image file' });
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setMessage({ type: 'error', text: 'Image must be less than 5MB' });
            return;
        }

        setUploadingAvatar(true);
        setMessage({ type: '', text: '' });

        try {
            const updatedUser = await authApi.uploadAvatar(file);
            updateUser(updatedUser);
            setMessage({ type: 'success', text: 'Avatar uploaded successfully!' });
        } catch (error) {
            setMessage({
                type: 'error',
                text: error.response?.data?.detail || 'Failed to upload avatar'
            });
        } finally {
            setUploadingAvatar(false);
        }
    };

    const handleDeleteAvatar = async () => {
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const updatedUser = await authApi.deleteAvatar();
            updateUser(updatedUser);
            setMessage({ type: 'success', text: 'Avatar removed successfully!' });
        } catch (error) {
            setMessage({
                type: 'error',
                text: error.response?.data?.detail || 'Failed to remove avatar'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAccount = async () => {
        setLoading(true);

        try {
            await authApi.deleteAccount();
            logout();
            navigate('/');
        } catch (error) {
            setMessage({
                type: 'error',
                text: 'Failed to delete account'
            });
            setLoading(false);
        }
    };

    const creditsPercentage = (user?.credits_used / user?.credits_limit) * 100;

    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-16 px-6 lg:px-12">
            <div className="max-w-6xl mx-auto">
                <FadeIn>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900 mb-1">Account Settings</h1>
                            <p className="text-sm text-slate-500">Manage your profile details and preferences</p>
                        </div>
                    </div>

                    {message.text && (
                        <div className={`mb-6 p-3 rounded-lg border flex items-center gap-3 ${message.type === 'success'
                            ? 'bg-green-50 border-green-200 text-green-700'
                            : 'bg-red-50 border-red-200 text-red-700'
                            }`}>
                            {message.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                            <p className="text-sm font-medium">{message.text}</p>
                        </div>
                    )}

                    <div className="grid grid-cols-12 gap-6">
                        {/* Sidebar */}
                        <div className="col-span-12 lg:col-span-4 space-y-5">
                            {/* Profile Card */}
                            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div
                                        className="relative group cursor-pointer"
                                        onClick={() => user?.avatar_url ? setShowAvatarOptions(true) : fileInputRef.current?.click()}
                                    >
                                        {user?.avatar_url ? (
                                            <img
                                                src={user.avatar_url}
                                                alt={user.username}
                                                className="w-14 h-14 rounded-full object-cover ring-2 ring-slate-100 group-hover:ring-sky-100 transition-all"
                                            />
                                        ) : (
                                            <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 text-lg font-bold ring-2 ring-slate-50 group-hover:ring-sky-100 transition-all">
                                                {user?.username?.[0]?.toUpperCase()}
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-full transition-all flex items-center justify-center">
                                            <Camera size={16} className="text-white opacity-0 group-hover:opacity-100 transition-all" />
                                        </div>
                                        {uploadingAvatar && (
                                            <div className="absolute inset-0 bg-white/80 rounded-full flex items-center justify-center">
                                                <Loader2 className="animate-spin text-sky-600" size={18} />
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-slate-900">{user?.full_name || user?.username}</h3>
                                        <p className="text-xs text-slate-500 mb-1">{user?.email}</p>
                                        <div className="flex items-center gap-2">
                                            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-slate-100 text-slate-600">
                                                {user?.plan} Plan
                                            </span>
                                            <span className="text-[10px] text-sky-600 font-bold uppercase cursor-pointer hover:underline" onClick={() => user?.avatar_url ? setShowAvatarOptions(true) : fileInputRef.current?.click()}>
                                                Edit Photo
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleAvatarUpload}
                                    className="hidden"
                                />
                            </div>

                            {/* Plan Card */}
                            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xs font-bold text-slate-900 flex items-center gap-2 uppercase tracking-wider">
                                        <CreditCard size={14} className="text-slate-400" />
                                        Subscription
                                    </h3>
                                    <button
                                        onClick={() => navigate('/pricing')}
                                        className="text-[10px] font-bold text-sky-600 hover:text-sky-700 uppercase"
                                    >
                                        Upgrade
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between text-xs mb-1.5">
                                            <span className="text-slate-600">Credits Used</span>
                                            <span className="font-bold text-slate-900">{user?.credits_used} / {user?.credits_limit}</span>
                                        </div>
                                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-slate-900 rounded-full transition-all"
                                                style={{ width: `${creditsPercentage}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    <div className="p-2.5 bg-slate-50 rounded-lg text-[11px] text-slate-500 border border-slate-100">
                                        Your plan renews automatically next month.
                                    </div>
                                </div>
                            </div>

                            {/* Account Activity Card */}
                            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                                <h3 className="text-xs font-bold text-slate-900 mb-4 uppercase tracking-wider">
                                    Account Activity
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[11px] text-slate-600">Member Since</span>
                                        <span className="text-[11px] font-bold text-slate-900">
                                            {new Date(user?.created_at || Date.now()).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[11px] text-slate-600">Total Audits</span>
                                        <span className="text-[11px] font-bold text-slate-900">{user?.credits_used || 0}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[11px] text-slate-600">Account Status</span>
                                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wide bg-emerald-100 text-emerald-800">
                                            Active
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="col-span-12 lg:col-span-8 space-y-5">
                            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                                <h2 className="text-sm font-bold text-slate-900 mb-6 uppercase tracking-wider">Personal & Channel Information</h2>
                                <form onSubmit={handleUpdateProfile} className="space-y-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Username</label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                                <input
                                                    type="text"
                                                    value={formData.username}
                                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                                    minLength={3}
                                                    maxLength={30}
                                                    className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 outline-none transition-all"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Full Name</label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                                <input
                                                    type="text"
                                                    value={formData.full_name}
                                                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                                    className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 outline-none transition-all"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Phone Number</label>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                                <input
                                                    type="tel"
                                                    value={formData.phone_number}
                                                    onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                                                    placeholder="+1 (555) 000-0000"
                                                    className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 outline-none transition-all"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Location</label>
                                            <div className="relative">
                                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                                <input
                                                    type="text"
                                                    value={formData.location}
                                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                                    placeholder="New York, USA"
                                                    className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 outline-none transition-all"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">YouTube Channel URL</label>
                                            <div className="relative">
                                                <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                                <input
                                                    type="url"
                                                    value={formData.channel_url}
                                                    onChange={(e) => setFormData({ ...formData, channel_url: e.target.value })}
                                                    placeholder="https://youtube.com/@channel"
                                                    className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 outline-none transition-all"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Content Niche</label>
                                            <div className="relative">
                                                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                                <input
                                                    type="text"
                                                    value={formData.content_niche}
                                                    onChange={(e) => setFormData({ ...formData, content_niche: e.target.value })}
                                                    placeholder="Gaming, Tech, Vlog..."
                                                    className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 outline-none transition-all"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Email Address</label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                            <input
                                                type="email"
                                                value={user?.email}
                                                disabled
                                                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-400 cursor-not-allowed"
                                            />
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                                        <button
                                            type="button"
                                            onClick={() => setShowDeleteAccountModal(true)}
                                            className="w-[340px] h-11 border border-red-300 text-red-600 text-[11px] font-semibold uppercase tracking-wider rounded-md hover:bg-red-50 hover:border-red-400 transition-all flex items-center justify-center gap-2 shadow-md "
                                        >
                                            <Trash2 size={14} />
                                            Delete Account
                                        </button>

                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-[340px] h-11 bg-slate-900 text-white text-[11px] font-semibold uppercase tracking-wider rounded-md hover:bg-slate-800 disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-md "
                                        >
                                            {loading ? (
                                                <>
                                                    <Loader2 className="animate-spin" size={14} />
                                                    Saving...
                                                </>
                                            ) : (
                                                <>
                                                    <Save size={14} />
                                                    Save Changes
                                                </>
                                            )}
                                        </button>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </FadeIn>

                {/* Avatar Options Modal */}
                {showAvatarOptions && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-fadeIn"
                            onClick={() => setShowAvatarOptions(false)}
                        ></div>
                        <div className="relative bg-white rounded-xl p-6 w-full max-w-sm shadow-xl animate-scaleIn flex flex-col items-center">
                            <button
                                onClick={() => setShowAvatarOptions(false)}
                                className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <h3 className="text-sm font-bold text-slate-900 mb-6 uppercase tracking-wider">Profile Picture</h3>

                            <div className="relative w-32 h-32 mb-6 group">
                                {user?.avatar_url ? (
                                    <img
                                        src={user.avatar_url}
                                        alt={user.username}
                                        className="w-32 h-32 rounded-full object-cover shadow-xl ring-4 ring-slate-50 cursor-pointer transition-transform hover:scale-105"
                                        onClick={() => setViewAvatar(true)}
                                    />
                                ) : (
                                    <div className="w-32 h-32 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 text-3xl font-bold shadow-xl ring-4 ring-slate-50">
                                        {user?.username?.[0]?.toUpperCase()}
                                    </div>
                                )}
                            </div>

                            <div className="w-full space-y-2">
                                <button
                                    onClick={() => setViewAvatar(true)}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-slate-50 transition-all"
                                >
                                    <Eye size={14} />
                                    View Full Size
                                </button>
                                <button
                                    onClick={() => {
                                        fileInputRef.current?.click();
                                        setShowAvatarOptions(false);
                                    }}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-900 text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-slate-800 transition-all"
                                >
                                    <Camera size={14} />
                                    Upload New
                                </button>
                                <button
                                    onClick={() => {
                                        setShowDeleteAvatarModal(true);
                                        setShowAvatarOptions(false);
                                    }}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-2 text-red-600 text-[10px] font-bold uppercase tracking-wider hover:bg-red-50 rounded-lg transition-all"
                                >
                                    <Trash2 size={14} />
                                    Remove Photo
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Full Size Avatar View */}
                {viewAvatar && user?.avatar_url && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn" onClick={() => setViewAvatar(false)}>
                        <div className="relative max-w-2xl max-h-[80vh]">
                            <img
                                src={user.avatar_url}
                                alt={user.username}
                                className="max-w-full max-h-[80vh] rounded-lg shadow-2xl"
                            />
                            <button
                                onClick={() => setViewAvatar(false)}
                                className="absolute -top-10 right-0 text-white/70 hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>
                    </div>
                )}

                {/* Modals */}
                <ConfirmModal
                    isOpen={showDeleteAvatarModal}
                    onClose={() => setShowDeleteAvatarModal(false)}
                    onConfirm={handleDeleteAvatar}
                    title="Remove Profile Picture"
                    message="Are you sure you want to remove your profile picture?"
                    confirmText="Remove"
                    variant="danger"
                />

                <ConfirmModal
                    isOpen={showDeleteAccountModal}
                    onClose={() => setShowDeleteAccountModal(false)}
                    onConfirm={handleDeleteAccount}
                    title="Delete Account"
                    message="Are you sure you want to delete your account? This action cannot be undone."
                    confirmText="Delete"
                    variant="danger"
                />
            </div>
        </div>
    );
};

export default Profile;
