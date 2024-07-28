import axios from 'axios';
import { IScene } from '../components/SceneList/SceneList.typees';
import { ICrew } from '../components/CrewList/CrewList';

export default class ApiServices {
  /**
   * Fetches scenes list from API.
   * @returns {Promise<IScene[]>} - A promise resolving to the scenes list.
   */
  static async getScenes(url: string): Promise<IScene[]> {
    try {
      const response = await axios.get<IScene[]>(url);
      return response.data;
    } catch (error) {
      ApiServices.handleError('Error fetching scenes list', error);
      throw error;
    }
  }

  /**
   * Fetches crew list from API.
   * @returns {Promise<ICrew[]>} - A promise resolving to the crew list.
   */
  static async getCrew(url: string): Promise<ICrew[]> {
    try {
      const response = await axios.get<ICrew[]>(url);
      return response.data;
    } catch (error) {
      ApiServices.handleError('Error fetching crew list', error);
      throw error;
    }
  }

  


  /**
   * Handles API errors by logging them.
   * @param {string} message - Custom error message.
   * @param {any} error - The error object.
   */
  private static handleError(message: string, error: any): void {
    const errorMessage = (error instanceof Error) ? error.message : 'An unknown error occurred';
    console.error(`${message}: ${errorMessage}`);
  }

}
