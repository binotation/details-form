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
    StapledSuper: 'true' | 'false',
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
    DateOfBirth: Date | '',
    EmployeePaidBasis: EmploymentType | '',
    IsAusResidentForTaxPurposes: '' | 'true' | 'false',
    TaxFreeThresholdClaimed: '' | 'true' | 'false',
    SeniorsPensioners: '' | 'true' | 'false',
    TaxZoneOverseasInvalidCarer: '' | 'true' | 'false',
    HasHelpDebt: '' | 'true' | 'false',
    HasSupplementDebt: '' | 'true' | 'false',
    TaxConfirmed: boolean,

    ResidencyStatus: ResidencyStatus | '',
    Convicted: '' | 'true' | 'false',
    ConvictionComment: string
}