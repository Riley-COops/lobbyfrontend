import axios from 'axios';
import api from './Api.jsx';

const API_URL = '/api/notifications';

export const fetchNotifications =  async () => {
    try{
        const response = await api.get('/ap/notifications/');
        return response.data;
    } catch (error){
        console.error('Error fetching notifications:', error);
        throw error;
    }
}

export const markAsRead =  async (notificationId) => {
    try {
        await api.patch(`/api/notifications/${notificationId}`, {is_read: true});
    } catch (error){
        console.error('Error marking notification as read:', error)
        throw error;
    }
}