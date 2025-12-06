import { useState, useEffect, useMemo } from "react";
import { UserApi } from "../api-services/user.api"; 


export const useAuth = () => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const users = useMemo(() => UserApi(), []);

  useEffect(() => {
    const checkAuth = async () => {
     try {
       const { data } = await users.findOne();
      //  localStorage.setItem('uid', data?.data?.id)
       setUser(data.data); 
     } catch (err) {
       setUser(null);
     } finally {
       setLoading(false);
     }
   };

   checkAuth();
  }, [users]);


  return { user, loading };
};
