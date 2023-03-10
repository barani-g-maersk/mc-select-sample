import { defineStore } from "pinia";
import ApiService from "@/api/api.services";
import { API_GET_ALL_ASSESSMENTS_LIST, API_GET_ASSESSMENT_BY_ID, API_PUT_MARK_AS_VERIFY_USER_SURVEY } from "@/api/config";
import type { verfiyassessee, ExportAssessmentList } from "@/Models/SurveyManagement";
import { useRoleManagementStore } from "@/stores/RoleManagement";
import { useUserManagementStore } from "@/stores/UserManagement";
import type { getRoles } from "@/Models/RoleManagement";
import type { Users } from "@/Models/UserManagement";

export const useVerifyAssesseeStore = defineStore({
  id: "VerifyAsseesee",
  state: () => ({
    RoleManagement: useRoleManagementStore(),
    UserManagement: useUserManagementStore(),
    assesseeList: [] as Array<verfiyassessee>,
    exportAssessmentList : [] as Array<ExportAssessmentList>,
    surveysearch: "",
    surveypgnum: 1,
    AllRoles: [] as Array<getRoles>,
    AllUsers: [] as Array<Users>,
    getAssessee: {} as verfiyassessee

  }),

  getters: {

  },

  actions: {
    // Get all Assessee Roles for Mapping
    async getAllAssessee() {
      const result = await ApiService.get(API_GET_ALL_ASSESSMENTS_LIST, null);
      if (result && result.data.length > 0) {
        this.assesseeList = result.data;
        this.assesseeList.forEach(elt => elt.ischecked = false);
        this.assesseeList.forEach(elt => elt.isdisabled = false);
        this.assesseeList.forEach(elt => elt.dropdowndisabled = false);
      }
      return result;
    },

    async fetchAssessee(id: number, srchCG: string, pageNum: number) {
      this.surveysearch = srchCG,
      this.surveypgnum = pageNum
      const result = await ApiService.get(API_GET_ASSESSMENT_BY_ID + id, null);
      if (result && result.data) {
        this.getAssessee = result.data;
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

    async fetchAllUsers() {
      try {
        await this.UserManagement.fetchUsers()
        this.AllUsers = this.UserManagement.getallusers;
        console.log("----inside the User management store----")
        console.log(this.AllUsers)
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    startSurvey(id: number) {

    },

    async markAsVerifyUserSurvey(payload: any){
      const result = await ApiService.put(API_PUT_MARK_AS_VERIFY_USER_SURVEY, payload);
      if(result){
        return result
      }
    }


  },
  persist: {
    key :"CATStore",
    storage: localStorage,
  },
});
