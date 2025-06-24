import { useCallback } from 'react';

export function useInitials() {
    return useCallback((user?: { firstname?: string; lastname?: string }): string => {
        if (!user) return '';
        const firstInitial = user.firstname?.charAt(0) || '';
        const lastInitial = user.lastname?.charAt(0) || '';
        return `${firstInitial}${lastInitial}`.toUpperCase();
    }, []);
}
