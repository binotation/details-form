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
    None, APRA, SMSF, EmployerNominated
}

export enum EmploymentType {
    FullTime, PartTime, Casual, SuperIncomeStream, LabourHire
}

export enum ResidencyStatus {
    AusOrNZ, Overseas, NoWorkRights
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
    StapledSuper: boolean,
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
    IsAusResidentForTaxPurposes: boolean | '',
    TaxFreeThresholdClaimed: boolean | '',
    SeniorsPensioners: boolean | '',
    TaxZoneOverseasInvalidCarer: boolean | '',
    HasHelpDebt: boolean | '',
    HasSupplementDebt: boolean | '',
    TaxConfirmed: boolean,

    ResidencyStatus: ResidencyStatus | '',
    Convicted: boolean | '',
    ConvictionComment: string
}