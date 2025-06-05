import { collection, getDocs, getFirestore } from 'firebase/firestore';
import app from '@/firebase/firebaseConfig';

const db = getFirestore(app);

/**
 * Loads occupancy data from Firestore and normalizes values.
 */
export async function loadOccupancyData() {
  try {
    const snapshot = await getDocs(collection(db, 'centreReports'));
    const data = snapshot.docs.map((doc) => {
      const item = doc.data();

      const centreName = item.centre?.toString().trim() ?? 'Unknown Centre';

      // Normalize month string (fix bad dashes, remove trailing text)
      const rawMonth = item.month?.toString().replace(/[–—]/g, '-').trim() ?? '';
      const cleanMonth = rawMonth.length >= 7 ? rawMonth.slice(0, 7) : 'Unknown Month';

      return {
        centreName,
        month: cleanMonth,
        u2: Number(item.under2?.percent ?? 0),
        o2: Number(item.over2?.percent ?? 0),
        total: Number(item.total?.percent ?? 0),
      };
    });

    console.log('✅ Fetched occupancy data:', data);
    return data;
  } catch (error) {
    console.error('❌ Error loading occupancy data:', error);
    return [];
  }
}
