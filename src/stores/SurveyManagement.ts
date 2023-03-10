import { defineStore } from "pinia";
import axios from "axios";
import ApiService from "@/api/api.services";
import { API_GET_ALL_SURVEY_LIST, API_GET_SURVEY_BY_ID, API_POST_SURVEY, API_PUT_SURVEY } from "@/api/config";
import { useAlertStore } from "@/stores/alert.store";



import type { Surveylist, dropdown, createSurveylist, ExportSurveyList } from "@/Models/SurveyManagement";
import { useRoleManagementStore } from "@/stores/RoleManagement";
import type { getRoles } from "@/Models/RoleManagement";

export const useSurveyManagementStore = defineStore({
  id: "SurveyManaegment",
  state: () => ({
    RoleManagement: useRoleManagementStore(),
    SurveyList: [] as Array<Surveylist>,
    exportSurveyList: [] as Array<ExportSurveyList>,
    surveysearch: "",
    surveypgnum: 1,
    AllRoles: [] as Array<getRoles>,
    getSurvey: {} as Surveylist

  }),

  getters: {
    // getExportSurveys(state) {
    //   if (state.SurveyList && state.SurveyList.length > 0) {
    //     state.SurveyList.forEach(item => {
    //       let tempData = {
    //         RoleId: item.roleId,
    //         RoleName: item.roleName,
    //         PeriodFrom: item.AssessmentperiodFrom,
    //         PeriodTo: item.AssessmentperiodTo,
    //         SurveyCreationDate: item.SurveycreationDate,
    //         Status: ""
    //       };
    //       state.exportSurveyList.push(tempData);
    //     });
    //     return state.exportSurveyList;
    //   } else return [];
    // }
  },

  actions: {
    // Get all Assessee Roles for Mapping
    async fetchAllSurvey() {
      const result = await ApiService.get(API_GET_ALL_SURVEY_LIST, null);
      if (result && result.data) {
        this.SurveyList = result.data;
      }
      return result;
    },

    async fetchAllRoles() {
      try {
        await this.RoleManagement.fetchRoles()
        this.AllRoles = this.RoleManagement.getallroles;
        console.log("----inside the role mapping store----")
        console.log(this.AllRoles)
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },

    async fetchsurvey(id: number, srchCG: string, pageNum: number) {
      this.surveysearch = srchCG,
        this.surveypgnum = pageNum
      const result = await ApiService.get(API_GET_SURVEY_BY_ID + id, null);
      if (result && result.data && result.data.id) {
        this.getSurvey = result.data;
      }
      if (result && result.data.length > 0) {
        this.getSurvey = result.data[0];
      }
      return result;
    },

    //Create Survey
    async createSurvey(payload:any) {
      const result = await ApiService.post(API_POST_SURVEY, payload);
      if(result){
        return result;
      }
    },

    //Update Survey
    async UpdateSurvey(payload: any) {
      const result = await ApiService.put(API_PUT_SURVEY, payload);
      if (result) {
        return result;
      }
    }

  },
  persist: {
    key: "CATStore",
    storage: localStorage,
  },
});
