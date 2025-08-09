@@ const OpenedChatBox = ({ openedChat, openedChatId, closeChat }: IProps) => {
-  return (
+  // If counter_user is undefined, provide empty defaults to avoid
+  // reading properties of undefined.
+  const counterUser = openedChat?.counter_user ?? {
+    first_name: "",
+    last_name: "",
+    email: "",
+    phone_number: "",
+  };
+  return (
@@
-               {openedChat.counter_user.first_name}{" "}
-               {openedChat.counter_user.last_name}
+               {counterUser.first_name} {counterUser.last_name}
@@
-               {openedChat.counter_user.email}
+               {counterUser.email}
@@
-               {openedChat.counter_user.phone_number}
+               {counterUser.phone_number}
@@
   );
