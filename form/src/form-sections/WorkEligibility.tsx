import FormGroup from '@mui/material/FormGroup'
import TextInput from '../inputs/TextInput'
import DropdownInput from '../inputs/DropdownInput'
import RadioInput from '../inputs/RadioInput'
import FileInput from '../inputs/FileInput'
import { RESIDENCY_STATUS_DISPLAYNAMES, YES_NO_CHOICES } from '../exports/constants'

function WorkEligibility({ control }: { control: any }) {
    return (
        <FormGroup>
            <DropdownInput name='ResidencyStatus' control={control} label='Residency Status' choices={RESIDENCY_STATUS_DISPLAYNAMES} />
            <FileInput name='IdDocuments' control={control} label='Upload identification documents' />
            <RadioInput name='Convicted' control={control} label='Have you ever previously been convicted of a felony or criminal offence?' choices={YES_NO_CHOICES} />
            <TextInput name='ConvictionComment' control={control} label='Comments on conviction' textFieldParams={{ multiline: true, minRows: 4 }} />
        </FormGroup>
    )
}

export default WorkEligibility