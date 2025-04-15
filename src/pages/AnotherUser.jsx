import AnotherProfile from "@/components/AnotherProfile";
import AnotherQuizChart from "@/components/AnotherQuizChart";
import Loading from "@/components/Loading";
import MotivationCard from "@/components/MotivationCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/ui/footer";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const LoadingSpinner = () => (
    <div className="flex justify-center items-center p-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
    </div>
);
const AnotherUser = () => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null); // ✅ store user
    const { userId } = useParams();
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios.get(`${import.meta.env.VITE_API_URL}/details/user/${userId}`);
          setUser(res.data); // ✅ save the user data
        } catch (err) {
          console.error("Failed to fetch user:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, [userId]); // ✅ include userId in dependencies
  
    if (loading) return( <div className="min-h-screen flex flex-col bg-white dark:bg-black">
                    <Navbar />
                    <main className="flex-grow flex justify-center items-center">
                        <LoadingSpinner />
                    </main>
                    <Footer />
                </div>)
    if (!user) return <div>User not found</div>;
  
    return (
      <div>
        <Navbar />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 min-h-screen mt-[-10px]">
          {/* ProfileCard always on the left */}
          <AnotherProfile user={user} />
          <div className="md:col-span-2 space-y-6">
            <div className="space-y-6">
              <MotivationCard />
              <AnotherQuizChart user={user} />
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default AnotherUser;
  