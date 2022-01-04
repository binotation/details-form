import { FormValues, AddressState, SuperChoice, EmploymentType, ResidencyStatus } from './types'

export const DEFAULT_VALUES: FormValues = {
    FirstName: '',
    LastName: '',
    Email: '',
    Phone: '',

    AddressLine: '',
    AddressSuburb: '',
    AddressState: '',
    AddressPostalCode: '',

    EmergencyContactName: '',
    EmergencyContactPhone: '',
    EmergencyContactRelationship: '',

    BankAccountName: '',
    BankBSB: '',
    BankAccountNumber: '',

    SuperChoice: '',
    StapledSuper: 'false',
    APRAUSI: '',
    APRAMemberNumber: '',
    SMSFName: '',
    SMSFABN: '',
    SMSFAccountName: '',
    SMSFAccountNumber: '',
    SMSFBSB: '',
    SMSFElectronicServiceAddress: '',
    SuperConfirmed: false,

    TFN: '',
    DateOfBirth: '',
    EmployeePaidBasis: '',
    IsAusResidentForTaxPurposes: '',
    TaxFreeThresholdClaimed: '',
    SeniorsPensioners: '',
    TaxZoneOverseasInvalidCarer: '',
    HasHelpDebt: '',
    HasSupplementDebt: '',
    TaxConfirmed: false,

    ResidencyStatus: '',
    Convicted: '',
    ConvictionComment: ''
}

function enumToChoices(en: any, displayNames: string[]) {
    const values = Object.values(en)
    const length = values.length / 2
    const choices: { displayName: string, value: number }[] = new Array(length)
    for (let i = 0; i < length; i++) {
        choices[i] = {
            displayName: displayNames[i] as string,
            value: values[i + length] as number
        }
    }
    return choices
}

export const ADDRESS_STATE_DISPLAYNAMES: { displayName: string, value: AddressState }[] = enumToChoices(AddressState, [
    'ACT', 'NSW', 'NT', 'QLD', 'SA', 'TAS', 'VIC', 'WA'
])

export const SUPER_CHOICE_DISPLAYNAMES: { displayName: string, value: SuperChoice }[] = enumToChoices(SuperChoice, [
    '',
    'APRA fund or retirement savings account (RSA)',
    'Self-managed super fund (SMSF)',
    'Super fund nominated by my employer'
])

export const EMPLOYMENT_TYPES_DISPLAYNAMES: { displayName: string, value: EmploymentType }[] = enumToChoices(EmploymentType, [
    'Full-time employment',
    'Part-time employment',
    'Casual employment',
    'Superannuation or annuity income stream',
    'Labour hire'
])

export const RESIDENCY_STATUS_DISPLAYNAMES: { displayName: string, value: ResidencyStatus }[] = enumToChoices(ResidencyStatus, [
    'Australian resident',
    'Foreign resident',
    'Working holiday maker'
])

export const YES_NO_CHOICES: { displayName: string, value: 'false' | 'true' }[] = [
    {
        displayName: 'Yes',
        value: 'true'
    },
    {
        displayName: 'No',
        value: 'false'
    }
]