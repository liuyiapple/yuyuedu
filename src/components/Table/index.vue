<template>
  <table>
    <thead>
      <tr>
        <th v-for="column in columns" :key="column.prop">{{ column.label }}</th>
        <!-- <th>操作</th> -->
        <!-- 点击事件需要把当前行的参数传递过去 -->
        <th v-if="actions.length">
          <button @click="edit(column)">
            {{ action.label }}
          </button>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in data" :key="item.id">
        <td v-for="column in columns" :key="column.prop">
          {{ item[column.prop] }}
        </td>
        <td>
          <button
            v-for="action in actions"
            :key="action.label"
            @click="handleActionClick(action, item)"
          >
            {{ action.label }}
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    columns: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    actions: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    handleActionClick(action, row) {
      this.$emit('action-click', action, row)
    },
  },
})
</script>
