import React, { useContext, useEffect, useState } from 'react';
import ProfileCard from '@/components/ProfileCard';
import QuizProgressChart from '@/components/QuizProgressChart';
import MotivationCard from '@/components/MotivationCard'; // ⬅️ Added here
import Navbar from '@/components/Navbar';
import AuthContext from '@/assets/AuthContext';
import Loading from '@/components/Loading';

const Profile = () => {
  const {user,refreshUser}=useContext(AuthContext)
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      await refreshUser();
      setLoading(false);
    };
  
    fetchData();
  }, []);
  // done
  
  if(loading)return <Loading text="Loading data"/>
  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 min-h-screen mt-[-10px]">
        {/* ProfileCard always on the left */}
        <ProfileCard />

        
        <div className="md:col-span-2 space-y-6">
      
          <div className="space-y-6">
            <MotivationCard />
            <QuizProgressChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
