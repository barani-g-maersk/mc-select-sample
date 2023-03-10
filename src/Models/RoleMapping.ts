
export declare type RoleMapping = {
    [x: string]: any;
        id:number;
        roleId:number;
        roleBId:string;
        roleName:string;
        assessmentPeriodFrom?:string,
        assessmentPeriodTo?:string,
        assessorRole:Array<AssessorRoles>
    };
    export declare type ExportRoleMapping = {
        AssesseeRoleId: string,
        AssesseeRole : string,
        AssessorRoles: string
    };
    export declare type dropdown={
        value:number;
        label:string
    };
    
    export declare type AssessorRoles={
        id:number,
        roleBId:string,
        mandatory:boolean,
        roleId:number,
        roleName:string;
       
    };
    
    export declare type createRoleMapping = {
        id:Number;
        roleId:number;
        roleName:string;
        assessmentPeriodFrom?:string,
        assessmentPeriodTo?:string,
        assessorRole:Array<createAssessorRoles>
    };
    export declare type createAssessorRoles={
        id:number,
        mandatory:boolean,
        roleId:number,
        roleName:string;
       
    };