import React, { createContext, ReactNode, useEffect, useState } from "react";

type Position = {
  latitude: number | null;
  longitude: number | null;
};

type GlobalConfig = {
  position: Position;
  answer: boolean;
  location: boolean;
}

export type UserContextValue = {
  globalConfig: GlobalConfig;
};

export const UserContext = createContext<UserContextValue>({
  globalConfig: {} as GlobalConfig,
});

type State = {
  location: Position;
  setLocation: boolean;
  setAnswer: boolean;
}

type Props = {
  children: ReactNode;
}

const UserProviderComponent = (props: Props) => {

  const [state, setState] = useState<State>({
    location: {
      latitude: null,
      longitude: null,
    },
    setLocation: false,
    setAnswer: false,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setState({
        ...state,
        location: {
          latitude: latitude,
          longitude: longitude,
        },
        setLocation: true,
        setAnswer: true,
      });
    },
    () => {
      setState({
        ...state,
        setAnswer: true,
      });
    });
  }, []);

  return (
    <UserContext.Provider
      value={{
        globalConfig: {
          position: state.location,
          answer: state.setAnswer,
          location: state.setLocation,
        }
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}

export const UserProvider = UserProviderComponent;