import { SuperChoice } from '../types'
import TextInput from '../inputs/TextInput'
import DropdownInput from '../inputs/DropdownInput'
import RadioInput from '../inputs/RadioInput'
import FormGroup from '@mui/material/FormGroup'
import CheckboxInput from '../inputs/CheckboxInput'
import { SUPER_CHOICE_DISPLAYNAMES } from '../constants'

function SuperDetails({ control, watch }: { control: any, watch: any }) {
    const noStapledSuperRadio = () => (
        <RadioInput name='StapledSuper' control={control} choices={[{ displayName: 'No stapled super', value: 'false' }]} label='stapled' />
    )

    const stapledSuperRadio = () => (
        <RadioInput name='StapledSuper' control={control} choices={[{ displayName: 'Stapled super', value: 'true' }]} label='stapled' />
    )

    const superChoiceDropdown = () => (
        <DropdownInput
            choices={SUPER_CHOICE_DISPLAYNAMES}
            control={control}
            name='SuperChoice'
            label='I request that all my future super contributions be paid to'
        />
    )

    const ApraFields = () => (
        <FormGroup>
            <TextInput name='APRAUSI' control={control} label='USI' />
            <TextInput name='APRAMemberNumber' control={control} label='Member Number' />
        </FormGroup>
    )

    const SmsfFields = () => (
        <FormGroup>
            <TextInput name='SMSFName' control={control} label='Fund Name' />
            <TextInput name='SMSFABN' control={control} label='ABN' />
            <TextInput name='SMSFAccountName' control={control} label='SMSF Account Name' />
            <TextInput name='SMSFAccountNumber' control={control} label='SMSF Account Number' />
            <TextInput name='SMSFBSB' control={control} label='SMSF BSB' />
            <TextInput name='SMSFElectronicServiceAddress' control={control} label='ABN' />
        </FormGroup>
    )

    const renderSuperFields = () => {
        const confirmCheckbox = <CheckboxInput name='SuperConfirmed' control={control} label='Confirm' />
        let fields;
        let confirm;

        switch (watch('SuperChoice')) {
            case SuperChoice.APRA: {
                fields = ApraFields()
                confirm = confirmCheckbox
                break;
            }
            case SuperChoice.SMSF: {
                fields = SmsfFields()
                confirm = confirmCheckbox
                break;
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
            case 'false': {
                return (
                    <FormGroup>
                        {superChoiceDropdown()}
                        {noStapledSuperRadio()}
                        {renderSuperFields()}
                        {stapledSuperRadio()}
                    </FormGroup>
                )
            }
            case 'true': {
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