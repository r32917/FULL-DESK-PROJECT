// Nurse Service - API calls
import api from '../../../shared/utils/api';
import type { Nurse, NursePostModel, NursePutModel } from '../types/index';

export const nurseService = {
  // GET - Get all nurses
  getAllNurses: async (): Promise<Nurse[]> => {
    try {
      const response = await api.get<Nurse[]>('/Nures');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // GET - Get nurse by ID
  getNurseById: async (id: number): Promise<Nurse> => {
    try {
      const response = await api.get<Nurse>(`/Nures/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // POST - Create new nurse
  createNurse: async (nurse: NursePostModel): Promise<void> => {
    try {
      await api.post('/Nures', nurse);
    } catch (error) {
      throw error;
    }
  },

  // PUT - Update nurse
  updateNurse: async (id: number, nurse: NursePutModel): Promise<void> => {
    try {
      await api.put(`/Nures/${id}`, nurse);
    } catch (error) {
      throw error;
    }
  },

  // DELETE - Delete nurse
  deleteNurse: async (id: number): Promise<void> => {
    try {
      await api.delete(`/Nures/${id}`);
    } catch (error) {
      throw error;
    }
  },
};
