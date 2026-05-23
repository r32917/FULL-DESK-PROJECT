// Custom Hook for Nurses
import { useState, useCallback } from 'react';
import type { Nurse, NursePostModel, NursePutModel } from '../types';
import { nurseService } from '../services/nurseService';

export const useNurses = () => {
  const [nurses, setNurses] = useState<Nurse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAllNurses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await nurseService.getAllNurses();
      setNurses(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch nurses');
    } finally {
      setLoading(false);
    }
  }, []);

  const createNurse = useCallback(async (nurse: NursePostModel) => {
    setLoading(true);
    setError(null);
    try {
      await nurseService.createNurse(nurse);
      await fetchAllNurses();
    } catch (err: any) {
      setError(err.message || 'Failed to create nurse');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchAllNurses]);

  const updateNurse = useCallback(async (id: number, nurse: NursePutModel) => {
    setLoading(true);
    setError(null);
    try {
      await nurseService.updateNurse(id, nurse);
      await fetchAllNurses();
    } catch (err: any) {
      setError(err.message || 'Failed to update nurse');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchAllNurses]);

  const deleteNurse = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await nurseService.deleteNurse(id);
      await fetchAllNurses();
    } catch (err: any) {
      setError(err.message || 'Failed to delete nurse');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchAllNurses]);

  return {
    nurses,
    loading,
    error,
    fetchAllNurses,
    createNurse,
    updateNurse,
    deleteNurse,
  };
};
