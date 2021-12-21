import TextInput from '../inputs/TextInput'
import DropdownInput from '../inputs/DropdownInput'
import FormGroup from '@mui/material/FormGroup'
import { SUPER_CHOICE_DISPLAYNAMES } from '../constants'

function SuperDetails({ control }: { control: any }) {
    const renderStapledSuper = () => {

    }

    return (
        <div>
            <h2>Superannuation Details</h2>
            <FormGroup>
                <DropdownInput
                    choices={SUPER_CHOICE_DISPLAYNAMES}
                    control={control}
                    name='SuperChoice'
                    label='I request that all my future super contributions be paid to'
                />
            </FormGroup>
        </div>
    )
}

export default SuperDetails