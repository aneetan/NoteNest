import type { AxiosResponse } from "axios";
import { getUserIdFromToken } from "../utils/token.utils";
import axios from "axios";
import { API_URL } from "../utils/url.utils";
import type { Note } from "../types/notes";

export const addNotes = async (formData: Note): Promise<AxiosResponse> => {
  const token = localStorage.getItem("token");
  if (!token) throw Error("Token not valid");

  const userId  = getUserIdFromToken(token) || null;
  if (userId === null || userId !== formData.userId) {
    throw Error("Invalid authorization");
  }
  
  const response = await axios.post(`${API_URL}/note/add-note`, formData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
}

export const viewNotes = async (): Promise<AxiosResponse> => {
  const response = await axios.get(`${API_URL}/note`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });

  return response.data;
}

export const viewNotesByUser = async (userId: number): Promise<AxiosResponse> => {
  const response = await axios.get(`${API_URL}/note/${userId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });

  return response.data;
}

export const editNote = async (formData: Partial<Note>, noteId: number): Promise<AxiosResponse> => {
  const response = await axios.put(`${API_URL}/note/edit-note/${noteId}`, formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
  return response.data;
}

export const deleteNote = async (noteId: number): Promise<AxiosResponse> => {
  const response = await axios.delete(`${API_URL}/note/delete-note/${noteId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
  return response.data.message;
}