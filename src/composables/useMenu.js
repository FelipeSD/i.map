import { ref } from "vue";

export default function useMenu() {
  const isMenuOpen = ref(false);

  function openMenu() {
    isMenuOpen.value = true;
  }

  function closeMenu() {
    isMenuOpen.value = false;
  }

  function toggleMenu() {
    isMenuOpen.value = !isMenuOpen.value;
  }

  return {
    isMenuOpen,
    openMenu,
    closeMenu,
    toggleMenu,
  };
}