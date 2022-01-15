import FormGroup from '@mui/material/FormGroup'
import { EMPLOYMENT_TYPES_DISPLAYNAMES, YES_NO_CHOICES } from '../exports/constants'
import TextInput from '../inputs/TextInput'
import DropdownInput from '../inputs/DropdownInput'
import DateInput from '../inputs/DateInput'
import RadioInput from '../inputs/RadioInput'
import CheckboxInput from '../inputs/CheckboxInput'

function TaxDetails({ control }: { control: any }) {
    return (
        <div>
            <h2>Tax Details</h2>
            <FormGroup>
                <TextInput name='TFN' control={control} label='TFN' />
                <DateInput name='DateOfBirth' control={control} label='Date of Birth' />
                <DropdownInput name='EmployeePaidBasis' control={control} label='On what basis are you paid' choices={EMPLOYMENT_TYPES_DISPLAYNAMES} />
                <RadioInput name='IsAusResidentForTaxPurposes' control={control} label='Are you an Australian Resident for tax purposes?' choices={YES_NO_CHOICES} />
                <RadioInput name='TaxFreeThresholdClaimed' control={control} label='Do you want to claim the tax-free threshold from this payer?' choices={YES_NO_CHOICES} />
                <RadioInput name='SeniorsPensioners' control={control} label='Do you want to claim the seniors and pensioners tax offset by reducing the amount withheld from payments made to you?' choices={YES_NO_CHOICES} />
                <RadioInput name='TaxZoneOverseasInvalidCarer' control={control} label='Do you want to claim a zone, overseas force or invalid and invalid carer tax offset by reducing the amount withheld from payments made to you?' choices={YES_NO_CHOICES} />
                <RadioInput name='HasHelpDebt' control={control} label='Do you have a Higher Education Loan Program (HELP), Student Start-up Loan (SSL) or Trade Support Loan (TSL) debt?' choices={YES_NO_CHOICES} />
                <RadioInput name='HasSupplementDebt' control={control} label='Do you have a Financial Supplement debt?' choices={YES_NO_CHOICES} />
                <CheckboxInput name='TaxConfirmed' control={control} label='I declare that the information I have given is true and correct' />
            </FormGroup>
        </div>
    )
}

export default TaxDetails
