import axios from 'axios';

// Get the appropriate API URL based on environment
const API_URL = typeof window === 'undefined'
  ? process.env.STRAPI_API_URL || 'http://strapi:1337/api'
  : process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

// API helper functions
export const fetchAPI = async (endpoint: string, params?: any) => {
  try {
    const response = await api.get(endpoint, { params });
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
};

export const postAPI = async (endpoint: string, data: any) => {
  try {
    const response = await api.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error(`Error posting to ${endpoint}:`, error);
    throw error;
  }
};

// Content type specific functions
export const getProjects = async () => {
  return fetchAPI('/projects', { populate: '*' });
};

export const getProject = async (slug: string) => {
  return fetchAPI('/projects', {
    filters: { slug: { $eq: slug } },
    populate: '*',
  });
};

export const getBlogPosts = async () => {
  return fetchAPI('/blog-posts', { populate: '*' });
};

export const getBlogPost = async (slug: string) => {
  return fetchAPI('/blog-posts', {
    filters: { slug: { $eq: slug } },
    populate: '*',
  });
};

export const getAbout = async () => {
  return fetchAPI('/about', { populate: '*' });
};

export const submitContactForm = async (data: any) => {
  return postAPI('/contact-messages', { data });
};

export default api;
