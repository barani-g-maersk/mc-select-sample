
import type { Attributes } from "./CompetencyGroup";

export declare type  getRoles = {
    roleType:{
        id:number,
        roleType:string
      },
    id:number;
    roleGuid:string;
    roleId:string;
    roleName:string;
    roleDescription:string;
        competencyGroups:Array<getCompetencyGroup>
};

export declare type  Roles = {
    roleType:{
        id:number,
        roleType:string
      },
    id:number;
    roleGuid:string;
    roleId:string;
    roleName:string;
    roleDescription:string;
        competenciesMap:Array<CompetencyGroup>
    

};

export declare type ExportRoles = {
    RoleId : string,
    RoleType: string
    RoleName: string,
    CompetencyGroups: string
}
export declare type ExpectedLevels = {
    id:number,
    expectedLevelName:string
}
export declare type CompetencyGroup={
    id:number;
    competencyGroupId:string;
    name:string;
    description:string;
    competencies:Array<Competencies>

};
export declare type getCompetencyGroup={
    id:number;
    competencyGroupId:string;
    name:string;
    description:string;

};
export declare type Competencies={
    id:number;
    competencyMapId:number;
    competencyId:string;
    name:string;
    description:string;
    isSelected:boolean;
    expectedLevelId:number;
    attributes:Array<Attributes>
};

export declare type dropdown={
    value:number;
    label:string
};

export declare type RoleCreation={
    
    roleName:string;
    roleDescription:string;
    roleTypeId:number;
    competenciesMap:Array<competenciesMap>
};
export declare type competenciesMap={

    competencyGroupId:number;
    competencyId:number;
    isSelected:boolean;
    expectedLevelId:number;
    isDeleted?:boolean;
}