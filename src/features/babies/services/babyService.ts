// Baby Service - API calls
import api from '../../../shared/utils/api';
import type { Baby, BabyPostModel, BabyPutModel } from '../types';

export const babyService = {
  // GET - Get all babies
  getAllBabies: async (): Promise<Baby[]> => {
    try {
      const response = await api.get<Baby[]>('/Babies');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // GET - Get baby by ID
  getBabyById: async (id: number): Promise<Baby> => {
    try {
      const response = await api.get<Baby>(`/Babies/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // POST - Create new baby
  createBaby: async (baby: BabyPostModel): Promise<void> => {
    try {
      await api.post('/Babies', baby);
    } catch (error) {
      throw error;
    }
  },

  // PUT - Update baby
  updateBaby: async (id: number, baby: BabyPutModel): Promise<void> => {
    try {
      await api.put(`/Babies/${id}`, baby);
    } catch (error) {
      throw error;
    }
  },

  // DELETE - Delete baby
  deleteBaby: async (id: number): Promise<void> => {
    try {
      await api.delete(`/Babies/${id}`);
    } catch (error) {
      throw error;
    }
  },
};
