import { useCallback } from 'react';

const useClipboard = () => {
    const copyToClipboard = useCallback((text : string) => {
        navigator.clipboard.writeText(text);
    }, []);
    return { copyToClipboard };
};

export default useClipboard;