import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { mockStore } from '../../data/mockData';
import { toast } from 'react-hot-toast';
import { ProfileHeader } from './sections/ProfileHeader';
import { ProfileSidebar } from './sections/ProfileSidebar';
import { References } from './sections/References';
import type { User } from '../../types/user';

export function ProfileView() {
  const { userId } = useParams();
  const { user: currentUser } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!userId) {
          throw new Error('User ID is required');
        }

        const userData = mockStore.getUser(userId);
        if (!userData) {
          throw new Error('User not found');
        }

        setUser(userData);
      } catch (err) {
        console.error('Error loading user:', err);
        setError(err instanceof Error ? err.message : 'Failed to load user');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [userId]);

  const isOwner = currentUser?.id === user?.id;

  const handleEditProfile = () => {
    navigate(`/profile/${userId}/edit`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-red-500">
          {error || 'Profile not found'}
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Profile Header */}
          <ProfileHeader
            user={user}
            isOwner={isOwner}
            onEditProfile={handleEditProfile}
          />

          {/* Main Content */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8 relative">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-[5.5rem]">
                <ProfileSidebar user={user} />
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3">
              <References 
                references={mockStore.getUserRecommendations(user.id, 'approved')}
                pendingReferences={mockStore.getUserRecommendations(user.id, 'pending')}
                isOwner={isOwner}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}