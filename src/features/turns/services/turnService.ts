// Turn Service - API calls
import api from '../../../shared/utils/api';
import type { Turn, TurnPostModel, TurnPutModel } from '../types';

export const turnService = {
  // GET - Get all turns
  getAllTurns: async (): Promise<Turn[]> => {
    try {
      const response = await api.get<Turn[]>('/Turns');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // GET - Get turn by ID
  getTurnById: async (id: number): Promise<Turn> => {
    try {
      const response = await api.get<Turn>(`/Turns/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // POST - Create new turn
  createTurn: async (turn: TurnPostModel): Promise<void> => {
    try {
      await api.post('/Turns', turn);
    } catch (error) {
      throw error;
    }
  },

  // PUT - Update turn
  updateTurn: async (id: number, turn: TurnPutModel): Promise<void> => {
    try {
      await api.put(`/Turns/${id}`, turn);
    } catch (error) {
      throw error;
    }
  },

  // DELETE - Delete turn
  deleteTurn: async (id: number): Promise<void> => {
    try {
      await api.delete(`/Turns/${id}`);
    } catch (error) {
      throw error;
    }
  },
};
