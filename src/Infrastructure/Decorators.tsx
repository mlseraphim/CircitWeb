import 'reflect-metadata';
import { EnumAttributeType, EnumDataDisplayGroup } from './Enums';


const metaDataKeyPropHeading = Symbol(EnumAttributeType.MetaDataKeyPropHeading);
const metaDataKeyGridGroup = Symbol(EnumAttributeType.MetaDataKeyGridGroup);
const metaDataKeyGridOrder = Symbol(EnumAttributeType.MetaDataKeyGridOrder);


const defineMeta = (symbol: Symbol, attrVal: string | number | null, target: any, propertyKey: string | symbol) => Reflect.defineMetadata(symbol, attrVal, target, propertyKey);


export function PropHeading(attrVal: string) {
    return function(target: any, propertyKey: string | symbol) {
        defineMeta(metaDataKeyPropHeading, attrVal, target, propertyKey);
    }
}

export function GridGroup(attrVal: EnumDataDisplayGroup) {
    return function(target: any, propertyKey: string | symbol) {
        defineMeta(metaDataKeyGridGroup, attrVal, target, propertyKey);
    }
}

export function GridOrder(attrVal: number) {
    return function(target: any, propertyKey: string | symbol) {
        defineMeta(metaDataKeyGridOrder, attrVal, target, propertyKey);
    }
}


export function GetAttribute(type: EnumAttributeType, target: any, propertyKey: string | symbol): string {
    switch(type) {
        case EnumAttributeType.MetaDataKeyPropHeading:
            return Reflect.getMetadata(metaDataKeyPropHeading, target, propertyKey);
        break;

        case EnumAttributeType.MetaDataKeyGridGroup:
            return Reflect.getMetadata(metaDataKeyGridGroup, target, propertyKey);
        break;

        case EnumAttributeType.MetaDataKeyGridOrder:
            return Reflect.getMetadata(metaDataKeyGridOrder, target, propertyKey);
        break;

        default:
            return '';
        break;
    }
}