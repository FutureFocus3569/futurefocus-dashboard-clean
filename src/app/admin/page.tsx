'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/firebase/firebaseConfig';
import DashboardLayout from '@/components/DashboardLayout';

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        const userData = userDoc.exists() ? userDoc.data() : null;

        if (userData?.role === 'admin') {
          setUser(currentUser);
        } else {
          router.push('/');
        }
      } else {
        router.push('/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading || !user) {
    return null; // You could return a spinner/loading UI
  }

  return (
    <DashboardLayout>
      <div className="text-white">
        <h1 className="text-3xl font-bold mb-4">👑 Admin Panel</h1>
        <p>Welcome, admin. Here you can manage users, centers, and more.</p>

        {/* 🛠️ Future: Add user/centre management here */}
        <div className="mt-6 bg-white rounded p-4 text-black shadow">
          <p>This section will include user management features.</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
