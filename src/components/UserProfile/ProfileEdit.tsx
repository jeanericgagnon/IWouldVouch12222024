import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { mockStore } from '../../data/mockData';
import { toast } from 'react-hot-toast';
import { Button } from '../ui/button';
import { ProfileEditForm } from './ProfileEditForm';
import type { User } from '../../types/user';

export function ProfileEdit() {
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

        // Check if user is authorized to edit this profile
        if (currentUser?.id !== userId) {
          throw new Error('Unauthorized to edit this profile');
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
  }, [userId, currentUser?.id]);

  const handleSave = async (updates: Partial<User>) => {
    try {
      if (!user) return;
      
      const updatedUser = {
        ...user,
        ...updates,
        updatedAt: new Date().toISOString()
      };

      mockStore.updateUser(user.id, updatedUser);
      setUser(updatedUser);
      toast.success('Profile updated successfully!');
      navigate(`/profile/${user.id}`);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };

  const handleCancel = () => {
    navigate(`/profile/${userId}`);
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
      <div className="container mx-auto px-4 py-8 text-center space-y-4">
        <h1 className="text-2xl font-bold text-red-500">
          {error || 'Profile not found'}
        </h1>
        <Button
          onClick={() => navigate(-1)}
          className="bg-[#52789e] hover:bg-[#6b9cc3] text-white"
        >
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <ProfileEditForm 
            user={user}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        </div>
      </main>
    </div>
  );
}