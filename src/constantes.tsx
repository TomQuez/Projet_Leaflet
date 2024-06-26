interface IconOptions{
    iconUrl:string;
    iconSize:[number,number];
}
interface IconMapping{
    [key:string]:IconOptions;
}


interface TownMarker{
    name:string,
    coordinates:[number,number],
    type:string,
    description:string
}
export const townMarker:TownMarker[]=[
    {
        name:"Lapalisse",
        coordinates:[46.2401,3.6339],
        type:"town",
        description:"peacefull town"
    },
    {
        name:"vichy",
        coordinates:[46.123,3.451],
        type:"city",
        description :"https://www.ville-vichy.fr/"
    },
    {
        name:"Trézelles",
        coordinates:[46.326651,3.592693],
        type:"village",
        description:"https://fr.wikipedia.org/wiki/Tr%C3%A9zelles"
    },
];

export const iconMappings : IconMapping={
    town:{
        iconUrl:"../icon/town.png",
        iconSize:[38,38],
    },
    city:{
        iconUrl:"../icon/paysage-urbain.png",
        iconSize:[38,38],
    },
    village:{
        iconUrl:"../icon/village.png",
        iconSize:[38,38],
    }
}