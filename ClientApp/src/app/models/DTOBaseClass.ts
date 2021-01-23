import { Guid } from "guid-typescript";

export class AttachToParentInfo {
  parentStoreCollectionName: string;
  parentId: string;
  ParentPropertyName: string
}
//SF> didn't work see reason below
//export interface AddToParentCallBack<T> {
//  (parent: T,childObject): void;
//}
export class DTOBaseClass { 
  attachToParentInfo: AttachToParentInfo;

  //SF> this didn't work - the callback didn't rehydrate after being serialized to/from the normalizr 'repo'
  //private _parent: DTOBaseClass;
  //private _child: DTOBaseClass;
  //private _attachToParentCallback: AddToParentCallBack<DTOBaseClass>;
  //public attachToParentCallback(parentObj: DTOBaseClass, func: AddToParentCallBack<DTOBaseClass>) {
  //  this._attachToParentCallback = func;
  //}
  //public attachToParent() {
  //  this._attachToParentCallback(this._parent,this); 
  //}
}

