import { useSessionStore } from "@/stores/session";

export default defineNuxtRouteMiddleware((to, from) => {
  const session = useSessionStore();

  if (to.fullPath === '/' && session.getSessionType() !== 'none') {
    return navigateTo('/editor');
  }

  if (to.fullPath.startsWith('/editor') && session.getSessionType() === 'none') {
    return navigateTo('/');
  }
});
