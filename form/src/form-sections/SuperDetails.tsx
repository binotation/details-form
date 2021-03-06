import { Control, UseFormWatch } from 'react-hook-form'
import FormGroup from '@mui/material/FormGroup'
import { SuperChoice, BooleanString } from '../exports/types'
import { SUPER_CHOICE_DISPLAYNAMES, NO_STAPLED_SUPER_CHOICE, STAPLED_SUPER_CHOICE } from '../exports/constants'
import TextInput from '../inputs/TextInput'
import DropdownInput from '../inputs/DropdownInput'
import RadioInput from '../inputs/RadioInput'
import CheckboxInput from '../inputs/CheckboxInput'

function SuperDetails({ control, watch }: { control: Control<any, Object>, watch: UseFormWatch<any> }) {
    const noStapledSuperRadio = () => (
        <RadioInput name='StapledSuper' control={control} choices={NO_STAPLED_SUPER_CHOICE} />
    )

    const stapledSuperRadio = () => (
        <RadioInput name='StapledSuper' control={control} choices={STAPLED_SUPER_CHOICE} />
    )

    const superChoiceDropdown = () => (
        <DropdownInput
            choices={SUPER_CHOICE_DISPLAYNAMES}
            control={control}
            name='SuperChoice'
            label='I request that all my future super contributions be paid to'
            shrink={true}
        />
    )

    const fieldsStyle = { border: '1px solid grey', padding: '24px', borderRadius: '6px' }

    const apraFields = () => (
        <FormGroup sx={fieldsStyle}>
            <TextInput name='APRAUSI' control={control} label='USI' />
            <TextInput name='APRAMemberNumber' control={control} label='Member Number' />
        </FormGroup>
    )

    const smsfFields = () => (
        <FormGroup sx={fieldsStyle}>
            <TextInput name='SMSFName' control={control} label='Fund Name' />
            <TextInput name='SMSFABN' control={control} label='ABN' />
            <TextInput name='SMSFAccountName' control={control} label='Account Name' />
            <TextInput name='SMSFAccountNumber' control={control} label='Account Number' />
            <TextInput name='SMSFBSB' control={control} label='BSB' />
            <TextInput name='SMSFElectronicServiceAddress' control={control} label='Electronic Service Address' />
        </FormGroup>
    )

    const renderSuperFields = () => {
        const confirmCheckbox = <CheckboxInput name='SuperConfirmed' control={control} label='Please confirm the information you have entered.' />
        let fields
        let confirm

        switch (watch('SuperChoice')) {
            case SuperChoice.APRA: {
                fields = apraFields()
                confirm = confirmCheckbox
                break
            }
            case SuperChoice.SMSF: {
                fields = smsfFields()
                confirm = confirmCheckbox
                break
            }
            default: {
                fields = null
                confirm = null
            }
        }
        return (
            <div>
                {fields}
                {confirm}
            </div>
        )
    }

    const renderSuperDetails = () => {
        switch (watch('StapledSuper')) {
            case BooleanString.False: {
                return (
                    <FormGroup>
                        {superChoiceDropdown()}
                        {noStapledSuperRadio()}
                        {renderSuperFields()}
                        {stapledSuperRadio()}
                    </FormGroup>
                )
            }
            case BooleanString.True: {
                return (
                    <FormGroup>
                        {noStapledSuperRadio()}
                        {stapledSuperRadio()}
                    </FormGroup>
                )
            }
        }
    }

    return (
        <div>
            <h2>Superannuation Details</h2>
            {renderSuperDetails()}
        </div>
    )
}

export default SuperDetails
