import {useNavigationState} from '@react-navigation/native';

export function useCurrentRoute() {
  return useNavigationState(state => {
    const route = state.routes[state.index];
    return route.name;
  });
}
