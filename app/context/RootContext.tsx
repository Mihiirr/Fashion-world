import { Cart, Order, User } from "@prisma/client";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";

type State = {
  user: User | null;
  // order: Array<Order> | null;
  cart: {
    cartItems: Array<Cart>;
    totalCartItems: [{ userId: string; _count: { productId: number } }];
  };
  isAuthModalOpen: boolean;
  postSlug?: string;
};

type RootContextProviderProps = {
  children: React.ReactNode;
  initState: State;
};

enum AuthModalActions {
  OPEN_AUTH_MODAL,
  CLOSE_AUTH_MODAL,
}

type Action = {
  type: AuthModalActions;
  payload?: {
    postSlug?: string;
  };
};

const RootContext = createContext<
  | {
      rootState: State;
      openAuthModal: (postSlug?: string) => void;
      closeAuthModal: () => void;
    }
  | undefined
>(undefined);

function rootStateReducer(state: State, action: Action) {
  switch (action.type) {
    case AuthModalActions.OPEN_AUTH_MODAL: {
      return {
        ...state,
        isAuthModalOpen: true,
        postSlug: action.payload?.postSlug,
      };
    }
    case AuthModalActions.CLOSE_AUTH_MODAL: {
      return { ...state, isAuthModalOpen: false };
    }
    default: {
      throw new Error(`Unhandled action type: ${action}`);
    }
  }
}

function RootContextProvider({
  children,
  initState,
}: RootContextProviderProps) {
  const [rootState, dispatch] = useReducer(rootStateReducer, initState);

  const openAuthModal = useCallback((postSlug?: string) => {
    dispatch({ type: AuthModalActions.OPEN_AUTH_MODAL, payload: { postSlug } });
  }, []);
  const closeAuthModal = useCallback(() => {
    dispatch({ type: AuthModalActions.CLOSE_AUTH_MODAL });
  }, []);

  const value = useMemo(
    () => ({ rootState, openAuthModal, closeAuthModal }),
    [rootState, openAuthModal, closeAuthModal]
  );

  return <RootContext.Provider value={value}>{children}</RootContext.Provider>;
}

function useRootContext() {
  const context = useContext(RootContext);
  if (context === undefined) {
    throw new Error("useRootContext must be used within a RootContextProvider");
  }
  return context;
}

export { RootContextProvider, useRootContext };
