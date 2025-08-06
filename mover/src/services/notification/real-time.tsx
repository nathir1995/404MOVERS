// import React from 'react';
// import { useNotificationAudioPlayer, useUserId } from './utils';
// import NotificationItem from 'src/logic/models/notification';
// import { toast } from 'react-toastify';
// import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
// import { useRouter } from 'next/router';
// import { getPathWithoutQueryParams } from 'src/logic/utils/url';
// import { getUrlBasedOnFormType } from '../form-types-navigation';
// import { useMarkNotificationAsRead } from '.';

// type NewNotificationData = {
//   data: NotificationItem;
// };

// type IProps = {
//   onRecieve?: (newItem: NotificationItem) => void;
// };

// const useRealTimeNotifications = ({ onRecieve }: IProps) => {
//   const musicPlayer = useNotificationAudioPlayer();
//   const userId = useUserId();
//   const { mutate: markAsRead } = useMarkNotificationAsRead();

//   const router = useRouter();
//   const onToastClick = (notificationItem: NotificationItem) => {
//     markAsRead({ id: notificationItem.id });
//     const { form_id, form_type } = notificationItem.meta;

//     const fromLink = getPathWithoutQueryParams(router.asPath);
//     const toLink = getUrlBasedOnFormType(form_type, form_id.toString());

//     if (fromLink === toLink) {
//       router.reload();
//     } else {
//       router.push(toLink);
//     }
//   };

//   React.useEffect(() => {
//     if (!userId) {
//       return;
//     }
//     if (
//       !window.Echo.private(`notifications.${userId}`).subscription.subscribed
//     ) {
//       window.Echo.private(`notifications.${userId}`)
//         .subscribed(() => {
//           console.log('You are subscribed to notification channel');
//         })
//         .listen('.notifications', (data: NewNotificationData) => {
//           musicPlayer.current?.play();
//           const newNotification = data.data;
//           toast.info(newNotification.content, {
//             position: 'bottom-right',
//             icon: <NotificationsActiveIcon />,
//             onClick: () => onToastClick(newNotification),
//           });

//           onRecieve?.(newNotification);
//         });
//     }

//     return () => {};
//   }, [userId]);
// };

// export default useRealTimeNotifications;
