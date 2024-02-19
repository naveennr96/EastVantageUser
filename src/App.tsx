import React, { useState, useEffect } from 'react';
import { fetchUserData } from './api';
import './App.css';

const UserDataDisplay: React.FC = () => {
  const [userData, setUserData] = useState<{ name: string; email: string; thumbnail:string;} | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = localStorage.getItem('userData');

        if (storedData) {
          setUserData(JSON.parse(storedData));
        } else {
          await fetchUserData();
          const storedData = localStorage.getItem('userData');

         if (storedData) {
          setUserData(JSON.parse(storedData));
         } 
        }


        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const refreshUserData = async () => {
    setLoading(true);

    localStorage.removeItem('userData');

    try {
       await fetchUserData();
      const storedData = localStorage.getItem('userData');

        if (storedData) {
          setUserData(JSON.parse(storedData));
        } 
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="parent-container">
      <div className="container">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <div className="userData">
            <p>Name: {userData?.name}</p>
            <p>Email: {userData?.email}</p>
            <img src={userData?.thumbnail}></img>
          </div>
        )}
        <button className="button" onClick={refreshUserData} disabled={loading}>
          {loading ? 'Loading ...' : 'Refresh'}
        </button>
      </div>
    </div>
  );
};

export default UserDataDisplay;