import { useState, useEffect } from "react";
import { UserApi } from "../api-services/user.api"; 


export const useAuth = () => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const users = UserApi();

  useEffect(() => {

    const checkAuth = async () => {
      try {
        const { data } = await users.findOne();
        setUser(data.data); // l'utilisateur est connecté
      } catch (err) {
        setUser(null);      // non connecté
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
    
  }, []);

  return { user, loading };
};
