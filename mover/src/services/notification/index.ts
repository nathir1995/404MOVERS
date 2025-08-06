import React from "react";
import client from "@/api/client";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { IndexResponseType, Page } from "./types";
import NotificationItem from "@/models/notification";
import useProcessingArrayOnMutation from "@/hooks/useProcessingArrayOnMutation";
import {
  // MarkAllAsReadPagesUpdater,
  MarkAsReadPagesUpdater,
  // receiveNewNotification,
  useUserId,
} from "./utils";
// import useRealTimeNotifications from "./real-time";

const KEY = "NOTIFICATIONS";
const API_ENDPOINTS = {
  INDEX: "/api/notification/all",
  MARK_AS_READ: `/api/notification/read`,
  // MARK_ALL_AS_READ: `/notification/mark-all-read`,
} as const;
// const REFETCH_INTERVAL_IN_SECONDS = 60;

export const useGetNotifications = () => {
  const userId = useUserId();
  const queryClient = useQueryClient();

  const query = useInfiniteQuery({
    queryKey: [KEY, userId],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await client.get<IndexResponseType>(
        API_ENDPOINTS.INDEX,
        {
          params: {
            page: pageParam,
          },
        }
      );
      return {
        data: response.data.data.notifications,
        notification_number: response.data.data.notification_number,
      };
    },
    getNextPageParam: (lastPage) => {
      const { current_page, last_page } = lastPage.data;
      if (current_page === last_page) {
        return undefined;
      }
      return current_page + 1;
    },
    // refetchInterval: REFETCH_INTERVAL_IN_SECONDS * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled: userId !== undefined,
  });

  // useRealTimeNotifications({
  //   onRecieve: (newItem) => {
  //     queryClient.setQueryData<{ pages?: Page[]; pageParams?: any }>(
  //       [KEY, userId],
  //       (props) => {
  //         const pages = props?.pages;
  //         const pageParams = props?.pageParams;
  //         return {
  //           pageParams,
  //           pages: receiveNewNotification(newItem, pages),
  //         };
  //       }
  //     );
  //   },
  // });

  const notifications: NotificationItem[] = React.useMemo(() => {
    const { data } = query;
    if (!data || !data.pages) return [];
    return data.pages.reduce<NotificationItem[]>(
      (prev, curr) => [...prev, ...curr.data.data],
      []
    );
  }, [query]);

  return {
    notifications,
    ...query,
  };
};

export const useNotificationCount = (): number | undefined => {
  const { data } = useGetNotifications();
  return data?.pages?.[0]?.notification_number;
};

export const useMarkNotificationAsRead = () => {
  const { startProcessing, endProcessing, isProcessing } =
    useProcessingArrayOnMutation<string>();

  const queryClient = useQueryClient();
  const userId = useUserId();

  const mutation = useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      await client.post(API_ENDPOINTS.MARK_AS_READ, { notification_id: id });
    },
    onMutate({ id }) {
      startProcessing(id);
    },
    onSettled(_, __, variables) {
      endProcessing(variables.id);
    },
    onSuccess(_, variables) {
      const { id } = variables;
      queryClient.setQueryData<{ pages?: Page[]; pageParams?: any }>(
        [KEY, userId],
        (props) => {
          const pages = props?.pages;
          const pageParams = props?.pageParams;
          return {
            pageParams,
            pages: MarkAsReadPagesUpdater(id, pages),
          };
        }
      );
    },
  });

  return {
    ...mutation,
    isProcessing,
  };
};

// export const useMarkAllNotificationsAsRead = () => {
//   const queryClient = useQueryClient();
//   const userId = useUserId();

//   return useMutation({
//     mutationFn: async () => {
//       // await client.put(API_ENDPOINTS.MARK_ALL_AS_READ);
//     },
//     onSuccess() {
//       queryClient.setQueryData<{ pages?: Page[]; pageParams?: any }>(
//         [KEY, userId],
//         (props) => {
//           const pages = props?.pages;
//           const pageParams = props?.pageParams;
//           return {
//             pageParams,
//             pages: MarkAllAsReadPagesUpdater(pages),
//           };
//         }
//       );
//     },
//   });
// };
