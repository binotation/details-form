import { Control } from 'react-hook-form'
import FormGroup from '@mui/material/FormGroup'
import { RESIDENCY_STATUS_DISPLAYNAMES, YES_NO_CHOICES } from '../exports/constants'
import TextInput from '../inputs/TextInput'
import DropdownInput from '../inputs/DropdownInput'
import RadioInput from '../inputs/RadioInput'
import FileInput from '../inputs/FileInput'

function WorkEligibility({ control }: { control: Control<any, Object> }) {
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
