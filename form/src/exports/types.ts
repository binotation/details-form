export enum LoadingState {
    Loading = 'Loading...',
    Unauthorized = 'Unauthorized',
    Authorized = 'Authorized',
    Error = 'Error'
}

export interface UrlParams {
    id: string,
    token: string
}

export enum AddressState {
    ACT, NSW, NT, QLD, SA, TAS, VIC, WA
}

export enum SuperChoice {
    APRA, SMSF, EmployerNominated
}

export enum EmploymentType {
    FullTime, PartTime, Casual, LabourHire, SuperIncomeStream
}

export enum ResidencyStatus {
    Australian, Foreign, WorkingHolidayMaker
}

export type DropdownChoice = { displayName: string, value: number }

export enum BooleanString {
    True = '1', False = '0'
}

export type RadioChoice = { displayName: string, value: string }

export interface FormValues {
    FirstName: string,
    LastName: string,
    Email: string,
    Phone: string,

    AddressLine: string,
    AddressSuburb: string,
    AddressState: AddressState | '',
    AddressPostalCode: string,

    EmergencyContactName: string,
    EmergencyContactPhone: string,
    EmergencyContactRelationship: string,

    BankAccountName: string,
    BankAccountNumber: string,
    BankBSB: string,

    SuperChoice: SuperChoice | '',
    StapledSuper: BooleanString,
    APRAUSI: string,
    APRAMemberNumber: string,
    SMSFName: string,
    SMSFABN: string,
    SMSFAccountName: string,
    SMSFAccountNumber: string,
    SMSFBSB: string,
    SMSFElectronicServiceAddress: string,
    SuperConfirmed: boolean,

    TFN: string,
    DateOfBirth: Date | string,
    EmployeePaidBasis: EmploymentType | '',
    IsAusResidentForTaxPurposes: BooleanString | '',
    TaxFreeThresholdClaimed: BooleanString | '',
    SeniorsPensioners: BooleanString | '',
    TaxZoneOverseasInvalidCarer: BooleanString | '',
    HasHelpDebt: BooleanString | '',
    HasSupplementDebt: BooleanString | '',
    TaxConfirmed: boolean,

    ResidencyStatus: ResidencyStatus | '',
    IdDocuments: FileList | [],
    Convicted: BooleanString | '',
    ConvictionComment: string
}

export enum SubmissionResult {
    Success = 'Success!',
    Unauthorized = 'Unauthorized',
    UnknownError = 'An unknown error occurred.'
}

export interface ResponseMessage {
    errors?: { name: string, message?: string, code?: string }[],
    authorized?: boolean
}
