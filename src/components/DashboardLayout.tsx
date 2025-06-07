'use client';
import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut, onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/firebase/firebaseConfig';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        router.push('/login');
        return;
      }

      setUser(firebaseUser);

      try {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setRole(userData.role || null);
        }
      } catch (err) {
        console.error('Failed to fetch user role:', err);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-green-400 p-4 sm:p-6">
      {/* 🌟 Header */}
      <header className="flex flex-col md:flex-row justify-between items-center mb-4 sm:mb-6 gap-4 sm:gap-0">
        <div className="flex items-center space-x-4">
          <img src="/logo.png" alt="Logo" className="h-20 sm:h-28 object-contain" />
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Childcare Dashboard
          </h1>
        </div>

        <div className="flex space-x-2">
          {role === 'admin' && (
            <a
              href="/admin"
              className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-md transition-all"
            >
              Admin
            </a>
          )}
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-md transition-all"
          >
            Logout
          </button>
        </div>
      </header>

      {/* 🌐 Navigation */}
      <nav className="flex flex-wrap justify-center space-x-4 sm:space-x-6 mb-6">
        <a href="/occupancy" className="text-white font-medium hover:underline">
          Occupancy
        </a>
        <a href="/ai" className="text-white font-medium hover:underline">
          AI Agent
        </a>
        <a href="/xero" className="text-white font-medium hover:underline">
          Xero
        </a>
      </nav>

      <main>{children}</main>
    </div>
  );
}
