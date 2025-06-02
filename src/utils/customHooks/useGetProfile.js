import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../Constant';
import { useState } from 'react';
import { addUser } from '../userSlice';

const useGetProfile = () => {

   const dispatch = useDispatch();
   const [isLoading,setIsLoading] = useState("false");
   const [error,setError] = useState(null);
   const user = useSelector((store) => store?.user);

  useEffect(() => {
    // Skip if user already exists
    if (user) return;

    async function getProfile() {

        setIsLoading(true);

      try {
        const userDetail = await axios.get(`${BASE_URL}/users/getProfile`, {
          withCredentials: true,
        });

        const { name, emailId, photoUrl, history } = userDetail.data?.data;
        dispatch(addUser({ name, emailId, photoUrl, history }));
      } catch (e) {
        console.error("Error fetching profile:", e);
        // Optionally dispatch an error action
        setError("profile fetching failed")
      }
      finally{
        setIsLoading(false);
      }
    }

    getProfile();
  }, [user,dispatch]);

 return { isLoading, error };

};

export default useGetProfile;