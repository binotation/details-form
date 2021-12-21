import { FormValues, UrlParams } from './types'
import { useForm } from 'react-hook-form'
import FormControl from '@mui/material/FormControl'
import FormButtons from './form-sections/FormButtons'
import PersonalDetails from './form-sections/PersonalDetails'

function Form({ id, token }: UrlParams) {
    const defaultValues: FormValues = {
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
        StapledSuper: false,
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

    const { handleSubmit, control, formState, reset, getValues } = useForm({
        defaultValues: defaultValues
    })

    return (
        <FormControl>
            <PersonalDetails control={control} />
            <FormButtons handleSubmit={handleSubmit} id={id} token={token} />
        </FormControl>
    )
}

export default Form