import React from 'react';
import { RootState } from '@/redux/store';
import { Redirect } from 'expo-router';
import { useSelector } from 'react-redux';
type SecureRouteProps = {
    children: React.ReactNode;
};
export default function SecureRoute({ children } : SecureRouteProps) {
    const { isAuthenticated, isLoaded } = useSelector((state: RootState) => state.session);
    if (isLoaded && !isAuthenticated) {
      return <Redirect href="/auth/sign-in" />;
    }
    return isAuthenticated ? <>{children}</> : null;
}

