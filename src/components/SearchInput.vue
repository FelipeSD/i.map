<template>
  <div
    id="search-input"
    :class="{ focused: isFocused }"
    @focusin="onFocus"
    @focusout="onFocus"
  >
    <input
      type="text"
      placeholder="Search for a location"
      v-model="searchInput"
      @keyup.enter="search"
    />
  </div>
</template>

<script>
export default {
  name: "SearchInput",
  emits: ["onSearch"],
  data() {
    return {
      searchInput: "",
      isFocused: false,
    };
  },
  methods: {
    search() {
      this.$emit("onSearch", this.searchInput);
    },
    onFocus() {
      this.isFocused = !this.isFocused;
    },
  },
};
</script>

<style scoped lang="scss">
#search-input {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  border-radius: 25px;
  background-color: white;
  padding: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: space-between;
  opacity: 0.5;
  transition: opacity 0.3s ease-in-out;

  &.focused {
    opacity: 1;
  }

  & input {
    border: none;
    outline: none;
    font-size: 16px;
    padding: 5px;
    width: 500px;
    background-color: transparent;
  }
}
</style>
