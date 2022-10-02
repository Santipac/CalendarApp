import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthRoutes } from '../auth';
import { CalendarPage } from '../calendar';
import { useAuthStore } from '../hooks';
import { Spinner } from '../ui/Spinner';

export const AppRouter = () => {
  const { checkAuthToken, status } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === 'checking') {
    return <Spinner />;
  }

  return (
    <Routes>
      {status === 'not-authenticated' ? (
        <>
          <Route path="/auth/*" element={<AuthRoutes />} />
          <Route path="/*" element={<Navigate to="/auth/login" />} />
        </>
      ) : (
        <>
          <Route path="/" element={<CalendarPage />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </>
      )}
    </Routes>
  );
};
