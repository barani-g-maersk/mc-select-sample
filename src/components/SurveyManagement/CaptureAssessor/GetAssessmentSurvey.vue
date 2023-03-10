<template>
  <div class="content-group mb-20">
    <div class="left-content">
      <p class="mds-font--display-2"> Assessments Survey Details</p>
    </div>
  </div>
  <div class="first-half f16 p0 ptb-20">
    <p>
      <li class="list-view"><b>Assessee UID</b></li>
      <li class="list-view f14">{{ getsurvey.userId }}</li>
    </p>
    <li class="list-view"><b>Assessee Name</b> <br> <span class="f14">{{ getsurvey.employeeName }}</span></li>
    <p>
      <li class="list-view"><b>Role</b></li>
      <li class="list-view f14">{{ getsurvey.roleName }}</li>
    </p>
  </div>
  <div class="border-rd-6 border-1-52 mt-10" v-if="getsurvey && getsurvey.competenciesMap && getsurvey.competenciesMap.length > 0">
    <div class="dialog m-10 second-bg-color" v-for="cg, cgindex in getsurvey.competenciesMap">
      <div class="cg-title-name" style="border-top-left-radius: 6px; border-top-right-radius: 6px;">
        <div style="float: left; padding: 5px;"><b>{{ cg.name }}</b></div>
      </div>
      <div class="mds-table">
        <table>
          <thead>
            <tr>
              <th>Competency Name</th>
              <th>Benchmark</th>
              <th>Actual Level</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody
            v-if="getsurvey.competenciesMap && getsurvey.competenciesMap[cgindex].competencies && getsurvey.competenciesMap[cgindex].competencies.length > 0">
            <tr v-for="comp, cindex in getsurvey.competenciesMap[cgindex].competencies">
              <td>{{ comp.name }}</td>
              <td>{{ comp.benchMark }}</td>
              <td>{{ comp.actualBenchMark }}</td>
              <td>
                <a href="javascript:void(0)" @click="showAttributes(cg.id, comp.id)">View</a>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="4" class="t-center">No Data</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  

  <div class="footer-button-group mt-10">
    <mc-button fit="small" variant="secondary" @click="CancelHandler()">Cancel</mc-button>
  </div>
  <div v-if="popupTriggers" class="popup">
    <div class="popup-inner" style="margin: 10px;">
      <a href="javascript:void(0)" class="close-thik" @click="popupclose"></a>
      <div class="second-section" style="margin: 10px; margin-bottom: 20px;">
        <div class="cg-verify-grid-item-1">
          <div>
            <!-- <span style="font-size: 18px; text-align: left; left: 0%;">Competency Details</span> -->
            <p class="row-wise pb-15" style=" border-radius: 6px; margin-bottom: 10px;">
            <ul style="padding: 5px 0px 0px 8px;">
              <li class="list-view" style="font-size: 14px;"><b>Competency Name </b></li>
              <li class="list-view mb-20" style="font-size: 14px;">{{ compview.name }}</li>
            </ul>
            <ul style="padding: 5px 0px 0px 50%;">
              <li class="list-view" style="font-size: 14px;"><b>Competency Id </b></li>
              <li class="list-view mb-20" style="font-size: 14px;">{{ compview.competencyId ? compview.competencyId :
                  ""
              }}</li>
            </ul>
            </p>
            <div style="padding-left: 8px;">
              <li class="list-view" style="font-size: 14px;"><b>Competency Description </b></li>
              <li class="list-view mb-20 pr-10" style="font-size: 14px;">{{ compview.description }}</li>
            </div>
          </div>
        </div>
        <div class="cg-verify-grid-item-2">
          <div class="content-group">
            <div class="table-grid">
              <div class="mds-table">
                <table>
                  <thead>
                    <tr>
                      <th style="font-size: 14px;">
                        Foundation level attribute</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in compview.attributes.filter(el => el.competencyLevel.id === 1)"
                      :key="index">
                      <td style="font-size: 14px; word-break: break-all;">
                        <span style="padding-right: 10px; font-weight: 600;">{{ index + 1 }}.</span>
                        <span style="text-align: justify;">{{ item.description }}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="mds-table">
                <table>
                  <thead>
                    <tr>
                      <th style="font-size: 14px;">
                        Proficient level attribute</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in compview.attributes.filter(el => el.competencyLevel.id === 2)"
                      :key="index">
                      <td style="font-size: 14px; word-break: break-all;">
                        <span style="padding-right: 10px; font-weight: 600;">{{ index + 1 }}.</span>
                        <span style="text-align: justify;">{{ item.description }}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="mds-table">
                <table>
                  <thead>
                    <tr>
                      <th style="font-size: 14px;">
                        Advanced level attribute</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in compview.attributes.filter(el => el.competencyLevel.id === 3)"
                      :key="index">
                      <td style="font-size: 14px; word-break: break-all;">
                        <span style="padding-right: 10px; font-weight: 600;">{{ index + 1 }}.</span>
                        <span style="text-align: justify;">{{ item.description }}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style="margin-left: 10px;">
        <mc-button fit="small" @click="popupclose">Close</mc-button>
      </div>
    </div>
  </div>
</template>
      
<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import { useCaptureAssessorStore } from "@/stores/CaptureAssessor";
import "@maersk-global/mds-components-core";
import "@maersk-global/fonts/maeu/fonts.css";
import "@maersk-global/mds-components-core/mc-button";
import "@maersk-global/mds-design-tokens/maersk/light/web/css/design-tokens.css";
import "@maersk-global/mds-foundations/foundations.css";
import type { verfiyassessee, validatestatus, dropdown, competencies } from "@/Models/SurveyManagement";
import type { CompetencyGroup, Competencies } from "@/Models/CompetencyGroup";
import { computed, ref } from "vue";
import router from "@/router";


export default defineComponent({
  name: 'GetAssessmentSurvey',
  setup() {
    const store = useCaptureAssessorStore();
    const popupTriggers = ref(false);
    let getsurvey = computed(() => {
      return store.getsurvey;
    });
    function CancelHandler() {
      router.push('/CaptureAssessorView').catch(() => {});
    }
    let compview = ref({} as Competencies);
    let cgview = computed(() => {
      return store.competencyGrp;
    });
    async function showAttributes(Cgid: number, compid: number) {
      await store.viewAttributes(Cgid, compid);
      compview.value = cgview.value.competencies.filter(el => el.id == compid)[0]
      console.log(cgview.value, compid)
      popupTriggers.value = !popupTriggers.value;
    }
    function popupclose() {
      popupTriggers.value = !popupTriggers.value;
    }
    return {
      getsurvey,
      CancelHandler,
      popupclose,
      showAttributes,
      popupTriggers,
      compview
    }
  },
});
</script>
<style>
/* .left-content {
  display: flex;
  gap: 10px;
  align-items: center;
  float: left;
} */

.first-half {
  display: grid;
  gap: 20px;
  grid-template-columns: 30% 30% 30%;
  padding: 10px;
}

.popup {
  position: fixed;
  top: 0%;
  left: 0%;
  right: 0;
  bottom: 0;
  /* z-index: 99; */
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  z-index: 999;
  overflow: auto;
}

.popup-inner {
  background: white;
  padding: 20px;
  width: 90%;
}


h2,
p {
  padding: 0 10px;
}

.p {
  text-align: left;
  padding: 10px;
  left: 0px;
}

.cg-title-name {
  padding-top: 5px;
  padding-left: 10px;
  /* //padding-bottom: 5spx; */
  /* //background-color: #f7f7f7; */
  color: black;
  /* //border-bottom: var(--mdt-core-border-width) var(--mdt-core-border-style) var(--mdt-theme-border-color); */
}

.cg-verify-grid-item-1 {
  padding-top: 10px;
  padding-left: 8px;
  /* font-size: 20px; */
  text-align: left;
  border: 1px solid rgba(155, 155, 155, 0.5);
  ;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  /* border-radius: 6px; */
  /* box-shadow: 0 1px 6px 0 rgb(0 0 0 / 40%); */
  background-color: #F7F7F7;
}

.cg-verify-grid-item-2 {
  padding: 15px;
  font-size: 20px;
  text-align: left;
  border: 1px solid rgba(155, 155, 155, 0.5);
  border-top: none;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  /* border-radius: 6px; */
  /* box-shadow: 0 1px 6px 0 rgb(0 0 0 / 40%); */
  /* background-color: #F7F7F7; */
}

[class*='close-'] {
  color: #aaaaaa;
  /* background-color: white; */
  font: 15px/100% arial, sans-serif;
  position: absolute;
  right: 13px;
  text-decoration: none;
  text-shadow: 0 1px 0 #fff;
  top: 13px;
  /* font-size: 15px; */
}

.close-thik:after {
  content: '✖';
}

.close-thik:hover,
.close-thik:focus {
  background-color: white;
  color: #000;
  text-decoration: none;
  cursor: pointer;
}


.table-grid {
  display: grid;
  margin: 5px;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.row-wise {
  display: grid;
  grid-template-columns: 50% 50%;
}


</style>
      