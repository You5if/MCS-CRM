import { AuditModel } from 'src/app/components/misc/AuditParams.Model';

// Definition of our model class
export class LeadModel {
constructor(


        public leadId: number,
                public templateName: string,
                public description: string,
        public entryMode: string,
        public active: boolean,
        public readOnly: boolean,
        public auditColumns: any,
) { }
}

export interface DeleteModel {
        name: string,
id: number;
      }

      export class SortingModel {
        constructor(
        
        
                public id: number,
                public code: string,
                public name: string,
                public array: any,
                public value: string,
                        
        ) { }
        }
        export class FilteringModel {
        constructor(
        
        
                public columnName: string,
                public displayName: string,
                public frontEndType: string,
                public tableColumnId: number,
                public tableId: number,
                public array1: any,
                public array2: any,
                public operation: string,
                public permission1: boolean,
                public permission2: boolean,
                public value1: string|null,
                public value2: string|null
        
        
        
                        
        ) { }
        }

