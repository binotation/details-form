import TextInput from '../inputs/TextInput'
import FormGroup from '@mui/material/FormGroup'

function PersonalDetails({ control }: { control: any }) {
    return (
        <div className='FieldGroup FormSection'>
            <h2>Personal Details</h2>
            <FormGroup>
                <h3>Contact</h3>
                <TextInput name='FirstName' control={control} label={'First Name'} />
                <TextInput name='LastName' control={control} label={'Last Name'} />
                <TextInput name='Email' control={control} label={'Email'} />
                <TextInput name='Phone' control={control} label={'Phone Number'} />
            </FormGroup>
            <FormGroup>
                <h3>Address</h3>
                <TextInput name='AddressLine' control={control} label={'Address Line'} />
                <TextInput name='AddressSuburb' control={control} label={'Suburb'} />
                <TextInput name='AddressState' control={control} label={'State'} />
                <TextInput name='AddressPostalCode' control={control} label={'Postcode'} />
            </FormGroup>
        </div>
    )
}

export default PersonalDetails