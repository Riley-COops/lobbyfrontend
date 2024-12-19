import React, {useEffect, useState} from 'react';
import { fetchNotifications, markAsRead } from './NotificationApi';


function NotificationComponent(){
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const getNotifications= async () =>{
            try{
                const data = await fetchNotifications();
                setNotifications(data);
            } catch (error){
                console.error('Failed to fetch notification:', error);
            }
        }
        getNotifications
    }, []
    )
}

const handleMarkAsRead = async (id) =>{
    try{
        await markAsRead(id);
        setNotifications((prev) =>
        prev.map((notification) =>
            notification.id == id ? {...notification, is_read:true} : notification
        ))
    }catch (error){
        console.error('Failed to mark notification as read', error)
    }

    return(
        <>
        <h2>Notifications</h2>
        <ul>
            {notifications.map((notification)=>
          <li key ={notification.id
          }>
            {notification.message} - {new Date(notification.created_at).toLocaleString()}
            {!notification.is_read && (
                <button onClick={() => handleMarkAsRead(RiNotificationOffLine.id)}> Mark as read</button>
            )}
          </li>  )}
        </ul>
        </>
    )
}


export default NotificationComponent;