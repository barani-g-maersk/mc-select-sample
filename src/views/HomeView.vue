<template>

  <div class="content-group">
    <div class="left-content">
      <CaptureAssessor/>
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent } from "vue";
import CaptureAssessor from "@/components/SurveyManagement/CaptureAssessor/CaptureAssessor.vue"
export default defineComponent({
  components: {CaptureAssessor
  },
  setup() {
    return {
    };
  },
});
</script>
<style>
.left-content {
  display: flex;
  float: left;
}
</style>