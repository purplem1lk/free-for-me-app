import React from "react";
import { ChatkitProvider, TokenProvider } from "@pusher/chatkit-client-react";

import Chat from "./Chat";

// These are our public keys, not our secret keys. The secret key is only used in Rails so it's not public, otherwise anyone can go to this component.js and see our secret key
const instanceLocator = "v1:us1:ac944341-a321-4e72-968c-e2e07aca10ac";
const tokenProvider = new TokenProvider({
  url:
    "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/ac944341-a321-4e72-968c-e2e07aca10ac/token"
});

const ChatsContainer = props => {
  // coming from URL params, the userId and otherUserId  are always strings, coming from the route/query parameters
  let userId = props.match.params.userId;
  let otherUserId = props.match.params.otherUserId;

  return (
    <div>
      <ChatkitProvider
        instanceLocator={instanceLocator}
        tokenProvider={tokenProvider}
        userId={userId}
      >
        <Chat otherUserId={otherUserId} />
      </ChatkitProvider>
    </div>
  );
};

export default ChatsContainer;
