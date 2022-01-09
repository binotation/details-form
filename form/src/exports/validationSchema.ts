import * as yup from 'yup'
import { SuperChoice, BooleanString } from './types'

const requiredMsg = 'This is a mandatory field!'
const invalidPatternMsg = 'Invalid symbols'
const invalidEmailMsg = 'Invalid email'
const numberRegex = /^[\d]*$/
const trueFalseTransform = yup.number().transform((_, originalValue) => {
    if ([true, BooleanString.True].includes(originalValue)) {
        return Number(BooleanString.True)
    } else if ([false, BooleanString.False].includes(originalValue)) {
        return Number(BooleanString.False)
    } else {
        return undefined
    }
}).required(requiredMsg)
const yesNoValidation = trueFalseTransform.oneOf([Number(BooleanString.True), Number(BooleanString.False)], requiredMsg)
const confirmValidation = trueFalseTransform.oneOf([Number(BooleanString.True)], requiredMsg)
const enumValidation = yup.number().transform(value => isNaN(value) ? undefined : value).required(requiredMsg).min(0, requiredMsg)
const dateOfBirthValidation = yup.date().nullable().transform((value, originalValue) => originalValue === '' ? null : value)
    .required(requiredMsg).max(new Date(new Date().setDate(new Date().getDate() - 365 * 13)), 'Date of birth is too recent')
const nullTransform = (value: any, originalValue: any) => originalValue === '' ? null : value

function maxLengthMsg(max: number) {
    return `Maximum ${max} characters allowed`
}

function minLengthMsg(min: number) {
    return `Must be at least ${min} characters long`
}

function exactLengthMsg(length: number) {
    return `Must be ${length} characters`
}

yup.addMethod(yup.string, 'genericString', function (this: yup.StringSchema, { required, pattern, min, max }:
    { required?: boolean, pattern?: RegExp, min?: number, max?: number }) {

    return this.trim()
        .concat([undefined, true].includes(required) ? yup.string().required(requiredMsg) : yup.string())
        .concat(pattern ? yup.string().matches(pattern, invalidPatternMsg) : yup.string())
        .concat(max ? yup.string().max(max, maxLengthMsg(max)) : yup.string())
        .concat(min ? yup.string().min(min, minLengthMsg(min)) : yup.string())
})

yup.addMethod(yup.string, 'exactString', function (this: yup.StringSchema, { required, pattern, length }:
    { required?: boolean, pattern?: RegExp, length?: number }) {

    return this.trim()
        .concat([undefined, true].includes(required) ? yup.string().required(requiredMsg) : yup.string())
        .concat(pattern ? yup.string().matches(pattern, invalidPatternMsg) : yup.string())
        .concat(length ? yup.string().length(length, exactLengthMsg(length)) : yup.string())
})

yup.addMethod(yup.string, 'abn', function () {
    return this.test('valid-abn', 'Invalid ABN', function (value, context) {
        const { path, createError } = this;
        if (!value) return true

        const digits: any = value.split('')
        const sum = ((digits[0] - 1) * 10) +
            (digits[1] * 1) +
            (digits[2] * 3) +
            (digits[3] * 5) +
            (digits[4] * 7) +
            (digits[5] * 9) +
            (digits[6] * 11) +
            (digits[7] * 13) +
            (digits[8] * 15) +
            (digits[9] * 17) +
            (digits[10] * 19)

        return (sum % 89) === 0 || createError({ path, message: 'Invalid ABN' })
    })
})

yup.addMethod(yup.string, 'tfn', function () {
    return this.test('valid-tfn', 'Invalid TFN', function (value, context) {
        const { path, createError } = this;
        if (!value) return true

        const digits: any = value.split('')
        const sum = (digits[0] * 1) +
            (digits[1] * 4) +
            (digits[2] * 3) +
            (digits[3] * 7) +
            (digits[4] * 5) +
            (digits[5] * 8) +
            (digits[6] * 6) +
            (digits[7] * 9) +
            (digits[8] * 10)

        return (sum % 11) === 0 || createError({ path, message: 'Invalid TFN' })
    })
})

declare module 'yup' {
    interface StringSchema {
        genericString(this: yup.StringSchema, { required, pattern, min, max }:
            { required?: boolean, pattern?: RegExp, min?: number, max?: number }): yup.StringSchema,
        exactString(this: yup.StringSchema, { required, pattern, length }:
            { required?: boolean, pattern?: RegExp, length?: number }): yup.StringSchema,
        abn(): yup.StringSchema,
        tfn(): yup.StringSchema
    }
}

function validateIfSuperChoiceSelected(selectedSuperChoice: SuperChoice.APRA | SuperChoice.SMSF,
    initialSchema: yup.StringSchema, completeSchema: yup.StringSchema) {
    return initialSchema.when(['StapledSuper', 'SuperChoice'], {
        is: (stapledSuper: number, superChoice: SuperChoice) => (stapledSuper === Number(BooleanString.False) && superChoice === selectedSuperChoice),
        then: completeSchema,
        otherwise: initialSchema.nullable().transform(nullTransform)
    })
}

const validationSchema = yup.object({
    FirstName: yup.string().genericString({ max: 35 }),
    LastName: yup.string().genericString({ max: 35 }),
    Email: yup.string().trim().required(requiredMsg).email(invalidEmailMsg).max(100, maxLengthMsg(100)),
    Phone: yup.string().genericString({ pattern: numberRegex, max: 11 }),

    AddressLine: yup.string().genericString({ max: 50 }),
    AddressSuburb: yup.string().genericString({ max: 50 }),
    AddressState: enumValidation,
    AddressPostalCode: yup.string().exactString({ pattern: numberRegex, length: 4 }),

    EmergencyContactName: yup.string().genericString({ max: 71 }),
    EmergencyContactPhone: yup.string().genericString({ pattern: numberRegex, max: 11 }),
    EmergencyContactRelationship: yup.string().genericString({ max: 35 }),

    BankAccountName: yup.string().genericString({ max: 32 }),
    BankAccountNumber: yup.string().genericString({ pattern: numberRegex, max: 10 }),
    BankBSB: yup.string().exactString({ pattern: numberRegex, length: 6 }),

    SuperChoice: yup.number().when('StapledSuper', {
        is: Number(BooleanString.False),
        then: (schema: yup.NumberSchema) => schema.transform(value => isNaN(value) ? undefined : value).required(requiredMsg),
        otherwise: yup.number().nullable().transform(nullTransform)
    }),
    StapledSuper: yesNoValidation,
    APRAUSI: validateIfSuperChoiceSelected(SuperChoice.APRA, yup.string().genericString({ required: false, pattern: /^[\dA-Z]*$/, max: 20 }),
        yup.string().genericString({ required: true, pattern: /^[\dA-Z]*$/, min: 9, max: 20 })),
    APRAMemberNumber: validateIfSuperChoiceSelected(SuperChoice.APRA, yup.string().genericString({ required: false, pattern: numberRegex, max: 20 }),
        yup.string().genericString({ required: true, pattern: numberRegex, max: 20 })),
    SMSFName: validateIfSuperChoiceSelected(SuperChoice.SMSF, yup.string().genericString({ required: false, max: 76 }),
        yup.string().genericString({ required: true, max: 76 })),
    SMSFABN: validateIfSuperChoiceSelected(SuperChoice.SMSF, yup.string().genericString({ required: false, pattern: numberRegex, max: 11 }).abn(),
        yup.string().genericString({ required: true, pattern: numberRegex, max: 11 })).abn(),
    SMSFAccountName: validateIfSuperChoiceSelected(SuperChoice.SMSF, yup.string().genericString({ required: false, max: 32 }),
        yup.string().genericString({ required: true, max: 32 })),
    SMSFAccountNumber: validateIfSuperChoiceSelected(SuperChoice.SMSF, yup.string().genericString({ required: false, pattern: numberRegex, max: 10 }),
        yup.string().genericString({ required: true, pattern: numberRegex, max: 10 })),
    SMSFBSB: validateIfSuperChoiceSelected(SuperChoice.SMSF, yup.string().exactString({ required: false, pattern: numberRegex }),
        yup.string().exactString({ required: true, pattern: numberRegex, length: 6 })),
    SMSFElectronicServiceAddress: validateIfSuperChoiceSelected(SuperChoice.SMSF, yup.string().genericString({ required: false, pattern: /^[\dA-Z]*$/, max: 16 }),
        yup.string().genericString({ required: true, pattern: /^[\dA-Z]*$/, max: 16 })),
    SuperConfirmed: yup.number().when(['StapledSuper', 'SuperChoice'], {
        is: (stapledSuper: number, superChoice: SuperChoice) => (stapledSuper === Number(BooleanString.False) && [SuperChoice.APRA, SuperChoice.SMSF].includes(superChoice)),
        then: confirmValidation,
        otherwise: yesNoValidation
    }),

    TFN: yup.string().genericString({ max: 9 }).tfn(),
    DateOfBirth: dateOfBirthValidation,
    EmployeePaidBasis: enumValidation,
    IsAusResidentForTaxPurposes: yesNoValidation,
    TaxFreeThresholdClaimed: yesNoValidation,
    SeniorsPensioners: yesNoValidation,
    TaxZoneOverseasInvalidCarer: yesNoValidation,
    HasHelpDebt: yesNoValidation,
    HasSupplementDebt: yesNoValidation,
    TaxConfirmed: confirmValidation,

    ResidencyStatus: enumValidation,
    Convicted: yesNoValidation,
    ConvictionComment: yup.string().genericString({ required: false }).nullable().transform(nullTransform)
});

export default validationSchema