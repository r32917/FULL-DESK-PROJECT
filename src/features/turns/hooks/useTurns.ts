// Custom Hook for Turns
import { useState, useCallback } from 'react';
import type { Turn, TurnPostModel, TurnPutModel } from '../types';
import { turnService } from '../services/turnService';

export const useTurns = () => {
  const [turns, setTurns] = useState<Turn[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAllTurns = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await turnService.getAllTurns();
      setTurns(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch turns');
    } finally {
      setLoading(false);
    }
  }, []);

  const createTurn = useCallback(async (turn: TurnPostModel) => {
    setLoading(true);
    setError(null);
    try {
      await turnService.createTurn(turn);
      await fetchAllTurns();
    } catch (err: any) {
      setError(err.message || 'Failed to create turn');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchAllTurns]);

  const updateTurn = useCallback(async (id: number, turn: TurnPutModel) => {
    setLoading(true);
    setError(null);
    try {
      await turnService.updateTurn(id, turn);
      await fetchAllTurns();
    } catch (err: any) {
      setError(err.message || 'Failed to update turn');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchAllTurns]);

  const deleteTurn = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await turnService.deleteTurn(id);
      await fetchAllTurns();
    } catch (err: any) {
      setError(err.message || 'Failed to delete turn');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchAllTurns]);

  return {
    turns,
    loading,
    error,
    fetchAllTurns,
    createTurn,
    updateTurn,
    deleteTurn,
  };
};
