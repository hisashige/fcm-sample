import { Box, Text, Button } from "@chakra-ui/react";
import "./App.css";
import { useNotification } from "./hooks/useNotification";

function App() {
  const { permission, isRequesting, requestPermission } = useNotification();

  return (
    <>
      <div>
        <img src="/app_icon/icon-512.png" className="logo" alt="logo" />
      </div>
      <h1>FCM通知検証くん</h1>
      <div className="card">
        <Box>
          {permission === "not-supported" ? (
            <Text>プッシュ通知がサポートされていません</Text>
          ) : permission === "denied" ? (
            <Text>プッシュ通知を拒否しました</Text>
          ) : permission === "granted" ? (
            <Text>新着記事をプッシュ通知します！</Text>
          ) : (
            <Button onClick={requestPermission} isLoading={isRequesting}>
              通知を受け取る
            </Button>
          )}
        </Box>
      </div>
    </>
  );
}

export default App;
