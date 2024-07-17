import { ReactNode, useCallback, useMemo, useReducer } from "react";

import { Box, Text } from "@app/components";

import { CommandContext } from "./CommandContext";
import { commandsReducer } from "./commandsReducer";
import { Command } from "./Command";
import { TouchableOpacity } from "react-native-gesture-handler";

export interface CommandProviderProps {
  children: ReactNode;
}

export function CommandProvider(
    { children }: CommandProviderProps
  ): JSX.Element
{
  const [ commands, dispatch ] = useReducer(commandsReducer, {});

  const register = useCallback(
    (id: string, command: Command) => {
      dispatch({
        register: id,
        command,
      });
    }, []
  );

  const unregister = useCallback(
    (id: string) => {
      dispatch({
        unregister: id,
      });
    }, []
  );

  return (
    <CommandContext.Provider
      value={
        useMemo(
          () => ({ register, unregister }),
          [ register, unregister ]
        )
      }
    >
      <Box
        width={0}
        height={0}
        visible={false}
        overflow={"hidden"}
        position={"absolute"}
        top={-9999}
        left={-9999}
        style={{
          padding: 0,
          margin: -1,
        }}
      >
        {children}
      </Box>

      <Box>
        {Object.entries(commands).map(
          ([ id, command ]) => (
            <TouchableOpacity key={id} onPress={command.action}>
              <Box borderWidth={1}>
                <Text>{id}</Text>
                <Text>{command.name}</Text>
              </Box>
            </TouchableOpacity>
          )
        )}
      </Box>
    </CommandContext.Provider>
  );
}
