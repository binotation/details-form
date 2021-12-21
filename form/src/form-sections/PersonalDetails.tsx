import { ADDRESS_STATE_DISPLAYNAMES } from '../constants'
import TextInput from '../inputs/TextInput'
import DropdownInput from '../inputs/DropdownInput'
import FormGroup from '@mui/material/FormGroup'

function PersonalDetails({ control }: { control: any }) {
    return (
        <div className='FieldGroup FormSection'>
            <h2>Personal Details</h2>
            <FormGroup>
                <h3>Contact Information</h3>
                <TextInput name='FirstName' control={control} label={'First Name'} />
                <TextInput name='LastName' control={control} label={'Last Name'} />
                <TextInput name='Email' control={control} label={'Email'} />
                <TextInput name='Phone' control={control} label={'Phone Number'} />
            </FormGroup>
            <FormGroup>
                <h3>Home Address Information</h3>
                <TextInput name='AddressLine' control={control} label={'Address Line'} />
                <TextInput name='AddressSuburb' control={control} label={'Suburb'} />
                <DropdownInput name='AddressState' control={control} label={'State'} choices={ADDRESS_STATE_DISPLAYNAMES} />
                <TextInput name='AddressPostalCode' control={control} label={'Postcode'} />
            </FormGroup>
            <FormGroup>
                <h3>Emergency Contact Information</h3>
                <TextInput name='EmergencyContactName' control={control} label={'Name'} />
                <TextInput name='EmergencyContactPhone' control={control} label={'Phone'} />
                <TextInput name='EmergencyContactRelationship' control={control} label={'Relationship to Emergency Contact'} />
            </FormGroup>
            <FormGroup>
                <h3>Bank Account Information</h3>
                <TextInput name='BankAccountName' control={control} label={'Account Name'} />
                <TextInput name='BankAccountNumber' control={control} label={'Account Number'} />
                <TextInput name='BankBSB' control={control} label={'BSB'} />
            </FormGroup>
        </div>
    )
}

export default PersonalDetails