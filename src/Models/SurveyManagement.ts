import type { StringifyOptions } from "querystring";
import { number } from "yup";
import type { Attributes ,competencyLevel} from "./CompetencyGroup";

export declare type Surveylist = {
  id: number;
  roleAID: string;
  roleId: number;
  roleName: string;
  fromPeriod: string,
  toPeriod: string,
  createdDate: string,
  surveyId: string,
  status:string
};

export declare type ExportSurveyList = {
  RoleId: string,
  RoleName: string,
  PeriodFrom: string,
  PeriodTo: string,
  SurveyCreationDate: string,
  Status: string
}

export declare type ExportAssessmentSurveyList = {
  UID : string,
  EmployeeName : string,
  RoleName : string,
  Status: string
};

export declare type dropdown = {
  value: number;
  label: string
};

export declare type createSurveylist = {
  id: number;
  roleId: number;
  fromPeriod: string,
  toPeriod: string,
};

// Models for L&D Admin Verify Assessee
export declare type verfiyassessee = {
  id: number,
  assesseeUId: number,
  assesseeUserId: string,
  assessmentID: string,
  surveyID: number,
  surveyName: string,
  assesseeName: string,
  assesseeRoleName: string,
  assesseeRoleId: number,
  assessorUserId: string,
  assessorRoleId: number,
  assessorUId: number,
  assessorUserName: string,
  assessorRoleName: string,
  assessorStatus: boolean,
  assessmentTypeId: number,
  assessmentStatus: string,
  assessmentgroups: string,
  ischecked: boolean,
  isdisabled: boolean,
  dropdowndisabled: boolean
};

export declare type ExportAssessmentList = {
  AssesseeUID: string,
  AssesseeName: string,
  AssesseeRole: string,
  AssessorUID: string,
  AssessorName: string,
  AssessorRole: string,
  Relationship: string,
  Status: string
};


export declare type validatestatus = {

  assessmentStatus: string
};
export declare type UpdateAssessment = {

  id: number,
  assessorUserId: number,
  assessmentTypeId: number,
  assessorUserName: string
};

export declare type CaptureAssessor = {
  id: number,
  roleName: string,
  competencyDetails: Array<competencyDetails>
}
export declare type CaptureAssessee = {
  id: number,
  roleName: string,
  roleTId: number,
  roleId: string,
  usersurveyid: number,
  userId: string,
  employeeName: string,
  competencyDetails: Array<assesseecompetencyDetails>
}
export declare type assesseecompetencyDetails = {
  id: number,
  competencyGroupId: string,
  name: string,
  description: string,
  proficiencylevel:Array<competencyLevel>;
  competencies: Array<assesseecompetencies>
}
export declare type competencyDetails = {
  id: number,
  name: string,
  proficiencylevel:Array<competencyLevel>;
  competencies: Array<competencies>
}
export declare type assesseecompetencies = {
  id: number,
  competencyId: string,
  name: string,
  description: string,
  benchMarkId: number,
  benchMark?: string,
  actualId: number,
  actualLevel: string,
  assessmentgroups: string,
  attributes: Array<Attributes>
}
export declare type compassesseecompetenciesetencies = {
  id: number,
  competencyId: string,
  name: string,
  description: string,
  benchMarkId: number,
  benchMark?: string,
  userDetails: Array<userdetails>
  attributes: Array<Attributes>
}

export declare type competencies = {
  id: number,
  name: string,
  benchMarkId: number,
  benchMark?: string,
  userDetails: Array<userdetails>
}


export declare type userdetails = {
  id: number,
  employeeName: string,
  actualId: number,
  actualLevel: string,
}

export declare type createsurvey = {
  userSurveyAssessmentId: number,
  userId: number,
  roleId: number,
  competencyGroupId: number,
  competencyId: number,
  benchMarkId: number,
  actualLevelId: number,
  assessmentTypeId: number,
  assessmentgroups: string,

}

export declare type getsurvey = {
  usersurveyid: number,
  id: number,
  userId: string,
  employeeName: string,
  roleName: string,
  roleId: string,
  roleTId: number,
  competenciesMap: Array<competencymap>
}
export declare type competencymap = {
  id: number,
  competencyGroupId: string,
  name: string,
  description: string,
  status: boolean,
  competencies: Array<surveycompetencies>
}

export declare type surveycompetencies = {
  id: number,
  competencyId: string,
  name: string,
  description: string,
  benchMarkId: number,
  benchMark: string,
  actualId: number,
  actualBenchMark: string
}
export declare type newnew = {
id:number,
role:string,
userarray:Array<user>
}

export declare type user ={
  id:number;
  actualId:number,
  actuallevel:string
}