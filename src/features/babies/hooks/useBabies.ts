// Custom Hook for Babies
import { useState, useCallback } from 'react';
import type { Baby, BabyPostModel, BabyPutModel } from '../types';
import { babyService } from '../services/babyService';

export const useBabies = () => {
  const [babies, setBabies] = useState<Baby[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAllBabies = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await babyService.getAllBabies();
      setBabies(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch babies');
    } finally {
      setLoading(false);
    }
  }, []);

  const createBaby = useCallback(async (baby: BabyPostModel) => {
    setLoading(true);
    setError(null);
    try {
      await babyService.createBaby(baby);
      await fetchAllBabies();
    } catch (err: any) {
      setError(err.message || 'Failed to create baby');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchAllBabies]);

  const updateBaby = useCallback(async (id: number, baby: BabyPutModel) => {
    setLoading(true);
    setError(null);
    try {
      await babyService.updateBaby(id, baby);
      await fetchAllBabies();
    } catch (err: any) {
      setError(err.message || 'Failed to update baby');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchAllBabies]);

  const deleteBaby = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await babyService.deleteBaby(id);
      await fetchAllBabies();
    } catch (err: any) {
      setError(err.message || 'Failed to delete baby');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchAllBabies]);

  return {
    babies,
    loading,
    error,
    fetchAllBabies,
    createBaby,
    updateBaby,
    deleteBaby,
  };
};
