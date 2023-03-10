<template>
  <!-- For displaying page title & total counts-->
  <div class="content-group mb-20">
    <div class="left-content">
      <p class="mds-font--display-2"> Assessment Survey Start</p>
    </div>
  </div>
  <!-- For displaying search and action button-->
  <!-- <div class="content-group">
    <div class="left-content pt-22-pb-20">
      <p class="mds-font--display-1">Competencies</p>
    </div>
  </div> -->
  <div class="step-indicator-flex">
    <mc-step-indicator fit="small" :currentindex=index :labels.prop="getCG()"></mc-step-indicator>
  </div>
  <div class="content-group">
    <div class="left-content pt-22-pb-20">
      <p class="mds-font--display-1">Competencies (Role : {{ AsseseeforAssessor.roleName }})</p>
    </div>
  </div>
  <div class="content-group">
    <div>
      <div class="dialog border-rd-6">
        <div class="content-group mb-20" v-for="comp, cindex in AsseseeforAssessor.competencyDetails[index].competencies">
          <div class="left-content pt-22-pb-20 ">
            <p class="mds-font--display-1 pl-10 f16"> {{ comp.competencyId ? comp.competencyId : "" }} {{comp.competencyId ? "-" : ""}} {{ comp.name }} </p>
          </div>
          <div class="right-content" style="z-index: 999;">
            <p class="cat-font f16 pr-20 top-20 clickable" @click="showAttributes(comp.id)">View</p>
          </div>
          <div class="mds-table">
            <table>
              <thead>
                <tr class="f16">
                  <th>UID</th>
                  <th>Employee Name</th>
                  <th>Expected Level</th>
                  <th>Actual Level</th>
                </tr>
              </thead>
              <tbody>
                <tr class="f14"
                  v-for="assessee, uindex in AsseseeforAssessor.competencyDetails[index].competencies[cindex].userDetails">
                  <td>{{ assessee.userId }}</td>
                  <td>{{ assessee.employeeName }}</td>
                  <!-- <td>{{comp.benchMarkId}}</td> -->
                  <td>{{ CLevels().find(lvl => (lvl.value === comp.benchMarkId))?.label }}</td>
                  <td> <mc-select fit="small" name="" :options.prop="CLevels()" label="" placeholder=""
                      :value.prop="[{ value: assessee.actualId }]" @change="changeActual($event, index, cindex, uindex)">
                    </mc-select></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="footer-button-group mt-10">
    <mc-button fit="small" @click="NextCG()" v-if="AsseseeforAssessor.competencyDetails[index + 1]"
      :disabled="validateField">Next</mc-button>
    <mc-button fit="small" variant="secondary" v-if="index != 0" @click="PreviousHandler()">Previous</mc-button>
    <mc-button fit="small" @click="submitSurveyDetails()" v-if="!AsseseeforAssessor.competencyDetails[index + 1]">
      Submit</mc-button>
    <mc-button fit="small" variant="secondary" @click="CancelHandler()">Cancel</mc-button>
  </div>




  <!-- Modal -->
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
import { defineComponent, onMounted, reactive, computed, ref } from "vue";
import "@maersk-global/mds-components-core";
import "@maersk-global/fonts/maeu/fonts.css";
import "@maersk-global/mds-components-community";
import "@maersk-global/mds-components-core/mc-button";
import "@maersk-global/mds-design-tokens/maersk/light/web/css/design-tokens.css";
import "@maersk-global/mds-foundations/foundations.css";
import type { CaptureAssessor, competencyDetails, competencies, dropdown, userdetails, createsurvey } from "@/Models/SurveyManagement";
import { useCaptureAssessorStore } from "@/stores/CaptureAssessor";
import router from "@/router";
import type { Roles } from "@/Models/RoleManagement";
import commonFun from "@/Mixins/common";


export default defineComponent({
  name: 'SurveyStarted',
  setup() {

    const store = useCaptureAssessorStore();
    const { successAlertMessage, errorAlertMessage } = commonFun();
    store.fetchAllRoles();
    store.fetchExpectedLevels();
    function CLevels() {
      return store.ExpectedLevels;
    }
    let CG = [] as any;
    let role: Roles = store.Role;
    let surveystarted = reactive([] as Array<createsurvey>);

    let index = ref(0);
    const AsseseeforAssessor = computed(() => {
      return store.getAssessee;
    });
    let count = ref(0);
    let validateField = computed(() => {

      //       store.getAssessee.competencyDetails[index.value].competencies.forEach(elt=>{
      //         elt.userDetails.forEach(elt =>{
      //         console.log("hitting the validation----")
      //         console.log(count.value);
      // if(elt.actualId==0)
      // count.value = count.value+1;
      // })
      //       });
      // if(count.value==0)
      // return false;
      // else
      // return true;
    });
    function getCG() {
      console.log(store.getAssessee)
      CG.length = 0;
      store.getAssessee.competencyDetails.forEach(elt => {
        CG.push(elt.name)
      });
      // store.Role.competenciesMap.competencyGroups.forEach(elt => {
      //   CG.push(elt.name)
      // });
      return CG;
    }
    const compview = ref({} as competencies);
    const popupTriggers = ref(false);
    function showAttributes(Cid: number) {
      compview.value = store.getAssessee.competencyDetails[index.value].competencies.filter(comp => comp.id == Cid)[0];
      console.log(compview.value)
      // store.viewAttributes(index);
      popupTriggers.value = !popupTriggers.value;
    }
    function popupclose() {
      popupTriggers.value = !popupTriggers.value;
    }
    function changeActual(event: any, index: number, cindex: number, uindex: number) {
      console.log("--getting all the index-----")
      console.log(index, cindex, uindex, event.detail);

      if (event.detail.selectedOptions[0].value == 0)
        count.value++;

      if (event.detail.selectedOptions.length >= 1) {
        surveystarted.push({
          userSurveyAssessmentId: store.getAssessee.competencyDetails[index].competencies[cindex].userDetails[uindex].usersurveyid,
          userId: store.getAssessee.competencyDetails[index].competencies[cindex].userDetails[uindex].id,
          roleId: store.getAssessee.roleTId,
          competencyGroupId: store.getAssessee.competencyDetails[index].id,
          competencyId: store.getAssessee.competencyDetails[index].competencies[cindex].id,
          benchMarkId: store.getAssessee.competencyDetails[index].competencies[cindex].benchMarkId,
          actualLevelId: event.detail.selectedOptions[0].value,
          assessmentTypeId: 5
        })
        //  store.getAssessee.competencyDetails[index].competencies[cindex].userDetails[uindex].actualId=event.detail.selectedOptions[0].value;
        //   store.getAssessee.competencyDetails[index].competencies[cindex].userDetails[uindex].actualLevel=event.detail.selectedOptions[0].label;
      }
      else {
        store.getAssessee.competencyDetails[index].competencies[cindex].userDetails[uindex].actualId = 0;
        //store.getAssessee.competencyDetails[index].competencies[cindex].userDetails[uindex].actualLevel="";
      }
      console.log("---on change actual level")
      console.log(event.detail, surveystarted)
    }
    function NextCG() {
      index.value = index.value + 1;
    }
    function CancelHandler() {
      router.push('/CaptureAssessorView').catch(() => {});
    }
    function PreviousHandler() {
      index.value = index.value - 1;
    }
    
    //saveSurvey
    async function submitSurveyDetails() {
      let payLoad = {
        "assessmentsurvey": surveystarted
      }
      let result = await store.createSurvey(surveystarted);
      if (result && result.data) {
        successAlertMessage("Survey has been created");
        router.push('/CaptureAssessorView').catch(() => {});
      } else {
        errorAlertMessage(result.message);
        surveystarted = [];
      }
    }

    return {
      successAlertMessage,
      errorAlertMessage,
      getCG,
      role,
      AsseseeforAssessor,
      CLevels,
      validateField,
      showAttributes,
      popupTriggers,
      compview,
      popupclose,
      changeActual,
      index,
      NextCG,
      CancelHandler,
      PreviousHandler,
      submitSurveyDetails
    }
  },
});
</script>
<style>
.topbutton-group {
  display: flex;
  gap: 10px;
  font-size: 15px !important;
  padding: 20px;
  left: 200px;
  align-items: center;
}

.content-group {
  display: flow-root;

}

.left-content {
  display: flex;
  gap: 10px;
  align-items: center;
  float: left;
}

.right-content {
  display: flex;
  gap: 10px;
  float: right;
}

.pb-10 {
  padding-bottom: 10px;
}

.ptb-20 {
  padding: 20px 0px;
}

.pt-22-pb-20 {
  padding: 22px 0px 20px;

}

.pagination {
  padding: 20px;
  left: 0%;
}

.dialog {
  background: white;
  position: relative;
  font-size: 18px;
  text-align: left;
  background-color: #ffffff;
  padding: 20px;
  /* border-radius: var(--mdt-core-border-radius-m);
  border: var(--mdt-core-border-width) var(--mdt-core-border-style) var(--mdt-theme-border-color); */
}

.cg-title-name {
  padding-top: 5px;
  padding-left: 5px;
  padding-bottom: 5px;
  background-color: #f7f7f7;
  color: black;
  border-bottom: var(--mdt-core-border-width) var(--mdt-core-border-style) var(--mdt-theme-border-color);
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
  z-index: 1;
  overflow: auto;
}

.popup-inner {
  background: white;
  padding: 20px;
  width: 90%;

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

.list-view {
  list-style: none;
  text-align: left;
}

.mb-20 {
  margin-bottom: 20px;
}

.row-wise {
  display: grid;
  grid-template-columns: 50% 50%;
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

.gridview {
  margin: 15px;
  display: grid;
  gap: 15px 15px;
  grid-template-columns: auto auto auto auto;
}
</style>
      