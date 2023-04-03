<template>
  <li
    class="list-group-item d-flex justify-content-between"
    :class="[{ like: movie.like }, { favourite: movie.favourite }]"
  >
    <span
      @click="$emit('onToggle', { id: movie.id, prop: 'like' })"
      class="list-group-item-label"
      >{{ movie.name }}</span
    >

    <input class="list-group-item-input" type="number" :value="movie.viewers" />
    <div class="d-flex justify-content-center align-items-center">
      <button
        @click="$emit('onToggle', { id: movie.id, prop: 'favourite' })"
        class="btn-cookie btn-sm"
      >
        <i class="fas fa-cookie"></i>
      </button>

      <button @click="$emit('onRemove', movie.id)" class="btn-trash btn-sm">
        <i class="fas fa-trash"></i>
      </button>

      <i class="fas fa-star"></i>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },

  methods: {
    onLike() {
      this.$emit("onLike", this.movie.id);
    },
  },
};
</script>

<style scoped>
.list-group-item {
  padding: 15px 20px;
  background-color: #fcfaf5;
  border: none;
}

.list-group-item:not(:last-child) {
  border-bottom: 1px solid #3d5a80;
}

.list-group-item span {
  line-height: 36px;
  font-size: 20px;
  cursor: pointer;
  width: 550px;
  transition: 0.3s all;
}

.list-group-item input {
  line-height: 35px;
  text-align: center;
  font-size: 20px;
  border: none;
  outline: none;
  background-color: #fcfaf5;
}

.list-group-item button {
  width: 35px;
  height: 35px;
  font-size: 17px;
  margin: 3px;
  background: none;
  border: none;
  cursor: pointer;
}

.list-group-item .btn-cookie {
  color: #e09f3e;
}
.list-group-item .btn-trash {
  color: #e5383b;
}

.list-group-item .fa-star {
  width: 35px;
  height: 35px;
  text-align: center;
  line-height: 35px;
  font-size: 16px;
  color: #ffd700;
  transition: 0.3s all;
  transform: translateX(30px);
  opacity: 0;
}

.list-group-item.like .fa-star {
  opacity: 1;
  transform: translateX(0);
}

.list-group-item.favourite .list-group-item-label,
.list-group-item.favourite .list-group-item-input {
  color: #e09f3e;
}
</style>
