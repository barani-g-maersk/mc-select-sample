<template>
  <!-- For displaying page title & total counts-->
 <div>
  <p> New page</p>
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
      <div class="dialog border-rd-6 ">
        <div class="content-group second-bg-color mb-20"
          v-for="comp, cindex in AsseseeforAssessor.competencyDetails[index].competencies">
          <div class="left-content pt-22-pb-20 ">
            
            <p class="mds-font--display-1 pl-10 f16">  {{ comp.name }} </p>
          </div>
          <div class="right-content" style="z-index: 999;">
          </div>
          <div class="mds-table mds-table--zebra-stripes mds-table--row-highlight-on-hover">
            <table>
              <thead>
                <tr class="f16">
                  <th>Employee Name</th>
                  <th>Expected Level</th>
                  <th>Actual Level</th>
                  <th>Actual Level <span class="mcolor">*</span></th>
                </tr>
              </thead>
              <tbody>
                <tr class="f14"
                  v-for="(assessee, uindex) in comp.userDetails">
                  <td>{{ assessee.employeeName }}</td>
                  <td>{{ CLevels(AsseseeforAssessor.competencyDetails[index].id).find(lvl => (lvl.value === comp.benchMarkId))?.label }}</td>
                  <td>{{assessee.actualId}} {{ assessee.actualLevel }}</td>
                  <td> <mc-select fit="small" name="" :options.prop="CLevels(AsseseeforAssessor.competencyDetails[index].id)" label="" placeholder=""
                      v-model="assessee.actualId"
                      @change="changeActual($event,AsseseeforAssessor.competencyDetails[index].id,comp.id,assessee.id,index,cindex,uindex)">
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
    <mc-button fit="small" variant="secondary" v-if="index != 0" @click="PreviousHandler()">Previous</mc-button>
    <mc-button fit="small" @click="NextCG()" v-if="AsseseeforAssessor.competencyDetails[index + 1]"
  >Next</mc-button>
   
    <mc-button fit="small" variant="secondary" @click="CancelHandler()">Cancel</mc-button>
  </div>
 </div>
</template>
    
<script lang="ts">
import { defineComponent, onMounted, reactive,ref } from "vue";
import { useCaptureAssessorStore } from "@/stores/CaptureAssessor";
import "@maersk-global/mds-components-core";
import "@maersk-global/fonts/maeu/fonts.css";
import "@maersk-global/mds-components-core/mc-button";
import "@maersk-global/mds-design-tokens/maersk/light/web/css/design-tokens.css";
import "@maersk-global/mds-foundations/foundations.css";
import type { CaptureAssessor, competencyDetails, competencies, dropdown, userdetails, createsurvey } from "@/Models/SurveyManagement";

export default defineComponent({
  name: 'CaptureAssessor',
  setup() {
    let index = ref(0);
   
    let AsseseeforAssessor: CaptureAssessor =reactive({
      id: 1,
      roleName: "CSP",
      competencyDetails: [
        {
          id:1,
      name:"Competency Group 1",
      proficiencylevel:[
        {
          id:1,
          name:"proficient",
        },
        {
          id:2,
          name:"Advanced",
        },

      ],
      competencies:[{
      id:1,
          name:"Competency 1",
          benchMarkId:2,
          benchMark:"Advanced",
          userDetails:[
            {
              id:1,
    employeeName:"Barani",
    actualId:0,
    actualLevel:"",
            }
          ]
      }
      ]
        },
        {
          id:2,
      name:"Competency Group 2",
      proficiencylevel:[
        {
          id:3,
          name:"Foundational",
        },
        {
          id:2,
          name:"Advanced",
        },
        {
          id:1,
          name:"Proficient",
        },

      ],
      competencies:[{
      id:1,
          name:"Competency 2",
          benchMarkId:3,
          benchMark:"Foundational",
          userDetails:[
            {
              id:1,
    employeeName:"Barani",
    actualId:0,
    actualLevel:"",
            }
          ]
      }
      ]
        }
      ]

      })
    function CLevels(id:number) {
      let list = [] as Array<dropdown>;
if (AsseseeforAssessor.competencyDetails && AsseseeforAssessor.competencyDetails.length > 0) {
 
  list.push({ value: 0, label: "Select an Item" });
  AsseseeforAssessor.competencyDetails.forEach(element => {
    if(element.id==id){
      element.proficiencylevel.forEach(level=>{
list.push({value:level.id,label:level.name})
        
      })
    }
  });

}
return list;
    }
    function changeActual(event: any,cgid:number,cid:number,uid:number,cgindex:number,compindex:number,userindex:number) {
     if (event.detail.selectedOptions[0].value == 0){
       AsseseeforAssessor.competencyDetails[cgindex].competencies[compindex].userDetails[userindex].actualId = 0;
       AsseseeforAssessor.competencyDetails[cgindex].competencies[compindex].userDetails[userindex].actualLevel = ""; 
     }
    else if ((event.detail.selectedOptions[0].value != 0)){
       console.log(AsseseeforAssessor.competencyDetails)
       AsseseeforAssessor.competencyDetails[cgindex].competencies[compindex].userDetails[userindex].actualId = event.detail.selectedOptions[0].value;
       AsseseeforAssessor.competencyDetails[cgindex].competencies[compindex].userDetails[userindex].actualLevel = event.detail.selectedOptions[0].label;
       
     
     }
   }
    async function NextCG() {
   
      index.value = index.value + 1;
    }
    function CancelHandler() {
     
    }
   async function PreviousHandler() {
   
      index.value = index.value - 1;   
    }
    let CG = [] as any;
    function getCG() {
      // console.log(store.getAssessee)
      CG.length = 0;
      AsseseeforAssessor.competencyDetails.forEach(elt => {
        CG.push(elt.name)
      });
      // store.Role.competenciesMap.competencyGroups.forEach(elt => {
      //   CG.push(elt.name)
      // });
      return CG;
    }
    return {
      NextCG,PreviousHandler,CancelHandler,
      AsseseeforAssessor,
      index,getCG,changeActual,CLevels
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
</style>
    