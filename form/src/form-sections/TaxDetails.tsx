import TextInput from '../inputs/TextInput'
import DropdownInput from '../inputs/DropdownInput'
import DateInput from '../inputs/DateInput'
import RadioInput from '../inputs/RadioInput'
import CheckboxInput from '../inputs/CheckboxInput'
import { EMPLOYMENT_TYPES_DISPLAYNAMES, YES_NO_CHOICES } from '../constants'
import FormGroup from '@mui/material/FormGroup'

function TaxDetails({ control }: { control: any }) {
    return (
        <div>
            <h2>Tax Details</h2>
            <FormGroup>
                <TextInput name='TFN' control={control} label='TFN' />
                <DateInput name='DateOfBirth' control={control} label='Date of Birth'/>
                <DropdownInput name='EmployeePaidBasis' control={control} label='On what basis are you paid' choices={EMPLOYMENT_TYPES_DISPLAYNAMES} />
                <RadioInput name='IsAusResidentForTaxPurposes' control={control} label='Are you an Australian Resident for tax purposes?' choices={YES_NO_CHOICES} />
                <RadioInput name='TaxFreeThresholdClaimed' control={control} label='Are you an Australian Resident for tax purposes?' choices={YES_NO_CHOICES} />
                <RadioInput name='SeniorsPensioners' control={control} label='Are you an Australian Resident for tax purposes?' choices={YES_NO_CHOICES} />
                <RadioInput name='TaxZoneOverseasInvalidCarer' control={control} label='Are you an Australian Resident for tax purposes?' choices={YES_NO_CHOICES} />
                <RadioInput name='HasHelpDebt' control={control} label='Are you an Australian Resident for tax purposes?' choices={YES_NO_CHOICES} />
                <RadioInput name='HasSupplementDebt' control={control} label='Are you an Australian Resident for tax purposes?' choices={YES_NO_CHOICES} />
                <CheckboxInput name='TaxConfirmed' control={control} label='I declare that the information I have given is true and correct' />
            </FormGroup>
        </div>
    )
}

export default TaxDetails