import { useState } from "react";


export default function useLoadingHook() {
  const [loading, setIsLoading] = useState(false);
  return {
    loading,
    setIsLoading,
  };
}
