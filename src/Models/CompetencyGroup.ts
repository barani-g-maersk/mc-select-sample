import type { Ref } from "vue";

export declare type CompetencyGroup = {
    id:number;
    competencyGroupId:string;
    name:string;
    description:string;
    status?:boolean;
    competencies:Array<Competencies>
    proficiencylevel:Array<competencyLevel>

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
export declare type competencyLevel={
    id:number;
    name:string;
}
export declare type Attributes={
    competencyLevel:competencyLevel
    //competencyId:string;
    description:string;
    id:number;
}
export declare type PLAttributes={
    competencyLevel:competencyLevel
    attIndex: number;
    //competencyId:string;
    description:Ref<string>;
    id:number;
}
export declare type ExportCompetencyGroup = {
    GroupId:string;
    Name:string;
    Competencies:string
};

export declare type CreateCompetencyGroup = {
    id:number;
    competencyGroupName:string;
    competencyGroupdescription:string;
    competencies:Array<CreateCompetencies>

};
export declare type CreateCompetencies={
    id:number;
    name:string;
    description:string;
    attributes:Array<CreateAttributes>

};
export declare type CreateAttributes={
    id:number;
    competencyLevelId:number;
    description:string;
}