export declare type Users = {
    id:number;
    userId:string;
    emailId:string;
    firstName:string;
    lastName:string;
    status:boolean;
    country:{
        id:number;
        countryName:string;
       
    }
    area:{
        id:number;
        areaName:string;
    }
    region:{
        id:number;
        regionName:string;
    }
    role:{
        id:number;
        roleId:string;
        roleName:string;
        roleDescription?:string;
        competenciesMap?:Array<competenciesMap>
    }
    vertical:string

};

export declare type ExportUsers = {
    UserId : string,
    UserName : string,
    Role : string,
    Region : string,
    Area : string,
    Country : string,
    Vertical: string
}
export declare type regions={
    regionName:string;
    id:number;
}
export declare type competenciesMap={
    competencyGroupId:string;
    competencyId:string;
    isSelected:boolean;
    competencyLevelId:number;
}
export declare type Country={
    id:number;
    countryName:string;
    areas:Array<Area>

}
export declare type Area={
    id:number;
    areaName:string;
    regions:Array<Regions>
}
declare type Regions={
    id:number;
    regionName:string;
}
export declare type dropdown={
    value?:number;
    label?:string
}
export declare type vertical={
    id:number;
    vertical:string;
}
export declare type createuser={
    userId:string;
    firstName:string;
    lastName:string;
    countryId:number;
    areaId:number;
    regionId:number;
    roleId:number;
    vertical:string;
    emailId:string;
}