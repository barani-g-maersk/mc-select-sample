import { defineStore } from "pinia";
import ApiService from "@/api/api.services";
import { API_GET_ALL_ASSESSMENTS_LIST, API_GET_NEW_CAPTURE_ASESSOR, API_POST_SURVEY_COMPLETED,API_GET_ALL_EXPECTED_LEVEL_LIST, API_GET_ASSESSMENT_SURVEY_BY_ID } from "@/api/config";
import type { CaptureAssessor, ExportAssessmentSurveyList, verfiyassessee, userdetails, createsurvey, competencyDetails, competencies, getsurvey } from "@/Models/SurveyManagement";
import { useRoleManagementStore } from "@/stores/RoleManagement";
import { useUserManagementStore } from "@/stores/UserManagement";
import { useVerifyAssesseeStore } from "@/stores/LDVerifyAssessee";
import type { Roles, dropdown, ExpectedLevels } from "@/Models/RoleManagement";
import type { Users } from "@/Models/UserManagement";
import type { CompetencyGroup } from "@/Models/CompetencyGroup";
import { useCompetencyFrameworkStore } from "@/stores/competencyframework";

export const useCaptureAssessorStore = defineStore({
  id: "CaptureAssessor",
  state: () => ({
    competencyframework: useCompetencyFrameworkStore(),
    RoleManagement: useRoleManagementStore(),
    UserManagement: useUserManagementStore(),
    LDVerifyAssessee: useVerifyAssesseeStore(),
    assesseeList: [] as Array<verfiyassessee>,
    AllassesseeList: [] as Array<CaptureAssessor>,
    exportAssessmentSurveyList: [] as Array<ExportAssessmentSurveyList>,
    ExpectlevelOriginal: [] as Array<ExpectedLevels>,
    surveysearch: "",
    surveypgnum: 1,
    Role: {} as Roles,
    AllUsers: [] as Array<Users>,
    getAssessee: {} as CaptureAssessor,
    ExpectedLevels: [] as Array<dropdown>,
    GetUsers: [] as Array<userdetails>,
    getsurvey: {} as getsurvey,
    competencyGrp: {} as CompetencyGroup,

  }),

  getters: {

  },

  actions: {
    // Get all Assessee Roles for Mapping
    async fetchAllAssessee() {
      
      const result = await ApiService.get(API_GET_NEW_CAPTURE_ASESSOR, null);
      if (result && result.data.length > 0) {
        this.assesseeList = result.data;
        this.assesseeList.forEach(elt => elt.ischecked = false);
        this.assesseeList.forEach(elt => elt.isdisabled = false);
        this.assesseeList.forEach(elt => elt.dropdowndisabled = false);
       // this.assesseeList = result.data.filter((elt: { assessorUId: number; assessmentStatus: string; }) => elt.assessorUId == id && ((elt.assessmentStatus == "Assessment Initiated") || (elt.assessmentStatus == "Completed")));
        console.log(this.assesseeList);
      }
      return result;
            
      // try {
      //   let result = await this.LDVerifyAssessee.getAllAssessee();

      //   this.assesseeList = this.LDVerifyAssessee.assesseeList.filter(elt => elt.assessorUId == id && ((elt.assessmentStatus == "Assessment Initiated") || (elt.assessmentStatus == "Completed")));
      // } catch (error) {
      //   alert(error);
      // }
    },
    async fetchAssessee(id: number,srchCG: string, pageNum: number) {
      await this.RoleManagement.fetchRole(id,srchCG,pageNum)
      this.Role = this.RoleManagement.role;
    },
    async fetchAllRoles() {
      //  const result = await ApiService.get(API_GET_NEW_CAPTURE_ASESSOR, null);
      // if (result && result.data.length >= 0) {
      //   console.log("---entering into if condition----")
      //   this.getAssessee = result.data;
      // }


      this.getAssessee = {
        id: this.Role.id,
        roleName: this.Role.roleName,
        roleTId: this.Role.id,
        roleId: this.Role.roleId,
        competencyDetails: []
      }
      let SrvyCG: competencyDetails;

      this.Role.competenciesMap.forEach(cg => {
        SrvyCG =
        {
          id: cg.id,
          competencyGroupId: cg.competencyGroupId,
          description: cg.description,
          name: cg.name,
          competencies: []
        }

        cg.competencies.forEach(cp => {
          let SrvyCp: competencies = {
            id: cp.id,
            competencyId: cp.competencyId,
            name: cp.name,
            description: cp.description,
            benchMarkId: cp.expectedLevelId,
            userDetails: this.GetUsers,
            attributes: cp.attributes
          }
          SrvyCG.competencies.push(SrvyCp);
        });

        this.getAssessee.competencyDetails.push(SrvyCG);

      })


      // this.Role.competenciesMap.competencyGroups.forEach(cg => {
      //   cg.competencies.forEach(comp => {
      //     comp.
      //   })
      // })
      // this.getAssessee = result.data;

      return this.getAssessee;
    },

    async fetchExpectedLevels() {
      this.ExpectedLevels.length = 0;
      this.ExpectedLevels.push({ value: 0, label: "Select Level" });
      const result = await ApiService.get(API_GET_ALL_EXPECTED_LEVEL_LIST, null);
      if (result && result.data.length > 0) {
        this.ExpectlevelOriginal = result.data;
      }

      for (let i = 0; i < this.ExpectlevelOriginal.length; i++) {
        //  this.ExpectlevelOriginal.forEach(el => {
        this.ExpectedLevels.push({
          value: this.ExpectlevelOriginal[i].id,
          label: this.ExpectlevelOriginal[i].expectedLevelName
        })
        //  });
      }

      return result;
    },

    async startSurvey(id: number[], srchCG: string, pageNum: number, roleid: number) {
      this.GetUsers = [];
      await this.fetchAssessee(roleid,srchCG,pageNum);
      for (let i = 0; i <= id.length; i++) {
        this.assesseeList.forEach(elt => {
          if (elt.id == id[i]) {
            this.GetUsers.push({
              usersurveyid: elt.id,
              id: elt.assesseeUId,
              userId: elt.assesseeUserId,
              employeeName: elt.assesseeName,
              actualId: 0,
              actualLevel: ""
            })
          }

        })

      }
    },
    async createSurvey(surveystarted: Array<createsurvey>) {
      console.log(surveystarted);
      let result = await ApiService.post(API_POST_SURVEY_COMPLETED, surveystarted)
      if (result) {
        return result;
      }
    },

    async getAssessmentSurvey(id: number) {
      const result = await ApiService.get(API_GET_ASSESSMENT_SURVEY_BY_ID + id, null);
      if (result && result.data && result.data.id) {
        this.getsurvey = {} as getsurvey,
          this.getsurvey = result.data;
      }
      if (result && result.data.length > 0) {
        this.getsurvey = {} as getsurvey,
          this.getsurvey = (result.data)[0];
      }
      return result;
    },
    async viewAttributes(Cgid: number, compid: number) {
      try {
        await this.competencyframework.fetchCompetencyGroup(Cgid);
        this.competencyGrp = this.competencyframework.competencyGrp;
      } catch (error) {
        alert(error);
      }
    }
  },
  persist: {
    key: "CATStore",
    storage: localStorage,
  },
});
