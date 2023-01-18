<template>
  <div class="wrapper bg-grey">
    <main class="main container">
      <h1 style="margin: 1rem 0">Задачник курса по Vue 3</h1>
      <nav style="font-size: 20px">
        <ul style="list-style: none">
          <li v-for="(tasks, module) in taskTree" :key="module">
            <strong>{{ module }}</strong>
            <ul style="list-style-type: circle; margin-left: 2rem; color: var(--blue)">
              <li v-for="unit in tasks" :key="unit.task">
                <a :href="`/${unit.path}/`" class="link">{{ unit.task }}</a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </main>
  </div>
</template>

<script>
/** @type {Array<Object>} */
const tasks = import.meta.env.TASKBOOK_TASKS;

export default {
  setup() {
    return {
      taskTree: tasks.reduce((result, unit) => {
        if (!result[unit.module]) {
          result[unit.module] = [];
        }
        result[unit.module].push(unit);
        return result;
      }, {}),
    };
  },
};
</script>

<style>
@import url('@/assets/styles/index.css');
</style>
