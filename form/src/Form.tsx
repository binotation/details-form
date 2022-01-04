import { UrlParams } from './types'
import { DEFAULT_VALUES } from './constants'
import { useForm } from 'react-hook-form'
import FormControl from '@mui/material/FormControl'
import FormButtons from './form-sections/FormButtons'
import PersonalDetails from './form-sections/PersonalDetails'
import SuperDetails from './form-sections/SuperDetails'
import TaxDetails from './form-sections/TaxDetails'
import WorkEligibility from './form-sections/WorkEligibility'

function Form({ id, token }: UrlParams) {
    const { handleSubmit, control, watch, formState, reset, getValues } = useForm({
        defaultValues: DEFAULT_VALUES
    })

    return (
        <FormControl>
            <form style={{ width: '56vw', maxWidth: '560px' }}>
                <PersonalDetails control={control} />
                <SuperDetails control={control} watch={watch} />
                <TaxDetails control={control} />
                <WorkEligibility control={control} />
                <FormButtons handleSubmit={handleSubmit} id={id} token={token} />
            </form>
        </FormControl>
    )
}

export default Form