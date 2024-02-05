import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import useNotifications from '../../utils/notifications'; // Adjust the path to your notifications utility file
import api from '../../utils';

const NEW_ORDER_NOTIFICATION_ID = 'NEW_ORDER_NOTIFICATION';

export default function OrdersListner() {
 // Get the current orders from the Redux store
 const currentOrders = useSelector((state) => state?.orders?.orders);

 // Fetch orders from the server
 const { data: ordersData, refetch: refetchOrders } = useQuery({
    queryKey: ['orders'],
    queryFn: () => api.get('/api/orders?populate=deep'),
    refetchIntervalInBackground: true,
 });

 // Notification hook
 const { sendPushNotification, token } = useNotifications();

 // Function to check for new orders
 const checkForNewOrders = async () => {
    try {
      // Fetch the latest orders from the server
      const newOrders = await refetchOrders();

      // Compare the new orders with the current orders in the Redux store
      if (newOrders && newOrders.length > currentOrders.length) {
        // Send a notification to the user
        sendPushNotification(token, 'New Order Added', 'A new order has been added.');
      }
    } catch (error) {
      console.error('Error checking for new orders:', error);
    }
 };

 // Effect to run the checkForNewOrders function periodically
 useEffect(() => {
    const intervalId = setInterval(checkForNewOrders, 60000); // Check every minute

    return () => {
      clearInterval(intervalId);
    };
 }, [currentOrders, refetchOrders, sendPushNotification, token]);

 // Render nothing, just perform the background task
 return null;
}
