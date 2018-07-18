export enum CONST_OBJTYPE {
   ABSTRACT = 'ABSTRACT',
   UDT = 'UDT',
   UDT_VAR = 'UDT_VAR'
}


/*Internal interfaces - No Export */
interface _rev {

    major?: number;
    minor?: number;
    on?: string;
    by?: string;
    comment?:
    {
        en?: string;
        de?: string;
    };

}

interface _ident {
  _uid?: string;  // unique object id - assigned at the time of construct
  idx?:  number; // the index (Auto assigned by DB) which is used to call this element from the App
  lang?: string;
  objType?: CONST_OBJTYPE; // Tag,FB,UDT,AlarmList....
  hasChildern?: boolean;
}

interface _plcTag {
  isF: boolean;
  name: string;
  datatype:  string;
  address?: string;
  comment?:
  {
      en?: string;
      de?: string;
  };

}

/*============  Export interfaces   ===================*/
export interface Irev {
  rev: _rev;
  ident: _ident;
}

export interface IUdt {

    rev?: _rev;
    ident?: _ident;
    plcTag?: _plcTag;

}

