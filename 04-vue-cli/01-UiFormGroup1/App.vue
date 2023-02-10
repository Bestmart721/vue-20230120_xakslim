<template>
  <ui-container class="sample">
    <ui-form-group>
      <div class="input-group">
        <input class="form-control" placeholder="No label" />
      </div>
    </ui-form-group>

    <hr />

    <ui-form-group label="Label Text">
      <div class="input-group">
        <input class="form-control" placeholder="With label" />
      </div>
    </ui-form-group>

    <hr />

    <div>
      <ui-form-group inline>
        <div class="input-group">
          <input class="form-control" placeholder="Inline" />
        </div>
      </ui-form-group>

      <ui-form-group inline>
        <div class="input-group">
          <input class="form-control" placeholder="Inline" />
        </div>
      </ui-form-group>
    </div>
  </ui-container>
</template>

<script>
import UiFormGroup from './components/UiFormGroup';
import UiContainer from './components/UiContainer';

export default {
  name: 'App',

  components: { UiContainer, UiFormGroup },
};
</script>

<style scoped>
hr {
  margin: 1rem auto;
}
</style>
